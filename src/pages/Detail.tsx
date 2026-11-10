import type { Exercise } from '../data/exercises'

export function Detail({ exercise }: { exercise: Exercise }) {
  const d = exercise.detail
  return (
    <aside className="detail">
      <div className="kicker">动作 {exercise.id}</div>
      <h2>{exercise.name}</h2>
      <p className="focus">{exercise.focus}</p>
      <section className="block"><h4>训练部位</h4><p>{d.area}</p></section>
      <section className="block"><h4>目的</h4><p>{d.purpose}</p></section>
      <section className="block"><h4>次数</h4><p>{d.dose}</p></section>
      <section className="block"><h4>坐姿</h4><ul>{d.posture.map((line) => <li key={line}>{line}</li>)}</ul></section>
      <section className="block"><h4>发力点</h4><ul>{d.effort.map((line) => <li key={line}>{line}</li>)}</ul></section>
      <section className="block"><h4>呼吸</h4><ul>{d.breath.map((line) => <li key={line}>{line}</li>)}</ul></section>
      <section className="block"><h4>正确感觉</h4><p>{d.feel}</p></section>
      {d.extra ? <section className="block"><h4>额外提醒</h4><p>{d.extra}</p></section> : null}
    </aside>
  )
}
