import React from 'react'

function Note() {
  return (
    <div>
      <div className=' border-b-2'>
        <input type='text' className='text-[20px] p-2 outline-none w-full ml-2' placeholder='Write a title for yor note'/>
      </div>
      <div></div>
      <div>
        <textarea className='w-full p-2 h-full outline-none' placeholder='Write your note'></textarea>
      </div>
    </div>
  )
}

export default Note