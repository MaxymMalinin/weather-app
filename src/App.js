import './App.css';
import TopButtons from './components/header/TopButtons';
import Inputs from './components/header/Inputs';
import TimeAndLocation from './components/main/TimeAndLocation';
import TemperatureAndDetails from './components/main/TemperatureAndDetails';
import Forecast from './components/main/Forecast';
import { getFormattedWeatherData } from './services/weatherService';
import { useEffect, useState } from 'react';

function App() {
  const [query, setQuery] = useState({ q: 'kyiv' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then(data => {
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <>
      {/* className='mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br
      from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400' */}
      <header
        className='mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br
      from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400'
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      </header>

      {weather && (
        <main
          className='mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br
      from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400'
        >
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} units={units} />

          <Forecast
            title='Погода на 3 години'
            items={weather.everyThreeHours}
          />
          <Forecast title='Погода на 5 днів' items={weather.daily} />
        </main>
      )}
    </>
  );
}

export default App;
