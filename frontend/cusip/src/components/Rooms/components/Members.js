import React from 'react'
import Member from '../../../assets/member.jpg'
import { HiOutlineDotsVertical } from "react-icons/hi";

function Members() {
  return (
    <div className='flex gap-3 mt-1'>
      <div className='flex flex-col items-center bg-white p-1 shadow-sm rounded'>
        <div className='h-[100px] border rounded-lg  w-[100px] bg-white object-cover'>
          <img src={Member} alt='member' className='w-full h-full object-cover' />
        </div>
        <div className='flex justify-between items-center'>
          <h1>James Ogada</h1>
          <HiOutlineDotsVertical />
        </div>
      </div>
      <div className='flex flex-col items-center bg-white p-1 shadow-sm rounded'>
        <div className='h-[100px] border rounded-lg  w-[100px] bg-white object-cover'>
          <img src={Member} alt='member' className='w-full h-full object-cover' />
        </div>
        <div className='flex justify-between items-center'>
          <h1>James Ogada</h1>
          <HiOutlineDotsVertical />
        </div>
      </div>
    </div>
  )
}

export default Members