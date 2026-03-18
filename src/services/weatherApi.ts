import type { WeatherData, WeatherError } from '../types/weather';

export type { CurrentWeather, WeatherCondition, Wind, City, WeatherData, WeatherError } from '../types/weather';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

class WeatherApiError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.name = 'WeatherApiError';
    this.code = code;
  }
}

function getApiKey(): string | undefined {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  }
  return undefined;
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new WeatherApiError(500, 'API key no configurada. Verifica la variable VITE_OPENWEATHERMAP_API_KEY en el archivo .env');
  }

  const url = new URL(API_BASE_URL);
  url.searchParams.set('q', city);
  url.searchParams.set('appid', apiKey);
  url.searchParams.set('units', 'metric');

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData: WeatherError = await response.json().catch(() => ({
        cod: response.status,
        message: 'Error desconocido'
      }));

      switch (response.status) {
        case 404:
          throw new WeatherApiError(404, `Ciudad no encontrada: "${city}"`);
        case 401:
          throw new WeatherApiError(401, 'API key inválida. Verifica tu clave de OpenWeatherMap');
        default:
          throw new WeatherApiError(
            errorData.code || response.status,
            errorData.message || `Error HTTP: ${response.status}`
          );
      }
    }

    const data: WeatherData = await response.json();
    return data;

  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new WeatherApiError(0, 'Error de red. Verifica tu conexión a internet');
    }
    throw new WeatherApiError(500, `Error inesperado: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export { WeatherApiError };
