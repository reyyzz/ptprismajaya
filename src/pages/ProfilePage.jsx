import {
  aboutUsCommitment,
  aboutUsHistory,
  aboutUsIntro,
  aboutUsTeam,
} from '../data/siteData'

function ProfilePage() {
  return (
    <main className="profile-page">
      <section className="section page-hero patterned">
        <div className="container centered narrow">
          <p className="subtitle">{aboutUsIntro.subtitle}</p>
          <h1>{aboutUsIntro.title}</h1>
          <p>{aboutUsIntro.description}</p>
        </div>
      </section>

      <section className="section profile-highlights">
        <div className="container">
          <div className="centered">
            <p className="subtitle">Dedicated To Your Business</p>
            <h2>Our Team</h2>
          </div>

          <div className="team-grid">
            {aboutUsTeam.map((member) => (
              <article key={member.name} className="team-card">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section profile-highlights patterned-alt">
        <div className="container profile-copy-single">
          <article className="profile-card">
            <p className="subtitle">About Us</p>
            <h2>{aboutUsHistory.title}</h2>
            <p>{aboutUsHistory.description}</p>
            <p>{aboutUsHistory.description2}</p>
          </article>

          <article className="profile-card">
            <p className="subtitle">PT. BUKAKAINTI AIRCON</p>
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
