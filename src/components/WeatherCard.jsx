function WeatherCard({ icon: Icon, title, value, label, tone }) {
  return (
    <article className="weather-card" style={{ '--card-tone': tone }}>
      <div className="weather-card-icon"><Icon size={17} strokeWidth={1.8} /></div>
      <div>
        <p className="weather-card-title">{title}</p>
        <strong>{value}</strong>
        <p className="weather-card-label">{label}</p>
      </div>
    </article>
  )
}

export default WeatherCard
