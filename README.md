# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## WeatherPredictor backend

The Express backend retrieves current conditions from OpenWeatherMap. Copy `backend/.env.example`
to `backend/.env` and set `WEATHER_API_KEY` to an OpenWeatherMap API key. The root `.gitignore`
excludes `.env` files so the key is not committed.

Install and start the backend in a terminal:

```sh
cd backend
npm install
npm start
```

For automatic restarts while developing, use `npm run dev` instead. Start the frontend in a
separate terminal from the project root with `npm run dev`. The frontend requests current weather
from `http://localhost:5000/api/weather?city=<city>`; the existing heat-risk indicators remain
prototype data.

Test the health check by opening `http://localhost:5000/api/health` or running:

```sh
curl http://localhost:5000/api/health
```

Test current weather with a URL-encoded city, for example:

```sh
curl "http://localhost:5000/api/weather?city=Chennai"
```

The weather endpoint requires a valid `WEATHER_API_KEY`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
