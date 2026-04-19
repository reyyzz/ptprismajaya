import { useCountUp } from '../hooks/useCountUp'

function CountUpStat({ stat }) {
  const { ref, count } = useCountUp(stat.value, 3000)

  return (
    <article className="stat-card" ref={ref}>
      <div className="stat-background" aria-hidden="true">
        {count}
      </div>
      <div className="stat-content">
        <span className="stat-value">
          {count}
          {stat.suffix}
        </span>
        <span className="stat-label"> {stat.label}</span>
      </div>
    </article>
  )
}

export default CountUpStat
