import { useState, useCallback, useEffect, useRef } from 'react';
import { getCurrentWeather, WeatherApiError } from '../services/weatherApi';
import type { WeatherData } from '../services/weatherApi';

export interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  searchCity: (city: string) => Promise<void>;
}

export function useWeather(): UseWeatherReturn {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const searchCity = useCallback(async (city: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const trimmedCity = city.trim();
      if (!trimmedCity) {
        setError('Por favor, introduce el nombre de una ciudad');
        setLoading(false);
        return;
      }

      const data = await getCurrentWeather(trimmedCity);
      setWeather(data);
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setError(err.message);
      } else {
        setError('Error al obtener los datos del clima');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    weather,
    loading,
    error,
    searchCity
  };
}
