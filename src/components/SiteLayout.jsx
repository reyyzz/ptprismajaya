import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { navigationItems, officeContacts, socialLinks } from '../data/siteData'

function SiteLayout() {
  const location = useLocation()
  const [mobileMenuOpenPath, setMobileMenuOpenPath] = useState(null)
  const isMobileMenuOpen = mobileMenuOpenPath === location.pathname

  const toggleMobileMenu = () => {
    setMobileMenuOpenPath((prevPath) => (prevPath === location.pathname ? null : location.pathname))
  }

  const closeMobileMenu = () => {
    setMobileMenuOpenPath(null)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <NavLink to="/" className="brand" aria-label="BUKAKAINTI AIRCON home">
            <img src="/assets/images/brand/logo.webp" alt="BUKAKAINTI AIRCON" />
          </NavLink>

          <nav className="desktop-nav" aria-label="Main navigation">
            <ul>
              {navigationItems.map((item) => {
                const hasChildren = Array.isArray(item.children) && item.children.length > 0
                const isProfileActive = item.label === 'Profile' && location.pathname.startsWith('/profile')

                if (!hasChildren) {
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) => (isActive ? 'active' : undefined)}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  )
                }

                return (
                  <li key={item.to} className="has-submenu">
                    <NavLink to={item.to} className={isProfileActive ? 'active' : undefined}>
                      {item.label}
                    </NavLink>
                    <ul className="submenu">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            end
                            className={({ isActive }) => (isActive ? 'active' : undefined)}
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </nav>

          <button
            type="button"
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav
          id="mobile-navigation"
          className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
          aria-label="Mobile navigation"
        >
          <ul>
            {navigationItems.map((item) => {
              const hasChildren = Array.isArray(item.children) && item.children.length > 0
              const isProfileActive = item.label === 'Profile' && location.pathname.startsWith('/profile')

              if (!hasChildren) {
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => (isActive ? 'active' : undefined)}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              }

              return (
                <li key={item.to} className="mobile-has-submenu">
                  <NavLink
                    to={item.to}
                    className={isProfileActive ? 'active' : undefined}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </NavLink>
                  <ul className="mobile-submenu">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink
                          to={child.to}
                          end
                          className={({ isActive }) => (isActive ? 'active' : undefined)}
                          onClick={closeMobileMenu}
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      <Outlet />

      <footer className="footer" id="footer">
        <div className="container footer-grid">
          <section>
            <h2>
              Get in Touch <span>with Us</span>
            </h2>
            <ul className="social-links">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {officeContacts.map((office) => (
            <section key={office.title}>
              <h3>{office.title}</h3>
              <address>
                {office.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
                {office.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
                    {phone}
                  </a>
                ))}
                {office.email ? <a href={`mailto:${office.email}`}>{office.email}</a> : null}
              </address>
            </section>
          ))}
        </div>

        <div className="container copyright">
          Copyright by PT. Bukaka Inti Aircon. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default SiteLayout
