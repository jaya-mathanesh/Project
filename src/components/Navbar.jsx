import { CloudSun, Info, MapPin, X } from 'lucide-react'

function Navbar({ view, selectedState, placeOptions, onViewChange, onPlaceChange, onAbout }) {
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <div className="brand-mark">
          <CloudSun size={20} />
        </div>
        <div className="brand-meta">
          <div className="brand-name">
            WeatherPredictor
            <span>INDIA</span>
          </div>
          <p>Local weather and heat risk · South India</p>
        </div>
      </div>

      <nav className="nav-actions" aria-label="Primary navigation">
        <div className="live-status">
          <i />
          LIVE DATA
        </div>

        <div className="view-switcher">
          <button type="button" className={view === 'public' ? 'active' : ''} onClick={() => onViewChange('public')}>
            Public View
          </button>
          <button type="button" className={view === 'admin' ? 'active' : ''} onClick={() => onViewChange('admin')}>
            Admin View
          </button>
        </div>

        <label className="place-select">
          <MapPin size={14} />
          <span className="place-label">Place</span>
          <select value={selectedState} onChange={(event) => onPlaceChange(event.target.value)}>
            {placeOptions.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="about-button" onClick={onAbout}>
          <Info size={15} />
          About
        </button>
      </nav>
    </header>
  )
}

export function AboutModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="about-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="close-button" onClick={onClose} aria-label="Close">
          <X size={17} />
        </button>
        <div className="modal-icon">
          <CloudSun size={26} />
        </div>
        <p className="eyebrow">PROTOTYPE OVERVIEW</p>
        <h2>WeatherPredictor</h2>
        <p className="modal-copy">
          WeatherPredictor is a prototype District Weather &amp; Heat Stress Early Warning System.
        </p>
        <p className="modal-copy">
          It visualizes weather conditions, district risk, heat stress, health impacts, and
          preventive guidance to help people understand local conditions.
        </p>
        <div className="demo-notice">
          Weather values shown in this prototype are demonstration data unless connected to a
          validated live weather service.
        </div>
      </div>
    </div>
  )
}

export default Navbar
