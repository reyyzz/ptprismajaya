import { useState } from 'react'
import { contactsPageOffices } from '../data/siteData'

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

function ContactsPage() {
  const [form, setForm] = useState(initialFormState)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    setForm(initialFormState)
  }

  return (
    <main className="contacts-page">
      <section className="section page-hero patterned">
        <div className="container centered narrow">
          <p className="subtitle">Contact Us</p>
          <h1>
            Get in <span>touch!</span>
          </h1>
        </div>
      </section>

      <section className="section contacts-section">
        <div className="container contacts-layout">
          <div className="contacts-grid">
            {contactsPageOffices.map((office) => (
              <article key={office.title} className="contact-card">
                <h2>{office.title}</h2>
                <ul className="contact-list">
                  <li>
                    <span className="contact-icon" aria-hidden="true">
                      ⌖
                    </span>
                    <div>
                      {office.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </li>
                  {office.phones.map((phone) => (
                    <li key={phone}>
                      <span className="contact-icon" aria-hidden="true">
                        ☎
                      </span>
                      <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a>
                    </li>
                  ))}
                  {office.email ? (
                    <li>
                      <span className="contact-icon" aria-hidden="true">
                        ✉
                      </span>
                      <a href={`mailto:${office.email}`}>{office.email}</a>
                    </li>
                  ) : null}
                </ul>
              </article>
            ))}
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <h2>Send Message</h2>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
            />

            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange}
              required
            />

            <button type="submit" className="button button-submit">
              Send Message
            </button>
            {isSubmitted ? (
              <p className="form-success">Thank you. Our team will contact you soon.</p>
            ) : null}
          </form>
        </div>
      </section>
    </main>
  )
}

export default ContactsPage
