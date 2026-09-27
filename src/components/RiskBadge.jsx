import { getRiskColor } from '../utils/riskCalculator'

function RiskBadge({ level }) {
  return (
    <span className="risk-badge" style={{ '--risk-color': getRiskColor(level) }}>
      <span className="risk-dot" />
      {level}
    </span>
  )
}

export default RiskBadge
