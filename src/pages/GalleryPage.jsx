import { galleryItems } from '../data/siteData'

function GalleryPage() {
  return (
    <main className="gallery-page">
      <section className="section page-hero patterned">
        <div className="container centered narrow">
          <p className="subtitle">PT. BUKAKAINTI AIRCON</p>
          <h1>
            Our <span>Gallery</span>
          </h1>
          <p>
            Documentation of projects, milestones, and partnership activities with
            our clients across commercial and industrial sectors.
          </p>
        </div>
      </section>

      <section className="section gallery-section">
        <div className="container gallery-grid-large">
          {galleryItems.map((item) => (
            <article key={item.title} className="gallery-card">
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="gallery-caption">
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default GalleryPage
