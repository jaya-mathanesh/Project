import { getRiskColor } from '../utils/riskCalculator'

const legendItems = [
  ['LOW', 'Low'],
  ['CAUTION', 'Caution'],
  ['DANGER', 'Danger'],
  ['EXTREME DANGER', 'Extreme Danger'],
  ['SEVERE', 'Severe'],
]

function RiskLegend() {
  return (
    <div className="map-legend">
      <p className="legend-title">WEATHER RISK</p>
      {legendItems.map(([label, description]) => (
        <div className="legend-row" key={label}>
          <span className="legend-dot" style={{ background: getRiskColor(label) }} />
          <span>{description}</span>
        </div>
      ))}
    </div>
  )
}

export default RiskLegend
