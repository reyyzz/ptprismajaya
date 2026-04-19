import { useEffect, useMemo, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  chooseReasons,
  clientLogos,
  coreValues,
  featureCards,
  heroSlides,
  testimonials,
} from '../data/siteData'

const heroIntervalMs = 5000
const testimonialIntervalMs = 5000

function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setHeroIndex((currentIndex) => (currentIndex + 1) % heroSlides.length)
    }, heroIntervalMs)

    return () => window.clearInterval(timerId)
  }, [])

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTestimonialIndex((currentIndex) => (currentIndex + 1) % testimonials.length)
    }, testimonialIntervalMs)

    return () => window.clearInterval(timerId)
  }, [])

  const currentHero = useMemo(() => heroSlides[heroIndex], [heroIndex])
  const currentTestimonial = useMemo(
    () => testimonials[testimonialIndex],
    [testimonialIndex],
  )

  const prevTestimonial = () => {
    setTestimonialIndex((currentIndex) =>
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1,
    )
  }

  const nextTestimonial = () => {
    setTestimonialIndex((currentIndex) => (currentIndex + 1) % testimonials.length)
  }
  const revealRef = useScrollReveal()

  return (
    <main className="home-page" ref={revealRef}>
      <section className="hero">
        <div className="hero-bg-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.alt}
              className={`hero-bg-slide ${index === heroIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          ))}
          <div className="hero-bg-overlay" />
        </div>

        <div className="container hero-content">
          <h1 className="hero-title">
            PT. Prisma Cahaya
            <span className="hero-title-accent"> Lestari</span>
          </h1>
          <p className="hero-description">
            Your trusted partner for comprehensive air conditioning, AHU modification,
            exhaust fan installation, and MEP commissioning services across Indonesia.
          </p>
        </div>
      </section>

      <section className="section intro" id="services-overview">
        <div className="container centered narrow">
          <p className="subtitle">PT. Prisma Cahaya Lestari</p>
          <h2>
            Your Trusted <span>MEP Partner</span>
          </h2>
          <p className="subtitle subtle">Professional Services Since Day One</p>
          <h3>
            Expert <span>Installation & Commissioning</span>
          </h3>
          <p>
            Specializing in air conditioning works, AHU modification & UV filter installation,
            exhaust fan systems, volume damper supply & installation, ceiling reconditioning,
            and comprehensive testing & commissioning. Based in Surabaya, serving projects
            across Indonesia.
          </p>
        </div>
      </section>

      <section className="section features">
        <div className="container feature-grid">
          {featureCards.map((feature) => (
            <article key={feature.number} className="feature-card">
              <span className="feature-number">{feature.number}</span>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section clients patterned">
        <div className="container centered">
          <p className="subtitle">Track Records</p>
          <h2>
            Our <span>Customers & Clients</span>
          </h2>
          <p className="section-copy">
            Our performance and achievements extend to every MEP project tailored to
            your needs. Including installations in commercial buildings such as
            offices, hotels, shopping centers, mixed-use properties, and various
            industrial segments.
          </p>

          <div className="logo-grid-wrapper">
            {clientLogos.map((logo) => (
              <figure key={logo.name} className="logo-card">
                <img src={logo.path} alt={logo.name} loading="lazy" />
              </figure>
            ))}
          </div>

          <a
            href="/contacts"
            className="button"
          >
            Contact Us
          </a>
        </div>
      </section>

      <section className="section why patterned-alt">
        <div className="container centered">
          <p className="subtitle">We're Committed To Perfection</p>
          <h2>
            Why Choose <span>PT. Prisma Cahaya Lestari?</span>
          </h2>
          <p className="section-copy">
            From precise installations to responsive and efficient services, we
            only prioritize your satisfaction. With our expertise, we offer
            top-tier MEP solutions. Choose us for reliable, fast, and proficient
            all-in-one installation and commissioning services.
          </p>

          <div className="reason-grid">
            {chooseReasons.map((reason) => (
              <article key={reason.text} className="reason-card">
                <img src={reason.image} alt={reason.text} loading="lazy" />
                <h5>{reason.text}</h5>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonial-band patterned">
        <div className="container">
          <div className="testimonial-card">
            <button
              type="button"
              className="slider-button prev"
              aria-label="Previous testimonial"
              onClick={prevTestimonial}
            >
              ‹
            </button>

            <blockquote>
              <p>{currentTestimonial.quote}</p>
              <cite>
                <span>{currentTestimonial.name}</span>
                <small>{currentTestimonial.role}</small>
              </cite>
            </blockquote>

            <button
              type="button"
              className="slider-button next"
              aria-label="Next testimonial"
              onClick={nextTestimonial}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="section values">
        <div className="container centered">
          <p className="subtitle">Guiding Principles for Excellence</p>
          <h2>
            Our Core <span>Values</span>
          </h2>
          <p className="section-copy">
            From precise installations to responsive and efficient services, we
            only prioritize your satisfaction. Our values drive every project
            we undertake, ensuring quality, safety, and client success.
          </p>

          <div className="values-grid">
            {coreValues.map((value) => (
              <article
                key={value.title}
                className="value-card"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(11, 17, 25, 0.18) 0%, rgba(11, 17, 25, 0.94) 100%), url(${value.image})`,
                }}
              >
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
