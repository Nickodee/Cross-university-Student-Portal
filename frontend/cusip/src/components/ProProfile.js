import React from 'react'
import DashLayout from './Dashboard/DashLayout'
import { FaPen } from "react-icons/fa";
import { RiImageEditLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import { MdLocalPhone } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { GoCopy } from "react-icons/go";







function ProProfile() {
  return (
    <DashLayout>
      <div className='flex sm:flex-row flex-col gap-7 w-full justify-between mt-1 mb-5 overflow-hidden overflow-y-scroll h-96'>
        <div className='flex flex-col w-full md:ml-7 ml-0'>
          <div className='flex flex-col bg-white rounded p-1'>
            <div className='w-full h-28 bg-gray-100'>
              <div className='relative h-8 w-8 bg-white rounded-full -bottom-16 -right-96 border cursor-pointer flex items-center justify-center z-20'><RiImageEditLine /></div>
            </div>
            <div className='rounded-full h-32 w-32 bg-white border relative -top-14 left-7'>
              <div className='relative h-8 w-8 bg-white rounded-full -bottom-20 -right-24 border cursor-pointer flex items-center justify-center z-20'><RiImageEditLine /></div>
            </div>
            <div className='relative -top-7 mx-2'>
              <div className='flex w-full justify-between items-center font-bold text-xl'>Nicodemus Muholo <FaPen className='cursor-pointer' /></div>
              <div>
                <div className='flex gap-2 items-center'><SlLocationPin/>Nairobi,Kenya</div>
                <div className='flex gap-2 items-center'><MdLocalPhone/>+25467676272</div>
                <div className='text-[#2dabb1]'>Graphic Designer</div>
                <div className='flex gap-2 items-center'><CiLinkedin/><span>nicodemusmuholo/linkedin/co/ke</span><GoCopy/></div>
              </div>
            </div>
          </div>
          <div className='w-full bg-white rounded mt-3 p-3'>
            <div className='flex justify-between font-bold'>Bio <FaPen className='cursor-pointer'/></div>
            <div>Bio data goes here...</div>
          </div>
          <div className='w-full bg-white rounded mt-3 p-3'>
            <div className='flex justify-between font-bold'>Education <FaPen className='cursor-pointer'/></div>
            <div>Education goas here..</div>
          </div>
          <div className='w-full bg-white rounded mt-3 p-3'>
            <div className='flex justify-between font-bold'>Experience <FaPen className='cursor-pointer'/></div>
            <div>Experience goes here...</div>
          </div>
        </div>
        <div className='flex flex-col w-full mr-7'>
          <div className='flex justify-between bg-white p-2 shadow-md items-center rounded'>Languages <FaPen /></div>
        </div>
      </div>
    </DashLayout>
  )
}

export default ProProfile