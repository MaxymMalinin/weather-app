import React from 'react';
import { iconUrlFromCode } from '../../services/weatherService';

function Forecast({ title, items }) {
  return (
    <section>
      <div className='flex items-center justify-start mt-6'>
        <p className='text-white font-medium uppercase'>{title}</p>
      </div>

      <hr className='my-2' />

      <div className='flex flex-row items-center justify-between text-white'>
        {items.map((item, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center'
          >
            <p className='font-light text-sm capitalize'>{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              alt=''
              className='w-12 my-1'
            />
            <p className='font-medium'>{`${Math.round(item.temp)}°`}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Forecast;
