import { useState } from 'react'
import DashLayout from './Dashboard/DashLayout'
import { FaPen } from "react-icons/fa";
import { RiImageEditLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import { MdLocalPhone } from "react-icons/md";
import { CiLinkedin, CiCirclePlus } from "react-icons/ci";
import { GoCopy } from "react-icons/go";
import { Link } from 'react-router-dom';
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";



function ProProfile() {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isBioOpen, setIsBioOpen] = useState(false);

  const toggleBioModal = () => {
    setIsBioOpen(!isBioOpen);
  };
  const toggleUserModal = () => {
    setIsUserOpen(!isUserOpen)
  }
  return (
    <DashLayout>
      <div className='flex sm:flex-row flex-col md:gap-7 w-full justify-between my-1 gap-2 h-full'>
        <div className='flex flex-col w-full md:ml-7 ml-0'>
          <div className='flex flex-col bg-white rounded p-1'>
            <div className='w-full h-28 bg-gray-100'>
              <div className='relative h-8 w-8 bg-white -right-2 top-2 rounded-full  border cursor-pointer flex items-center justify-center z-9'><RiImageEditLine /></div>
            </div>
            <div className='rounded-full h-32 w-32 bg-white border relative -top-14 left-7'>
              <div className='relative h-8 w-8 bg-white rounded-full -bottom-20 -right-24 border cursor-pointer flex items-center justify-center z-9'><RiImageEditLine /></div>
            </div>
            <div className='relative -top-7 mx-2'>
              <div className='flex w-full justify-between items-center font-bold text-xl'>Nicodemus Muholo <FaPen onClick={toggleUserModal} className='cursor-pointer' /></div>
              <div>
                <div className='flex gap-2 items-center'><SlLocationPin />Nairobi,Kenya</div>
                <div className='flex gap-2 items-center'><MdLocalPhone />+25467676272</div>
                <div className='text-[#2dabb1]'>Graphic Designer</div>
                <div className='flex gap-2 items-center'><CiLinkedin /><span>nicodemusmuholo/linkedin/co/ke</span><GoCopy /></div>
              </div>
            </div>
          </div>
          {/* Code to open the user Modal */}
          {isUserOpen && (
            <div className='fixed top-12 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
              <div className='bg-white rounded-lg p-4 max-w-[500px]'>
                <div className='flex font-bold justify-between items-center'>
                  Edit your personal Information
                  <button className='cursor-pointer hover:bg-gray-100 p-2 rounded' onClick={toggleUserModal}>
                    <IoMdClose size={24} />
                  </button>
                </div>
                <div>
                  <form className='mt-4 flex flex-col gap-3'>
                    <div className='flex gap-3'>
                      <div>
                        <label>First Name</label>
                        <input type='text' placeholder='Enter your First Name' className='w-full p-1 border rounded outline-[#2dabb1]' />
                      </div>
                      <div>
                        <label>Last Name</label>
                        <input type='text' placeholder='Enter your Last Name' className='w-full border rounded p-1 outline-[#2dabb1]' />
                      </div>
                    </div>
                    <div className='flex gap-3'>
                      <div>
                        <label>Course</label>
                        <input type='text' placeholder='Enter your Course' className='w-full border rounded p-1 outline-[#2dabb1]' />
                      </div>
                      <div>
                        <label>Year of Study</label>
                        <input type='text' placeholder='Enter your year of study' className='w-full border rounded p-1 outline-[#2dabb1]' />
                      </div>
                    </div>
                    <div className='flex gap-3'>
                      <div>
                        <label>Title</label>
                        <input type='text' placeholder='eg. Graphic Designer' className='w-full border rounded p-1 outline-[#2dabb1]' />
                      </div>
                      <div>
                        <label>Region</label>
                        <input type='text' placeholder='Enter your Region' className='w-full border rounded p-1 outline-[#2dabb1]' />
                      </div>
                    </div>
                    <div>
                      <label>Linkedin profile</label>
                      <input type='text' placeholder='Enter your Linkedin profile' className='w-full border rounded p-1 outline-[#2dabb1]' />
                    </div>
                    <div>
                      <label>Phone Number</label>
                      <input type='text' placeholder='Enter your Phone Number' className='w-full border rounded p-1 outline-[#2dabb1]' />
                    </div>
                    <div className='flex w-full justify-between gap-3 px-3'>
                      <button onClick={toggleUserModal} className='border rounded-full w-full hover:bg-[#2dabb1] hover:text-white p-2'>Cancel</button>
                      <button type='submit' className='border bg-[#2dabb1] rounded-full w-full hover:shadow-md text-white p-2'>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div className='w-full bg-white rounded mt-3 p-3'>
            <div className='flex justify-between font-bold'>Bio <FaPen className='cursor-pointer' onClick={toggleBioModal} /></div>
            <div>Bio data goes here...</div>
          </div>
          {/* Code to open the Bio Modal */}
          {isBioOpen && (
            <div className='fixed top-12 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
              <div className='bg-white rounded-lg p-4 max-w-[450px]'>
                <div className='flex font-bold justify-between items-center'>
                  Edit About
                  <button className='cursor-pointer hover:bg-gray-100 p-2 rounded' onClick={toggleBioModal}>
                    <IoMdClose size={24} />
                  </button>
                </div>
                <div>
                  <p>Let everyone know you a little bit better, share your experience and goals writing a quick story about yourself</p>
                  <form className='mt-4'>
                    <textarea placeholder='Give us your bio...' className=' h-[200px] p-2 outline-[#2dabb1] w-full border rounded' />
                    <div className='flex w-full justify-between gap-3 px-3'>
                      <button onClick={toggleBioModal} className='border rounded-full w-full hover:bg-[#2dabb1] hover:text-white p-2'>Cancel</button>
                      <button type='submit' className='border bg-[#2dabb1] rounded-full w-full hover:shadow-md text-white p-2'>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div className='w-full bg-white rounded mt-3 p-3'>
            <div className='flex justify-between font-bold'>Education <span className='flex cursor-pointer font-medium items-center gap-2 text-[16px]'>Add <CiCirclePlus /></span></div>
            <div>Education goes here..</div>
          </div>
          <div className='w-full bg-white rounded mt-3 p-3'>
            <div className='flex justify-between font-bold'>Experience <span className='flex cursor-pointer font-medium items-center gap-2 text-[16px]'>Add <CiCirclePlus /></span></div>
            <div>Experience goes here...</div>
          </div>
        </div>
        <div className='flex flex-col w-full sm:mr-7 gap-2'>
          <div className='flex justify-between bg-white p-2 shadow-md items-center rounded'>Languages <FaPen /></div>
          <div className='flex flex-col justify-between bg-white p-2 shadow-md items-center rounded'>Your CV <div className='p-2 hover:text-blue-400 border-dotted border-2 bg-gray-200 flex flex-col gap-3 justify-center items-center'><IoCloudUploadOutline /><p><span><Link to='#' className='text-blue-300'>Click here to upload</Link></span> or drag and drop DOC, PDF, JPEG or PNG</p></div></div>
          <div className='flex flex-col gap-2 justify-between bg-white p-2 shadow-md items-center rounded'>Introduce yourself to clients with a pitch
            <div className='bg-[#2dabb1] cursor-pointer p-2 rounded-lg flex items-center gap-2 text-white'><FaVideo /><span>+ Add link to your video</span></div>
          </div>
          <div className='flex justify-between bg-white p-2 shadow-md items-center rounded'>Your Portfolio <FaPen /></div>
        </div>
      </div>
    </DashLayout>
  )
}

export default ProProfile