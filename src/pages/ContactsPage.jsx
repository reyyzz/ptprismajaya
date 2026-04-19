import { contactsPageOffices } from '../data/siteData'
import { useScrollReveal } from '../hooks/useScrollReveal'

function ContactsPage() {
  const revealRef = useScrollReveal()
  const office = contactsPageOffices[0]

  return (
    <main className="contacts-page" ref={revealRef}>
      <section className="section page-hero patterned">
        <div className="container centered narrow">
          <p className="subtitle">Contact Us</p>
          <h1>
            Get in <span>Touch!</span>
          </h1>
        </div>
      </section>

      <section className="section contacts-section">
        <div className="container centered">
          <div className="contacts-simple">
            <div className="contacts-simple-icon">📍</div>
            <h2>{office.title}</h2>
            <div className="contacts-simple-info">
              <div className="contacts-simple-item">
                <span className="contacts-simple-label">Address</span>
                {office.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div className="contacts-simple-divider" />
              <div className="contacts-simple-item">
                <span className="contacts-simple-label">Phone</span>
                {office.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
                    {phone}
                  </a>
                ))}
              </div>
              {office.email ? (
                <>
                  <div className="contacts-simple-divider" />
                  <div className="contacts-simple-item">
                    <span className="contacts-simple-label">Email</span>
                    <a href={`mailto:${office.email}`}>{office.email}</a>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactsPage
