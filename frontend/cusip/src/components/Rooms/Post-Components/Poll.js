import React from 'react'

function Poll() {
  return (
    <div className='w-full'>
      <input type='text' placeholder='Poll Title' className='border-b-2 p-2 w-full outline-none'/>
      <input type='text' placeholder='Poll Description' className='border-b-2 p-2 w-full outline-none'/>
      <div className='mx-2 flex flex-col gap-4 mt-3'>
        <input type='text' className='border outline-[#2dabb1] rounded p-2 bg-gray-100 w-full' placeholder='option 1'/>
        <input type='text' className='border outline-[#2dabb1] p-2 rounded bg-gray-100 w-full' placeholder='option 2'/>  
      </div>
      <div className='mt-3 mx-2 flex justify-between items-center'>
        <button className='border items-center rounded-full p-2'>+ Add Option</button>
        <div className='flex items-center gap-2'>
          <div className='flex gap-2 items-center'>Poll Ends in
            <input className='w-[60px] bg-gray-100 outline-none border rounded'/>
          </div>
          <select className='border outline-none bg-gray-100'>
            <option>Day</option>
            <option>Week</option>
            <option>Month</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Poll