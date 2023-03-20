import React from 'react';

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: 'Київ',
    },
    {
      id: 2,
      title: 'Львів',
    },
    {
      id: 3,
      title: 'Одеса',
    },
    {
      id: 4,
      title: 'Харків',
    },
    {
      id: 5,
      title: 'Дніпро',
    },
  ];

  return (
    <nav className='flex items-center justify-around pt-3'>
      {cities.map(city => (
        <button
          key={city.id}
          className='text-white text-lg font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300'
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </nav>
  );
}

export default TopButtons;
