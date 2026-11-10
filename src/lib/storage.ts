const KEY = 'timeout-v1'

export interface DayRecord {
  done: Record<string, boolean>
  checkin: boolean
}

export interface Store {
  days: Record<string, DayRecord>
}

function empty(): Store {
  return { days: {} }
}

export function loadStore(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty()
    const parsed = JSON.parse(raw) as Store
    if (!parsed.days) return empty()
    return parsed
  } catch {
    return empty()
  }
}

export function saveStore(store: Store) {
  localStorage.setItem(KEY, JSON.stringify(store))
}

export function dateKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function displayDate(key: string) {
  return key.replace(/-/g, '/')
}

export function todayRecord(store = loadStore(), key = dateKey()) {
  if (!store.days[key]) store.days[key] = { done: {}, checkin: false }
  return store.days[key]
}

export function doneCount(record: DayRecord) {
  return Object.values(record.done).filter(Boolean).length
}

export function allDone(record: DayRecord) {
  return [1, 2, 3, 4, 5].every((id) => record.done[String(id)])
}

export function toggleDone(id: number) {
  const store = loadStore()
  const record = todayRecord(store)
  const key = String(id)
  if (record.done[key]) delete record.done[key]
  else record.done[key] = true
  if (!allDone(record)) record.checkin = false
  saveStore(store)
  return record
}

export function markDone(id: number) {
  const store = loadStore()
  const record = todayRecord(store)
  record.done[String(id)] = true
  saveStore(store)
  return record
}

export function checkInToday() {
  const store = loadStore()
  const record = todayRecord(store)
  if (!allDone(record)) return record
  record.checkin = true
  saveStore(store)
  return record
}

export function checkinDates() {
  const store = loadStore()
  return Object.keys(store.days).filter((key) => store.days[key].checkin).sort()
}
