import { CloudSun } from 'lucide-react'
import RiskBadge from './RiskBadge'
import { publicForecast } from '../data/publicForecast'

function ForecastPreview() {
  return (
    <section className="forecast-panel panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">NEXT 5 DAYS</p>
          <h2>Prototype forecast data</h2>
        </div>
        <span className="forecast-disclaimer">Demonstration values · Not a real forecast</span>
      </div>
      <div className="forecast-grid">
        {publicForecast.map((day) => (
          <article key={day.day} className="forecast-card">
            <span className="forecast-day">{day.day}</span>
            <div className="forecast-body">
              <CloudSun size={18} />
              <strong>{day.temperature}</strong>
            </div>
            <p>{day.condition}</p>
            <RiskBadge level={day.risk} />
          </article>
        ))}
      </div>
    </section>
  )
}

export default ForecastPreview
