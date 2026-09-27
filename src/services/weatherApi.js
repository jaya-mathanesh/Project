const WEATHER_API_URL = 'http://localhost:5000/api/weather'

export async function getWeatherForCity(city, { signal } = {}) {
  const url = new URL(WEATHER_API_URL)
  url.searchParams.set('city', city)

  const response = await fetch(url, { signal })
  let data
  try {
    data = await response.json()
  } catch {
    throw new Error('The backend returned an invalid response.')
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Unable to retrieve weather for this location.')
  }

  if (
    typeof data?.city !== 'string' ||
    typeof data?.temperature !== 'number' ||
    !Number.isFinite(data.temperature) ||
    typeof data?.humidity !== 'number' ||
    !Number.isFinite(data.humidity) ||
    typeof data?.windSpeed !== 'number' ||
    !Number.isFinite(data.windSpeed) ||
    typeof data?.condition !== 'string' ||
    typeof data?.description !== 'string'
  ) {
    throw new Error('The backend returned an invalid weather response.')
  }

  return data
}
