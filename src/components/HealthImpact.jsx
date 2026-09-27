import { peopleNeedingExtraCare, getHealthImpact } from '../data/healthImpacts'

function HealthImpact({ district }) {
  const impact = getHealthImpact(district.riskLevel)

  return (
    <section className="impact-panel panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">HEALTH IMPACT</p>
          <h2>How heat may affect you</h2>
        </div>
      </div>

      <div className="impact-detail">
        <strong>Possible effects</strong>
        <ul className="effect-list">
          {impact.possibleEffects.map((effect) => <li key={effect}>{effect}</li>)}
        </ul>
      </div>

      <div className="extra-care">
        <strong>WHO SHOULD TAKE EXTRA CARE?</strong>
        <ul>
          {peopleNeedingExtraCare.map((person) => <li key={person}>{person}</li>)}
        </ul>
      </div>
    </section>
  )
}

export default HealthImpact
