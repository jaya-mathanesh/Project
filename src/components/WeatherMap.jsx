import { useEffect } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet'
import { getRiskColor } from '../utils/riskCalculator'
import RiskLegend from './RiskLegend'
import 'leaflet/dist/leaflet.css'

function MapViewport({ district, selectionSource }) {
  const map = useMap()

  useEffect(() => {
    map.flyTo([district.latitude, district.longitude], 6, { duration: 0.8 })
    if (selectionSource !== 'map') map.closePopup()
  }, [district, map, selectionSource])

  return null
}

function WeatherMap({ districts, selectedDistrict, selectionSource, onSelectDistrict }) {
  const mapDistrict = selectedDistrict || districts[0]

  return (
    <section className="map-panel">
      <div className="map-toolbar">
        <div className="map-toolbar-main">
          <div>
            <p className="map-toolbar-title">WEATHER RISK MAP</p>
            <span className="map-toolbar-subtitle">Select a district marker for local details</span>
          </div>
        </div>
      </div>

      <MapContainer center={[13.5, 78.8]} zoom={6} zoomControl className="weather-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewport district={mapDistrict} selectionSource={selectionSource} />

        {districts.map((district) => (
          <CircleMarker
            key={district.districtName}
            center={[district.latitude, district.longitude]}
            pathOptions={{
              color: getRiskColor(district.riskLevel),
              fillColor: getRiskColor(district.riskLevel),
              fillOpacity: 0.85,
              weight: 2,
            }}
            radius={9}
            eventHandlers={{
              click: () => onSelectDistrict(district, 'map'),
            }}
          >
            <Popup>
              <div className="district-popup">
                <h3>{district.districtName}</h3>
                <p className="popup-kicker">{district.state}</p>
                <div className="popup-stat">
                  <span>Temperature</span>
                  <b>{district.temperature}°C</b>
                </div>
                <div className="popup-stat">
                  <span>Humidity</span>
                  <b>{district.humidity}%</b>
                </div>
                <div className="popup-stat">
                  <span>Wind</span>
                  <b>{district.windSpeed} m/s</b>
                </div>
                <div className="popup-stat">
                  <span>Heat Stress Index</span>
                  <b>{district.heatStressIndex}°C</b>
                </div>
                <div className="popup-risk" style={{ color: getRiskColor(district.riskLevel) }}>
                  Risk: {district.riskLevel}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="map-selected-state">
        <span className="selected-indicator" />
        {mapDistrict.districtName}, {mapDistrict.state}
      </div>

      <RiskLegend />

      <div className="map-caption">
        District weather-risk markers · Demonstration data
      </div>
    </section>
  )
}

export default WeatherMap
