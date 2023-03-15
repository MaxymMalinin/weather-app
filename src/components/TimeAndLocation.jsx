import React from 'react';

function TimeAndLocation() {
  return (
    <div>
      <div className='flex items-center justify-center my-6'>
        <p className='text-white text-xl font-extralight'>
          Tuesday, 15 March 2023 | Local time: 12:46 PM
        </p>
      </div>

      <div className='flex items-center justify-center my-3'>
        <p className='text-white text-3xl font-medium'>Kyiv, UA</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
