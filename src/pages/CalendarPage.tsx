import { useState } from 'react'
import { Shell } from '../components/Shell'
import { allDone, checkInToday, checkinDates, displayDate, loadStore, todayRecord } from '../lib/storage'

const WEEK = ['一', '二', '三', '四', '五', '六', '日']

export function CalendarPage() {
  const now = new Date()
  const [cursor, setCursor] = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [rev, setRev] = useState(0)
  void rev
  const record = todayRecord(loadStore())
  const ready = allDone(record)
  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const first = new Date(year, month, 1)
  const offset = (first.getDay() + 6) % 7
  const days = new Date(year, month + 1, 0).getDate()
  const dates = checkinDates()
  const marks = new Set(dates)
  const count = dates.length
  const cells: Array<number | null> = []
  for (let i = 0; i < offset; i += 1) cells.push(null)
  for (let day = 1; day <= days; day += 1) cells.push(day)

  return (
    <Shell>
      <h1 className="cal-title">日历打卡</h1>
      <p className="cal-lead">当日五个动作全部勾选后，才能标记完成。</p>
      <div className="cal-nav">
        <button className="btn ghost" type="button" onClick={() => setCursor(new Date(year, month - 1, 1))}>上月</button>
        <strong>{year} 年 {month + 1} 月</strong>
        <button className="btn ghost" type="button" onClick={() => setCursor(new Date(year, month + 1, 1))}>下月</button>
      </div>
      <div className="month">
        <div className="grid">
          {WEEK.map((name) => <div className="dow" key={name}>{name}</div>)}
          {cells.map((day, index) => {
            if (!day) return <div key={`e${index}`} />
            const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            return <button className={marks.has(key) ? 'day mark' : 'day'} type="button" key={key}>{day}</button>
          })}
        </div>
      </div>
      <div className="note">
        <button className="btn" type="button" disabled={record.checkin || !ready} onClick={() => { checkInToday(); setRev((n) => n + 1) }}>
          {record.checkin ? `已打卡 ${count}` : `标记今天完成 ${count}`}
        </button>
      </div>
      <section className="history">
        <h3>打卡历史</h3>
        <div className="pills">
          {checkinDates().length === 0 ? <span className="kicker">还没有打卡</span> : checkinDates().map((key) => <span className="pill" key={key}>{displayDate(key)}</span>)}
        </div>
      </section>
    </Shell>
  )
}
