import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Shell } from '../components/Shell'
import { Detail } from './Detail'
import { exerciseById } from '../data/exercises'
import { allDone, loadStore, markDone, todayRecord } from '../lib/storage'
import { PREPARE_SECONDS, buildSession, type Phase } from '../lib/timerEngine'

const RING = 2 * Math.PI * 46

export function TimerPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const chain = id === 'all'
  const ids = chain ? [1, 2, 3, 4, 5] : [Number(id)]
  const known = ids.every((item) => exerciseById(item))
  const phases = useMemo(() => (known ? buildSession(ids) : []), [id])
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [left, setLeft] = useState(PREPARE_SECONDS)

  useEffect(() => {
    if (!started || index >= phases.length) return
    const timer = window.setTimeout(() => {
      if (left > 1) {
        setLeft(left - 1)
        return
      }
      finishPhase(phases, index, chain, navigate, setIndex, setLeft)
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [started, index, left, phases, chain, navigate])

  if (!known || phases.length === 0) {
    return (
      <Shell>
        <p className="lead">没有这个动作。</p>
        <Link className="back" to="/">← 返回今日</Link>
      </Shell>
    )
  }

  const phase = phases[Math.min(index, phases.length - 1)]
  const exercise = exerciseById(phase.exerciseId)!
  const counting = !started || phase.kind !== 'rest'
  const number = started ? Math.max(left, 0) : PREPARE_SECONDS
  const ratio = !counting || phase.seconds === 0 ? 1 : number / phase.seconds
  const progress = phase.between || (chain && phase.kind === 'prepare')
    ? `动作 ${phase.current} / ${phase.total}`
    : phase.kind === 'prepare' ? '' : `${phase.current} / ${phase.total}`

  function beginOrSkip() {
    if (!started) {
      setStarted(true)
      setLeft(phases[0].seconds)
      return
    }
    finishPhase(phases, index, chain, navigate, setIndex, setLeft)
  }

  return (
    <Shell wide>
      <Link className="back" to="/">← 返回今日</Link>
      <div className="mode">{chain ? '连做模式 · 动作间休息 20 秒' : '单动作训练'}</div>
      <h1 className="exercise-name">{exercise.name}</h1>
      <p className="focus">{exercise.focus}</p>
      <div className="stage">
        <div className="dial-wrap">
          <div className={started && phase.kind !== 'rest' ? 'dial live' : 'dial'}>
            <div className="disc" />
            {started && phase.kind !== 'rest' ? (
              <svg viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                <circle className="ring-track" cx="60" cy="60" r="46" />
                <circle className="ring-prog" cx="60" cy="60" r="46" strokeDasharray={RING} strokeDashoffset={RING * (1 - ratio)} />
                <circle className="ring-spin" cx="60" cy="60" r="46" />
              </svg>
            ) : null}
            <div className="core">
              {counting ? <div className="num">{number}</div> : <div className="dots" aria-hidden="true"><i /><i /><i /></div>}
              <div className="phase">{started ? phase.label : '准备'}</div>
              {progress ? <div className="progress">{progress}</div> : null}
            </div>
          </div>
          <button className={started ? 'btn linkish' : 'btn go'} type="button" onClick={beginOrSkip}>{started ? '跳过' : '开始'}</button>
        </div>
        <Detail exercise={exercise} />
      </div>
    </Shell>
  )
}

function finishPhase(
  phases: Phase[],
  index: number,
  chain: boolean,
  navigate: (path: string, opts: { replace: boolean }) => void,
  setIndex: (value: number) => void,
  setLeft: (value: number) => void,
) {
  const prev = phases[index]
  const next = phases[index + 1]
  if (prev && prev.kind === 'work' && (!next || next.exerciseId !== prev.exerciseId || next.between)) {
    markDone(prev.exerciseId)
  }
  if (!next) {
    const record = todayRecord(loadStore())
    navigate(chain || allDone(record) ? '/calendar' : '/', { replace: true })
    return
  }
  setIndex(index + 1)
  setLeft(next.seconds)
}
