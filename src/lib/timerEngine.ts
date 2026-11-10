import { exerciseById, type Exercise } from '../data/exercises'

export const PREPARE_SECONDS = 3
export const BETWEEN_SECONDS = 20

export interface Phase {
  kind: 'prepare' | 'work' | 'rest'
  seconds: number
  label: string
  current: number
  total: number
  exerciseId: number
  between: boolean
}

function work(ex: Exercise, seconds: number, label: string, current: number, total: number): Phase {
  return { kind: 'work', seconds, label, current, total, exerciseId: ex.id, between: false }
}

function rest(ex: Exercise, seconds: number, label: string, current: number, total: number, between = false): Phase {
  return { kind: 'rest', seconds, label, current, total, exerciseId: ex.id, between }
}

function phasesOf(ex: Exercise): Phase[] {
  const list: Phase[] = []
  if (ex.mode === 'hold_repeat') {
    for (let rep = 1; rep <= ex.reps; rep += 1) {
      list.push(work(ex, ex.holdSeconds, '保持', rep, ex.reps))
      if (rep < ex.reps) list.push(rest(ex, ex.restSeconds, '组内放松', rep, ex.reps))
    }
    return list
  }
  if (ex.mode === 'alternating_hold') {
    const total = ex.perSide * 2
    let n = 0
    for (let i = 1; i <= ex.perSide; i += 1) {
      n += 1
      list.push(work(ex, ex.holdSeconds, '左侧停留', n, total))
      list.push(rest(ex, ex.restSeconds, '换边', n, total))
      n += 1
      list.push(work(ex, ex.holdSeconds, '右侧停留', n, total))
      if (i < ex.perSide) list.push(rest(ex, ex.restSeconds, '换边', n, total))
    }
    return list
  }
  for (let rep = 1; rep <= ex.reps; rep += 1) {
    list.push(work(ex, ex.holdSeconds, '踮起', rep, ex.reps))
    if (rep < ex.reps) list.push(rest(ex, ex.restSeconds, '间隔', rep, ex.reps))
  }
  return list
}

export function buildSession(ids: number[]): Phase[] {
  const first = ids[0]
  const phases: Phase[] = [
    {
      kind: 'prepare',
      seconds: PREPARE_SECONDS,
      label: '准备',
      current: 1,
      total: ids.length,
      exerciseId: first,
      between: false,
    },
  ]
  ids.forEach((id, index) => {
    const ex = exerciseById(id)
    if (!ex) return
    phases.push(...phasesOf(ex))
    if (index < ids.length - 1) {
      phases.push(rest(ex, BETWEEN_SECONDS, '动作间休息', index + 1, ids.length, true))
    }
  })
  return phases
}
