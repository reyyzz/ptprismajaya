import {
  serviceIntro,
  serviceItems,
  serviceStatsIntro,
  serviceStats,
  serviceTeam,
} from '../data/siteData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import CountUpStat from '../components/CountUpStat'

function ServicePage() {
  const revealRef = useScrollReveal()

  return (
    <main className="service-page" ref={revealRef}>
      <section className="section page-hero patterned">
        <div className="container centered narrow">
          <p className="subtitle">{serviceIntro.subtitle}</p>
          <h1>{serviceIntro.title}</h1>
          <p>{serviceIntro.description}</p>
        </div>
      </section>

      <section className="section service-team-section">
        <div className="container centered">
          <h2>Our Service Team</h2>
          <div className="service-team-grid">
            {serviceTeam.map((team) => (
              <article key={team.title} className="service-team-card">
                <img src={team.image} alt={team.title} loading="lazy" />
                <h3>{team.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-list-section patterned-alt">
        <div className="container centered">
          <p className="subtitle">PT. Prisma Cahaya Lestari</p>
          <h2>Our Services</h2>

          <div className="service-grid">
            {serviceItems.map((item) => (
              <article key={item.title} className="service-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-stats-section">
        <div className="container centered narrow">
          <p className="subtitle">SUCCESS RATING</p>
          <h2>Our Data Statistic <span>Results</span></h2>
          <p>{serviceStatsIntro}</p>
        </div>
        <div className="container">
          <div className="stat-grid">
            {serviceStats.map((stat, index) => (
              <CountUpStat key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default ServicePage
