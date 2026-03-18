export interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  temp_min: number;
  temp_max: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface City {
  name: string;
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  main: CurrentWeather;
  weather: WeatherCondition[];
  wind: Wind;
  sys: City;
  cod: number;
  message: number;
}

export type WeatherError = {
  code: number;
  message: string;
};
