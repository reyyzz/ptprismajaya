import { useEffect, useMemo, useState } from 'react'
import {
  chooseReasons,
  clientLogos,
  coreValues,
  featureCards,
  heroSlides,
  newsArticles,
  testimonials,
  videoStories,
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

  const prevHero = () => {
    setHeroIndex((currentIndex) =>
      currentIndex === 0 ? heroSlides.length - 1 : currentIndex - 1,
    )
  }

  const nextHero = () => {
    setHeroIndex((currentIndex) => (currentIndex + 1) % heroSlides.length)
  }

  const prevTestimonial = () => {
    setTestimonialIndex((currentIndex) =>
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1,
    )
  }

  const nextTestimonial = () => {
    setTestimonialIndex((currentIndex) => (currentIndex + 1) % testimonials.length)
  }

  return (
    <main className="homepage">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="subtitle">
              INTEGRATED HVAC SOLUTION EXPERT AND ENERGY SAVING PARTNER
            </p>
            <h1>Elevate Comfort and Conserve Energy</h1>
            <p>
              As industry leaders in HVAC innovation, we provide fully integrated
              solutions that enhance comfort, maximize energy savings, and drive
              sustainability. Our cutting-edge technology and expert services help
              businesses reduce operational costs, improve system performance, and
              minimize environmental impact-because a smarter, greener future starts
              today.
            </p>
            <a
              href="https://bukakainti.com/references/"
              className="button"
              target="_blank"
              rel="noreferrer"
            >
              View Project Reference
            </a>
          </div>

          <div className="hero-slider" aria-label="Hero slides">
            <img src={currentHero.image} alt={currentHero.alt} />
            <button
              type="button"
              className="slider-button prev"
              aria-label="Previous hero slide"
              onClick={prevHero}
            >
              ‹
            </button>
            <button
              type="button"
              className="slider-button next"
              aria-label="Next hero slide"
              onClick={nextHero}
            >
              ›
            </button>

            <div className="slider-dots" aria-hidden="true">
              {heroSlides.map((slide, index) => (
                <span key={slide.alt} className={index === heroIndex ? 'active' : ''} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section intro">
        <div className="container centered narrow">
          <p className="subtitle">PT BUKAKAINTI AIRCON</p>
          <h2>
            Your Ultimate <span>HVAC Solution</span>
          </h2>
          <p className="subtitle subtle">Our Clients, Our Success</p>
          <h3>
            +19 Years of <span>HVAC Expertise</span>
          </h3>
          <p>
            Specializing in Heating, Ventilating, & Air Conditioning (HVAC)
            solutions, PT. BUKAKAINTI AIRCON is a renowned HVAC contractor with a
            19-year legacy of experience. As your trusted partner in HVAC
            Installation, Service, Procurement, and Purchase, we excel in diverse
            chiller system projects based on your needs.
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
            Our performance and achievements extend to every HVAC project based on
            your needs. Including central AC installations in commercial buildings
            such as offices, hotels, shopping centers, mixed-use properties, and
            various segments like food and beverage, hospitals, pharmaceuticals,
            packaging, palm oil, and more.
          </p>

          <div className="logo-grid">
            {clientLogos.map((logoPath) => (
              <figure key={logoPath} className="logo-card">
                <img src={logoPath} alt="Client logo" loading="lazy" />
              </figure>
            ))}
          </div>

          <a
            href="https://bukakainti.com/references/"
            className="button"
            target="_blank"
            rel="noreferrer"
          >
            View Project Reference
          </a>
        </div>
      </section>

      <section className="section why patterned-alt">
        <div className="container centered">
          <p className="subtitle">We're Committed To Perfection</p>
          <h2>
            Why Should You Choose <span>PT BUKAKAINTI AIRCON?</span>
          </h2>
          <p className="section-copy">
            From seamless installations to responsive and efficient services, we
            only prioritize your satisfaction. With years of expertise, we offer
            top-tier heating, ventilating, and air conditioning solutions. Choose us
            for reliable, fast, and proficient all-in-one HVAC services, ensuring
            ultimate comfort for your building.
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
          <p className="subtitle">Guiding Principles for a Sustainable Future</p>
          <h2>
            Our Core <span>Values</span>
          </h2>
          <p className="section-copy">
            From seamless installations to responsive and efficient services, we
            only prioritize your satisfaction. With years of expertise, we offer
            top-tier heating, ventilating, and air conditioning solutions. Choose us
            for reliable, fast, and proficient all-in-one HVAC services, ensuring
            ultimate comfort for your building.
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

      <section className="section news">
        <div className="container centered">
          <p className="subtitle">Advice to clients</p>
          <h2>News & Articles</h2>

          <div className="news-grid">
            {newsArticles.map((article) => (
              <article key={article.title} className="news-card">
                <a href={article.href} target="_blank" rel="noreferrer">
                  <img src={article.image} alt={article.title} loading="lazy" />
                </a>
                <div className="news-meta">
                  <span>{article.date}</span>
                </div>
                <h4>
                  <a href={article.href} target="_blank" rel="noreferrer">
                    {article.title}
                  </a>
                </h4>
              </article>
            ))}
          </div>

          <a
            href="https://bukakainti.com/news/"
            className="button"
            target="_blank"
            rel="noreferrer"
          >
            View More Posts
          </a>
        </div>
      </section>

      <section className="section videos">
        <div className="container centered">
          <h2>Get the best Video stories</h2>

          <div className="video-grid">
            {videoStories.map((story) => (
              <article key={story.title} className="video-card">
                <a href={story.href} target="_blank" rel="noreferrer">
                  <img src={story.image} alt={story.title} loading="lazy" />
                </a>
                <h4>
                  <a href={story.href} target="_blank" rel="noreferrer">
                    {story.title}
                  </a>
                </h4>
                <p>{story.source}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
