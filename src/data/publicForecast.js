export const publicForecast = [
  { day: 'Today', temperature: '28°C', condition: 'Warm', risk: 'CAUTION' },
  { day: 'Tomorrow', temperature: '29°C', condition: 'Mostly Clear', risk: 'CAUTION' },
  { day: 'Day 3', temperature: '31°C', condition: 'Hot', risk: 'DANGER' },
  { day: 'Day 4', temperature: '32°C', condition: 'Hot', risk: 'DANGER' },
  { day: 'Day 5', temperature: '30°C', condition: 'Partly Cloudy', risk: 'CAUTION' },
]

export function getWeatherCondition(district) {
  if (district.temperature >= 33) return 'Hot conditions'
  if (district.temperature >= 30) return 'Warm and sunny'
  if (district.humidity >= 75) return 'Warm and humid'
  if (district.windSpeed >= 12) return 'Warm with a light breeze'
  return 'Warm conditions'
}

export function getPublicSummaryText(riskLevel, districtName) {
  const summaries = {
    LOW: `Conditions in ${districtName} remain relatively comfortable today. Light outdoor activity is generally manageable, and staying hydrated is still a good habit.`,
    CAUTION: `Warm conditions are expected in ${districtName} with moderate heat stress. People spending long periods outdoors should stay hydrated and take regular breaks.`,
    DANGER: `Heat stress is elevated in ${districtName}. Avoid long outdoor exposure during the hottest parts of the day and keep drinking water.`,
    'EXTREME DANGER': `Heat stress is high in ${districtName}. Limit outdoor activity, seek shade regularly, and take cooling breaks throughout the day.`,
    SEVERE: `Very high heat stress is currently indicated in ${districtName}. Keep exposure to direct sun as low as possible and prioritise cooling and hydration.`,
  }

  return summaries[riskLevel] || summaries.CAUTION
}
