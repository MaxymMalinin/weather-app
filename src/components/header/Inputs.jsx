import React, { useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';

function Inputs({ setQuery }) {
  const [city, setCity] = useState('');

  const handleSearchClick = () => {
    if (city !== '') setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <nav className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4 phone:w-4/5'>
        <input
          value={city}
          onChange={e => setCity(e.currentTarget.value)}
          type='text'
          placeholder='Пошук міста...'
          className='text-xl font-light p-2 w-full shadow-xl capitalize placeholder:lowercase rounded-3xl focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-cyan-300'
          onKeyUp={e => (e.key === 'Enter' ? handleSearchClick() : false)}
        />
        <UilSearch
          size={25}
          className='text-white cursor-pointer transition ease-out hover:scale-125'
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className='text-white cursor-pointer transition ease-out hover:scale-125'
          onClick={handleLocationClick}
        />
      </div>
    </nav>
  );
}

export default Inputs;
