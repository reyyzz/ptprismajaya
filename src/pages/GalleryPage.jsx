import { useRef } from 'react'
import { galleryProjects } from '../data/siteData'
import { useScrollReveal } from '../hooks/useScrollReveal'

function ProjectCarousel({ project }) {
  const trackRef = useRef(null)

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -360, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 360, behavior: 'smooth' })
    }
  }

  return (
    <div className="project-carousel">
      <h3 className="project-carousel-title">{project.title}</h3>
      <div className="project-carousel-wrapper">
        <button
          type="button"
          className="carousel-arrow carousel-arrow-left"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          ‹
        </button>
        <div className="project-carousel-track" ref={trackRef}>
          {project.images.map((img, index) => (
            <div key={img} className="project-carousel-slide">
              <img
                src={img}
                alt={`${project.title} — Photo ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="carousel-arrow carousel-arrow-right"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  )
}

function GalleryPage() {
  const revealRef = useScrollReveal()

  return (
    <main className="gallery-page" ref={revealRef}>
      <section className="section page-hero patterned">
        <div className="container centered narrow">
          <p className="subtitle">PT. Prisma Cahaya Lestari</p>
          <h1>
            Project <span>Gallery</span>
          </h1>
          <p>
            A showcase of our completed projects across Indonesia — from chiller
            installations and cooling tower work to panel fitting and pipe jacketing.
          </p>
        </div>
      </section>

      <section className="section gallery-section">
        <div className="container">
          {galleryProjects.map((project) => (
            <ProjectCarousel key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default GalleryPage
