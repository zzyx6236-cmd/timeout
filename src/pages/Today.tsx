import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shell } from '../components/Shell'
import { EXERCISES } from '../data/exercises'
import { allDone, dateKey, displayDate, doneCount, loadStore, todayRecord, toggleDone } from '../lib/storage'

export function Today() {
  const [tick, setTick] = useState(0)
  const record = todayRecord(loadStore())
  const count = doneCount(record)
  const ready = allDone(record)
  void tick
  return (
    <Shell>
      <div className="date">{displayDate(dateKey())}</div>
      <h1 className="display">timeOut</h1>
      <p className="lead">五组桌前隐形动作。勾选今日进度，完成后在日历打卡。</p>
      <div className="actions">
        <Link className="btn" to="/timer/all">一键连做 1→5</Link>
        <span className="chip">{count}/5 完成</span>
      </div>
      <div className="list">
        {EXERCISES.map((ex) => {
          const on = !!record.done[String(ex.id)]
          return (
            <article className={on ? 'item on' : 'item'} key={ex.id}>
              <button className={on ? 'check on' : 'check'} type="button" aria-label={ex.name} aria-pressed={on} onClick={() => { toggleDone(ex.id); setTick((n) => n + 1) }}>
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.2 8.2 6.4 11.2 12.8 4.6" /></svg>
              </button>
              <div className="grow">
                <div className="kicker">动作 {ex.id}</div>
                <h3>{ex.name}</h3>
                <p>{ex.focus}</p>
              </div>
              <Link className="btn ghost" to={`/timer/${ex.id}`}>开始</Link>
            </article>
          )
        })}
      </div>
      <div className="note">{ready ? '五个动作都完成了，可以去日历打卡。' : '完成全部五个动作后，即可在日历标记今天。'}</div>
    </Shell>
  )
}
