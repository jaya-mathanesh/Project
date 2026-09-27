import cors from 'cors'
import 'dotenv/config'
import express from 'express'

const app = express()
const port = Number(process.env.PORT) || 5000
const frontendOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173']

app.use(cors({ origin: frontendOrigins }))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'OK',
    message: 'WeatherPredictor backend is running',
  })
})

app.get('/api/weather', async (req, res) => {
  const city = typeof req.query.city === 'string' ? req.query.city.trim() : ''
  if (!city) {
    return res.status(400).json({ message: 'A city query parameter is required.' })
  }

  const apiKey = process.env.WEATHER_API_KEY
  if (!apiKey) {
    return res.status(500).json({ message: 'The weather API key is not configured.' })
  }

  const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather')
  weatherUrl.search = new URLSearchParams({
    q: city,
    appid: apiKey,
    units: 'metric',
  }).toString()

  let response
  try {
    response = await fetch(weatherUrl)
  } catch {
    return res.status(502).json({ message: 'Unable to reach the weather service.' })
  }

  if (!response.ok) {
    return res.status(502).json({ message: 'The weather service could not retrieve weather for that city.' })
  }

  let data
  try {
    data = await response.json()
  } catch {
    return res.status(502).json({ message: 'The weather service returned an invalid response.' })
  }

  const current = data?.main
  const wind = data?.wind
  const condition = Array.isArray(data?.weather) ? data.weather[0] : undefined
  if (
    typeof data?.name !== 'string' ||
    typeof current?.temp !== 'number' ||
    !Number.isFinite(current.temp) ||
    typeof current?.humidity !== 'number' ||
    !Number.isFinite(current.humidity) ||
    typeof wind?.speed !== 'number' ||
    !Number.isFinite(wind.speed) ||
    typeof condition?.main !== 'string' ||
    typeof condition?.description !== 'string'
  ) {
    return res.status(502).json({ message: 'The weather service returned an invalid response.' })
  }

  return res.json({
    city: data.name,
    temperature: current.temp,
    humidity: current.humidity,
    windSpeed: wind.speed,
    condition: condition.main,
    description: condition.description,
  })
})

app.use((error, _req, res, _next) => {
  console.error('Unexpected backend error:', error)
  res.status(500).json({ message: 'An unexpected server error occurred.' })
})

app.listen(port, () => {
  console.log(`WeatherPredictor backend listening on http://localhost:${port}`)
})
