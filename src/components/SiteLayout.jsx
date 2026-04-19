import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { navigationItems, officeContacts, socialLinks } from '../data/siteData'

function SiteLayout() {
  const location = useLocation()
  const [mobileMenuOpenPath, setMobileMenuOpenPath] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobileMenuOpen = mobileMenuOpenPath === location.pathname
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpenPath((prevPath) => (prevPath === location.pathname ? null : location.pathname))
  }

  const closeMobileMenu = () => {
    setMobileMenuOpenPath(null)
  }

  const topbarClass = `topbar${isScrolled ? ' topbar-scrolled' : ''}`

  return (
    <div className="app-shell">
      <header className={topbarClass}>
        <div className="container topbar-inner">
          <NavLink to="/" className="brand" aria-label="PT. Prisma Cahaya Lestari home">
            <img src="/assets/images/brand/logo-prisma.svg" alt="PT. Prisma Cahaya Lestari" />
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
          <section className="footer-brand">
            <div className="footer-logo">
              <img src="/assets/images/brand/logo-prisma.svg" alt="PT. Prisma Cahaya Lestari" className="footer-logo-img" />
            </div>
            <p className="footer-description">
              PT. Prisma Cahaya Lestari — your trusted partner for professional air conditioning, AHU modification, exhaust fan installation, and MEP services across Indonesia.
            </p>
            <ul className="footer-socials">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                    {social.label.charAt(0)}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="footer-links">
            <h4>NAVIGATION</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/profile/about-us">About Us</a></li>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/contacts">Contacts</a></li>
            </ul>
          </section>

          <section className="footer-links">
            <h4>SERVICES</h4>
            <ul>
              <li><a href="/profile/service">Air Conditioning Works</a></li>
              <li><a href="/profile/service">AHU Modification</a></li>
              <li><a href="/profile/service">Exhaust Fan Installation</a></li>
              <li><a href="/profile/service">Testing & Commissioning</a></li>
            </ul>
          </section>

          <section className="footer-contact">
            <h4>CONTACT</h4>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📍</span>
              <span>Jl. Pumpungan III-B / 27,<br/>Ruko Manyar Mas, Surabaya</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📞</span>
              <span>0811-306-520</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">✉️</span>
              <a href="mailto:info@prismacahayalestari.com">info@prismacahayalestari.com</a>
            </div>
          </section>
        </div>

        <div className="container copyright">
          © 2026 PT. Prisma Cahaya Lestari. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default SiteLayout
