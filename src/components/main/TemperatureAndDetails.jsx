import React from 'react';
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
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
}) {
  return (
    <section>
      <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
        <p className='capitalize'>{description}</p>
      </div>

      <div className='flex flex-row items-center justify-between text-white py-3'>
        <img src={iconUrlFromCode(icon)} alt='' className='w-20' />
        <p className='text-5xl'>{`${Math.round(temp)}°`}</p>
        <div className='flex flex-col space-y-2'>
          <div className='flex font-light text-sm items-center justify-center'>
            <UilTemperature size={18} className='mr-1' />
            <p>
              Відчувається як:
              <span className='font-medium ml-1'>{`${Math.round(
                feels_like
              )}°`}</span>
            </p>
          </div>

          <div className='flex font-light text-sm items-center justify-center'>
            <UilTear size={18} className='mr-1' />
            <p>
              Вологість:
              <span className='font-medium ml-1'>{`${Math.round(
                humidity
              )}%`}</span>
            </p>
          </div>

          <div className='flex font-light text-sm items-center justify-center'>
            <UilWind size={18} className='mr-1' />
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
        <UilSun />
        <p className='font-light'>
          Схід:{' '}
          <span className='font-medium ml-1'>
            {formatToLocalTime(sunrise, timezone, 'T')}
          </span>
        </p>
        <p className='font-light'>|</p>

        <UilSunset />
        <p className='font-light'>
          Захід:{' '}
          <span className='font-medium ml-1'>
            {formatToLocalTime(sunset, timezone, 'T')}
          </span>
        </p>
        <p className='font-light'>|</p>

        <UilSun />
        <p className='font-light'>
          Макс:{' '}
          <span className='font-medium ml-1'>{`${Math.round(temp_max)}°`}</span>
        </p>
        <p className='font-light'>|</p>

        <UilSun />
        <p className='font-light'>
          Мін:{' '}
          <span className='font-medium ml-1'>{`${Math.round(temp_min)}°`}</span>
        </p>
      </div>
    </section>
  );
}

export default TemperatureAndDetails;
