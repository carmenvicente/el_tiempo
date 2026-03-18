import type { WeatherData } from '../services/weatherApi';

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const { name, country } = data.sys;
  const { temp, feels_like, humidity } = data.main;
  const [weather] = data.weather;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl shadow-lg border border-slate-100">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-slate-800">
          {name}, {country}
        </h2>
        <p className="text-sm text-slate-500 capitalize">{weather.description}</p>
      </div>

      <div className="flex items-center justify-center py-6">
        <img
          src={iconUrl}
          alt={weather.main}
          className="w-24 h-24 drop-shadow-md"
        />
      </div>

      <div className="text-center">
        <span className="text-6xl font-bold text-slate-800">
          {Math.round(temp)}
        </span>
        <span className="text-3xl font-medium text-slate-600">°C</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-white/60 rounded-2xl">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Sensacion</p>
          <p className="text-lg font-semibold text-slate-700">{Math.round(feels_like)}°C</p>
        </div>
        <div className="p-3 bg-white/60 rounded-2xl">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Humedad</p>
          <p className="text-lg font-semibold text-slate-700">{humidity}%</p>
        </div>
      </div>
    </div>
  );
}
