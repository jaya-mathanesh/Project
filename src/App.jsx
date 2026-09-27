import { useMemo, useState } from 'react'
import Navbar, { AboutModal } from './components/Navbar'
import ForecastPreview from './components/ForecastPreview'
import WeatherMap from './components/WeatherMap'
import { defaultDistrict, districts, states } from './data/districts'
import PublicDashboard from './pages/PublicDashboard'
import './App.css'

function App() {
  const [view, setView] = useState('public')
  const [selectedState, setSelectedState] = useState(defaultDistrict.state)
  const [selectedDistrict, setSelectedDistrict] = useState(defaultDistrict)
  const [districtSelectionSource, setDistrictSelectionSource] = useState('selector')
  const [showAbout, setShowAbout] = useState(false)

  const placeOptions = useMemo(() => states, [])

  function handlePlaceChange(state) {
    setSelectedState(state)
    const firstDistrict = districts.find((district) => district.state === state)
    if (firstDistrict) {
      setSelectedDistrict(firstDistrict)
      setDistrictSelectionSource('selector')
    }
  }

  function handleDistrictChange(district, source = 'selector') {
    setSelectedDistrict(district)
    setSelectedState(district.state)
    setDistrictSelectionSource(source)
  }

  return (
    <div className="app-shell">
      <Navbar
        view={view}
        selectedState={selectedState}
        placeOptions={placeOptions}
        onViewChange={setView}
        onPlaceChange={handlePlaceChange}
        onAbout={() => setShowAbout(true)}
      />
      <main className="main-layout">
        <PublicDashboard
          district={selectedDistrict}
          districts={districts}
          selectedState={selectedState}
          isAdmin={view === 'admin'}
          onSelectDistrict={handleDistrictChange}
          onPlaceChange={handlePlaceChange}
        />
        <WeatherMap
          districts={districts}
          selectedDistrict={selectedDistrict}
          selectionSource={districtSelectionSource}
          onSelectDistrict={handleDistrictChange}
        />
      </main>
      <div className="forecast-footer">
        <ForecastPreview />
      </div>
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  )
}

export default App
