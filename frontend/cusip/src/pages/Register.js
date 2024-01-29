import React from 'react'

export default function Register() {
  return (
    <div className='min-h-screen overflow-hidden'>
      <div className="hidden sm:block bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 p-4 h-60 ">
        <a href='/' className='font-bold text-white'>CUSIP</a>
        <h1 className='font-bold text-center lg:text-3xl text-2xl text-white'>You're a CUSIP lover?</h1>
        <h1 className='font-bold text-center lg:text-3xl text-2xl text-white'>Get ready for an amazing experience with CUSIP portal</h1>
        <p className='text-center text-white'>Do you love Hackerthons? Are passionate about collaborating with other students in your projects?<br/>
        Are you a job seeker? Internship and Attachment Seeker? CUSIP is here for you.<br/>
        Join our platform and get to interact with all these previledges</p>
      </div>
      <div className='flex mt-5 mb-5'>
      <div className='hidden lg:block w-3/5 ml-5'>
        Hi
      </div>
      <div className='lg:w-2/5 w-full lg:mr-5 mx-2'>
        <h1 className='text-center text-xl font-bold mb-5'>Complete your Profile</h1>
        <form>
          <div className='flex sm:flex-row flex-col gap-2'>
            <div className='flex flex-col w-full'>
              <label>First Name</label>
              <input type="text" name="firstName" className='p-2 mt-1 border outline-[#2dabb1]' />
            </div>
            <div className='flex flex-col w-full'>
              <label>Last Name</label>
              <input type="text" name="lastName" className='p-2 mt-1 border outline-[#2dabb1]' />
            </div>
          </div>
          <div className='flex flex-col gap-1 mt-2'>
            <label>Email Address</label>
            <input className='outline-[#2dabb1] p-2 rounded border' type='email' name='email' placeholder='eg. cusip@gmail.com' />
          </div>
          <div className='mt-2 flex flex-col'>
            <label>Gender</label>
            <select
              className="p-2 mt-1 w-full border outline-none rounded"
            >
              <option disabled>Please select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Prefer Not to say</option>
            </select>
          </div>
          <div className='flex flex-col mt-2 gap-1'>
            <label>
              Registration Number
            </label>
            <input className='border p-2 rounded outline-[#2dabb1]' type='text' placeholder='eg. scg202-0289/2025' name='reg_number'/>
          </div>
          <div className='flex items-center gap-3 border mt-3 p-2'>
            <label>Upload your CV</label>
            <button className='bg-gray-300 p-1 rounded font-bold'>Choose file</button>
            <span>No file chosen</span>
          </div>
          <button type='submit' className='text-white font-bold items-center w-full bg-[#2dabb1] rounded mt-3 p-1'>Register</button>
        </form>
      </div>
      </div>
    </div>
  )
}
