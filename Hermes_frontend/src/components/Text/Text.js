import React from 'react';

const Text = (prompt) => {
  return (
    <div className='flex justify-center mb-4'>
      <div className='rounded bg-slate-700 py-2 px-4'>
        <p className='text-xs text-slate-400'>{prompt.text}</p>
      </div>
    </div>
  );
};

export default Text;
