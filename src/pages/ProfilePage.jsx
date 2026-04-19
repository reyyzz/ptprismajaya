import {
  aboutUsCommitment,
  aboutUsHistory,
  aboutUsIntro,
} from '../data/siteData'
import { useScrollReveal } from '../hooks/useScrollReveal'

function ProfilePage() {
  const revealRef = useScrollReveal()

  return (
    <main className="profile-page" ref={revealRef}>
      <section className="section page-hero patterned">
        <div className="container centered narrow">
          <p className="subtitle">{aboutUsIntro.subtitle}</p>
          <h1>{aboutUsIntro.title}</h1>
          <p>{aboutUsIntro.description}</p>
        </div>
      </section>

      <section className="section profile-highlights patterned-alt">
        <div className="container centered narrow" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          <article>
            <p className="subtitle">About Us</p>
            <h2>{aboutUsHistory.title}</h2>
            <p>{aboutUsHistory.description}</p>
            <p>{aboutUsHistory.description2}</p>
          </article>

          <article>
            <p className="subtitle">PT. Prisma Cahaya Lestari</p>
            <h2>{aboutUsCommitment.title}</h2>
            <p>{aboutUsCommitment.description}</p>
            <p>{aboutUsCommitment.description2}</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default ProfilePage
