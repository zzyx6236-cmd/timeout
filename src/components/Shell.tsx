import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

export function Shell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  const { pathname } = useLocation()
  const calendar = pathname.startsWith('/calendar')
  return (
    <div className={wide ? 'page wide' : 'page'}>
      <header className="top">
        <div>
          <div className="brand">timeOut</div>
          <div className="brand-sub">办公室隐形训练</div>
        </div>
        <nav className="tabs">
          <Link to="/" className={calendar ? '' : 'on'}>今日</Link>
          <Link to="/calendar" className={calendar ? 'on' : ''}>日历</Link>
        </nav>
      </header>
      {children}
    </div>
  )
}
