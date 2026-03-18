import './App.css';
import { WeatherDisplay } from './components/WeatherDisplay';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-white flex flex-col">
      <header className="w-full py-8">
        <h1 className="text-2xl font-semibold text-center text-slate-800 tracking-tight">
          El Tiempo
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start px-4 pb-12">
        <WeatherDisplay />
      </main>
    </div>
  );
}

export default App;
