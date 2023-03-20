import React from 'react';
import {
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilTemperatureHalf,
} from '@iconscout/react-unicons';
import {
  formatToLocalTime,
  iconUrlFromCode,
} from '../../services/weatherService';

function TemperatureAndDetails({
  weather: {
    description,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
  units,
  setUnits,
}) {
  const handleUnitsChange = e => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  return (
    <section>
      <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
        <p className='capitalize'>{description}</p>
      </div>

      <div className='flex flex-row items-center justify-between text-white py-3'>
        <div className='flex flex-row w-1/4 items-center justify-center'>
          <button
            name='metric'
            className={`text-xl text-white font-medium transition ease-out hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${
              units === 'metric' ? 'font-bold text-2xl' : ''
            }`}
            onClick={handleUnitsChange}
          >
            °C
          </button>
          <p className='text-xl text-white mx-1'>|</p>
          <button
            name='imperial'
            className={`text-xl text-white font-medium transition ease-out hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
              units === 'imperial' ? 'font-bold text-2xl' : ''
            }`}
            onClick={handleUnitsChange}
          >
            °F
          </button>
        </div>

        <div className='flex flex-row justify-between items-center'>
          <p className='text-5xl'>{`${Math.round(temp)}°`}</p>
          <img
            src={iconUrlFromCode(icon)}
            alt=''
            className='w-20 phone:hidden'
          />
        </div>

        <div className='flex flex-col items-start space-y-2'>
          <div className='flex font-light text-sm items-center justify-center'>
            <UilTemperatureHalf size={18} className='mr-1 phone:hidden' />
            <p>
              Відчувається як:
              <span className='font-medium ml-1'>{`${Math.round(
                feels_like
              )}°`}</span>
            </p>
          </div>

          <div className='flex font-light text-sm items-center justify-center'>
            <UilTear size={18} className='mr-1 phone:hidden' />
            <p>
              Вологість:
              <span className='font-medium ml-1'>{`${Math.round(
                humidity
              )}%`}</span>
            </p>
          </div>

          <div className='flex font-light text-sm items-center justify-center'>
            <UilWind size={18} className='mr-1 phone:hidden' />
            <p>
              Швидкість вітру:
              <span className='font-medium ml-1'>{`${Math.round(speed)} ${
                units === 'metric' ? 'м/с' : 'mph'
              }`}</span>
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3'>
        <UilSun className='phone:hidden' />
        <p className='font-light'>
          Схід:{' '}
          <span className='font-medium ml-1'>
            {formatToLocalTime(sunrise, timezone, 'T')}
          </span>
        </p>
        <p className='font-light'>|</p>

        <UilSunset className='phone:hidden' />
        <p className='font-light'>
          Захід:{' '}
          <span className='font-medium ml-1'>
            {formatToLocalTime(sunset, timezone, 'T')}
          </span>
        </p>
        <p className='font-light'>|</p>

        <UilSun className='phone:hidden' />
        <p className='font-light'>
          Макс:{' '}
          <span className='font-medium ml-1'>{`${Math.round(temp_max)}°`}</span>
        </p>
        <p className='font-light'>|</p>

        <UilSun className='phone:hidden' />
        <p className='font-light'>
          Мін:{' '}
          <span className='font-medium ml-1'>{`${Math.round(temp_min)}°`}</span>
        </p>
      </div>
    </section>
  );
}

export default TemperatureAndDetails;
