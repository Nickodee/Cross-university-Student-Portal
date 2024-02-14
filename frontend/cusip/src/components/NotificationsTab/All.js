import React from 'react'
import { IoPersonSharp } from "react-icons/io5";


function All() {
  return (
    <div className='flex cursor-pointer items-center gap-2 w-full hover:bg-gray-300 border-b-2 p-3'>
        <div className='p-2 rounded-full border'><IoPersonSharp/></div>
        <div className='flex flex-col'>
            <p><span className='font-medium'>James</span> removed you from <span className='font-medium'>Projects</span></p>
            <span className='text-gray-500'>4 hrs ago</span>
        </div>
    </div>
  )
}

export default All