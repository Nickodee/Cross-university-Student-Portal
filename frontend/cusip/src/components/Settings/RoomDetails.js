import React from 'react'
import { HiOutlineCamera } from "react-icons/hi";


function RoomDetails() {
  return (
    <div className='p-10'>
        <h1>ROOM</h1>
        <div className='rounded-full h-32 w-32 bg-white border'>
              <div className='relative h-8 w-8 bg-white rounded-full -bottom-20 -right-24 border cursor-pointer flex items-center justify-center z-9'><HiOutlineCamera /></div>
         </div>
         <div className='flex flex-col gap-2 border-b-2 pb-4'>
            Room name
            <input type='text' placeholder='ROOM' className='rounded outline-red-500 p-2 bg-gray-200'/>
            <button className='bg-gray-300 rounded-full py-2 px-4'>Save Changes</button>
         </div>
         <div className='flex-col flex gap-3 border-b-2 pb-5'>
            <h1>Archive Room</h1>
            <p>Archiving this Room will prevent it from showing up in the left left sidebar for all room members, but leave the room accessible from the room archives under the main menu</p>
            <button className='bg-gray-300 rounded-full py-2 px-4'>Archive</button>
         </div>
         <div className='flex-col flex gap-3 border-b-2 pb-5'>
            <h1>Delete Room</h1>
            <p>We will permanently delete your room and all data included</p>
            <button className='bg-red-50 border border-red-500 text-red-500 rounded-full py-2 px-4'>Delete</button>
         </div>
    </div>
  )
}

export default RoomDetails