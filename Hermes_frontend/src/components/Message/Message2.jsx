import React from 'react';

const Message2 = (props) => {
  return (
    <div className='flex justify-end mb-2'>
      <div className='rounded bg-slate-600 py-2 px-3'>
        <p className='text-sm text-slate-300 mt-1'>{props.msg}</p>
        <p className='text-right text-slate-300 text-xs mt-1'>{props.time}</p>
      </div>
    </div>
  );
};

export default Message2;
