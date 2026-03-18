import { SearchBar } from './SearchBar';
import { WeatherCard } from './WeatherCard';
import { useWeather } from '../hooks/useWeather';

export function WeatherDisplay() {
  const { weather, loading, error, searchCity } = useWeather();

  return (
    <div className="w-full max-w-md mx-auto px-4 space-y-6">
      <SearchBar onSearch={searchCity} disabled={loading} />

      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
          <p className="mt-4 text-sm text-slate-500">Buscando ciudad...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
          <p className="text-sm text-red-600 text-center">{error}</p>
        </div>
      )}

      {weather && !loading && !error && <WeatherCard data={weather} />}

      {!weather && !loading && !error && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-300 mb-4"
          >
            <path d="M12 2v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="M20 12h2" />
            <path d="m19.07 4.93-1.41 1.41" />
            <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
            <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
          </svg>
          <p className="text-lg text-slate-500">Busca una ciudad para ver el clima</p>
        </div>
      )}
    </div>
  );
}
