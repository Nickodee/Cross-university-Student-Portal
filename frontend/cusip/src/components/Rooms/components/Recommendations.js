import React from 'react'

function Recommendations() {
  return (
    <div>
        <h1 className='text-center text-3xl mt-3'>Would you want a Project Partner?</h1>
        <div className='w-full bg-white p-2  mt-2 rounded flex flex-col gap-2'>
            <form className='flex flex-col gap-2'>
            <div className='flex flex-col'>
                <label>Course</label>
                <input className='outline-none p-1 border ' placeholder='Enter Your Course'/>
            </div>
            <div className='flex flex-col'>
                <label>Department</label>
                <input className='outline-none p-1 border ' placeholder='Enter Your Department'/>
            </div>
            <button className='bg-[#2dabb1] p-1 text-white'>Get Recommendations</button>
            </form>
            <div className='bg-white mt-2 p-2'></div>
        </div>
    </div>
  )
}

export default Recommendations