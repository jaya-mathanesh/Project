import { AlertTriangle, CloudSun, Droplets, Gauge, MapPin, Wind } from 'lucide-react'
import { useMemo, useState } from 'react'
import HealthImpact from '../components/HealthImpact'
import RiskBadge from '../components/RiskBadge'
import { getHealthImpact } from '../data/healthImpacts'
import { getPublicSummaryText, getWeatherCondition } from '../data/publicForecast'
import { getRiskColor } from '../utils/riskCalculator'

const checklistItems = [
  'Drink sufficient water',
  'Avoid prolonged exposure to direct sunlight',
  'Take breaks during outdoor activity',
  'Wear light and breathable clothing',
  'Check on elderly family members',
  'Seek a cooler place if feeling unwell',
]

const weatherMetrics = [
  { label: 'Temperature', field: 'temperature', unit: '°C', Icon: CloudSun },
  { label: 'Humidity', field: 'humidity', unit: '%', Icon: Droplets },
  { label: 'Wind', field: 'windSpeed', unit: 'm/s', Icon: Wind },
  { label: 'Heat Stress Index', field: 'heatStressIndex', unit: '°C', Icon: Gauge },
]

function PublicDashboard({
  district,
  districts = [],
  selectedState,
  isAdmin,
  onSelectDistrict,
  onPlaceChange,
}) {
  const [checkedItems, setCheckedItems] = useState([])
  const stateDistricts = useMemo(
    () => districts.filter((entry) => entry.state === selectedState),
    [districts, selectedState],
  )
  const heatImpact = getHealthImpact(district.riskLevel)
  const hasSevereAlert = ['DANGER', 'EXTREME DANGER', 'SEVERE'].includes(district.riskLevel)

  function toggleChecklistItem(item) {
    setCheckedItems((current) =>
      current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item],
    )
  }

  return (
    <div className="dashboard-content">
      {isAdmin && (
        <div className="admin-banner">
          <span>ADMIN MONITORING MODE</span>
          <small>District network overview</small>
        </div>
      )}

      <section className="location-card panel">
        <p className="eyebrow">SELECT LOCATION</p>
        <div className="location-selectors">
          <label>
            <span>State</span>
            <select value={selectedState} onChange={(event) => onPlaceChange(event.target.value)}>
              {['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'].map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </label>
          <label>
            <span>District</span>
            <select
              value={district.districtName}
              onChange={(event) => {
                const nextDistrict = stateDistricts.find(
                  (entry) => entry.districtName === event.target.value,
                )
                if (nextDistrict) onSelectDistrict(nextDistrict)
              }}
            >
              {stateDistricts.map((entry) => (
                <option key={entry.districtName} value={entry.districtName}>
                  {entry.districtName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="location-top">
          <div>
            <h1>{district.districtName}</h1>
            <p className="location-name">{district.state} · South India</p>
          </div>
          <RiskBadge level={district.riskLevel} />
        </div>
      </section>

      {hasSevereAlert && (
        <div className="risk-alert" role="alert">
          <AlertTriangle size={19} />
          <div>
            <strong>HEAT RISK ALERT</strong>
            <p>
              High heat stress conditions are currently indicated for {district.districtName}.
              Take precautions and limit prolonged outdoor exposure.
            </p>
          </div>
        </div>
      )}

      <section className="today-weather panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TODAY'S WEATHER</p>
            <h2>{getWeatherCondition(district)}</h2>
          </div>
          <RiskBadge level={district.riskLevel} />
        </div>
        <div className="today-weather-grid">
          {weatherMetrics.map(({ label, field, unit, Icon }) => (
            <div className="today-weather-metric" key={field}>
              <span><Icon size={15} />{label}</span>
              <strong>{district[field]} <small>{unit}</small></strong>
            </div>
          ))}
        </div>
      </section>

      <section
        className="today-risk panel"
        style={{ '--risk-color': getRiskColor(district.riskLevel) }}
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">TODAY'S HEAT RISK</p>
            <RiskBadge level={district.riskLevel} />
          </div>
          <div className="risk-index">
            <span>Heat Stress Index</span>
            <strong>{district.heatStressIndex} °C</strong>
          </div>
        </div>
        <div className="risk-details">
          <p><strong>Exposure:</strong> {heatImpact.exposure}</p>
          <p><strong>Meaning:</strong> {heatImpact.meaning}</p>
        </div>
      </section>

      <HealthImpact district={district} />

      <section className="checklist-panel panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TODAY'S SAFETY CHECKLIST</p>
            <h2>Small steps to stay safe</h2>
          </div>
        </div>
        <ul className="checklist">
          {checklistItems.map((item) => (
            <li key={item} className={checkedItems.includes(item) ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item)}
                  onChange={() => toggleChecklistItem(item)}
                />
                <span>{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="summary-panel panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TODAY'S SUMMARY</p>
            <h2>{district.districtName} outlook</h2>
          </div>
        </div>
        <p className="summary-copy">
          {getPublicSummaryText(district.riskLevel, district.districtName)}
        </p>
      </section>

      <div className="demo-data-note">
        <MapPin size={13} />
        Prototype demonstration data · Not a validated live forecast
      </div>
    </div>
  )
}

export default PublicDashboard
