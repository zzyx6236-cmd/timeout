import { Navigate, Route, Routes } from 'react-router-dom'
import { CalendarPage } from './pages/CalendarPage'
import { TimerPage } from './pages/TimerPage'
import { Today } from './pages/Today'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Today />} />
      <Route path="/timer/:id" element={<TimerPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
