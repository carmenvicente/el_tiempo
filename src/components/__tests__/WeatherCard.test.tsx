import { render, screen } from '@testing-library/react';
import { WeatherCard } from '../WeatherCard';
import type { WeatherData } from '../../services/weatherApi';

const mockWeatherData: WeatherData = {
  cod: '200',
  main: {
    temp: 22.5,
    feels_like: 21.0,
    humidity: 65,
    pressure: 1013,
    temp_min: 20.0,
    temp_max: 25.0,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  wind: {
    speed: 3.5,
    deg: 180,
    gust: 5.0,
  },
  sys: {
    name: 'Madrid',
    country: 'ES',
    timezone: 3600,
    sunrise: 1672531200,
    sunset: 1672574400,
  },
};

describe('WeatherCard', () => {
  it('muestra el nombre de la ciudad y el pais', () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText('Madrid, ES')).toBeInTheDocument();
  });

  it('muestra la temperatura actual', () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText('23')).toBeInTheDocument();
    expect(screen.getByText('°C')).toBeInTheDocument();
  });

  it('muestra la descripcion del clima', () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText('clear sky')).toBeInTheDocument();
  });

  it('muestra la sensacion termica', () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText('21°C')).toBeInTheDocument();
  });

  it('muestra el porcentaje de humedad', () => {
    render(<WeatherCard data={mockWeatherData} />);
    expect(screen.getByText('65%')).toBeInTheDocument();
  });
});
