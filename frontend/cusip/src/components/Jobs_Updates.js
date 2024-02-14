import { useState } from 'react'
import DashLayout from './Dashboard/DashLayout'
import { FaPlus } from "react-icons/fa";
import { CiBookmark,CiImageOn } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { SlLike } from "react-icons/sl";
import { GoComment } from "react-icons/go";
import Comments from './Job_Updates/Comments';
import Debate from '../assets/Debate.png'
import { IoMdClose } from "react-icons/io";
import { BsEmojiGrin } from "react-icons/bs";
import { LuFiles } from "react-icons/lu";
import { FaLink } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";

function Jobs_Updates() {
  const [selectedTab, setSelectedTab] = useState(false);
  const [isPostClicked, setIsPostClicked] = useState(false);

  const handleButtonClick = () => {
    setSelectedTab(!selectedTab);
  };

  const handlePostClicked = () => {
    setIsPostClicked(!isPostClicked)
  }
  return (
    <DashLayout>
      <h1 className='text-center'>Jobs_Updates</h1>
      <div className='w-full h-full p-3'>
        <div className='w-full bg-white border rounded flex items-center p-2 justify-between'>
          <div className='flex gap-3 items-center'>
            <div className='bg-[#2dabb1] text-white rounded p-2'>NM</div>
            Start a post
          </div>
          <div className='p-2 bg-gray-200 rounded cursor-pointer'><FaPlus onClick={handlePostClicked} /></div>
          {
            isPostClicked && (
              <div className='fixed top-12 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center' togglePost = {handlePostClicked}>
              <div className='bg-white rounded-lg p-4 max-w-[500px]'>
                <div className='flex font-bold justify-between items-center'>
                  Create your Post
                  <button className='cursor-pointer hover:bg-gray-100 p-2 rounded' >
                    <IoMdClose size={24} onClick={handlePostClicked} />
                  </button>
                </div>
                <div>
                  <form className='mt-4 max-h-[500px]'>
                    <div className='h-full overflow-hidden pb-1 overflow-y-scroll w-full'>
                      <p className=' text-wrap whitespace-normal w-full'>fhsdddddddssssgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</p>
                    </div>
                    <div className='w-full border-t-2 pt-2 justify-between flex gap-4 items-center'>
                      <div className='flex items-center gap-3'>
                        <CiImageOn/>
                        <BsEmojiGrin/>
                        <FaLink/>
                        <LuFiles/>
                      </div>
                      <p className='flex items-center gap-2'>You are posting to <button className='underline flex items-center gap-1'>ROOM <RiArrowDropDownLine className='font-bold' size={24}/></button></p>
                      <button type='submit' className='border bg-[#2dabb1] rounded hover:shadow-md text-white p-1'>Publish</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            )
          }
        </div>
        <div className='mt-4'>
          <div className='bg-white p-2 rounded'>
            <div className='max-h-96'>
              <img src={Debate} alt='' className='max-h-96 object-cover w-full'  />
            </div>

            <div className='flex justify-between items-center'>
              <div className='flex gap-3 items-center'>
                <div className='bg-[#2aabb1] h-10 w-10 rounded'></div>
                <div className='flex flex-col'>
                  <div className='flex gap-3 items-center'>Nicodemus Muholo <span>2 hrs ago</span></div>
                  <p>Posted in SCIT Room</p>
                </div>
              </div>
              <div className='flex items-center gap-3'><CiBookmark /> <HiOutlineDotsVertical /></div>
            </div>
            <div>
              <h1 className='font-bold mt-3'>Title Here</h1>
              <p className='mt-3'>You text goes here</p>
            </div>
            <div className='flex w-full justify-between items-center mt-4'>
              <div className='flex gap-3 items-center '>
                <button className=" text-gray-600 hover:text-black font-semibold flex items-center gap-2"><SlLike />Like</button>
                <button className=" text-gray-600 hover:text-black font-semibold flex items-center gap-2" onClick={handleButtonClick}><GoComment />Comment</button>
              </div>
              <button className='flex text-gray-600 hover:text-black items-center gap-2' onClick={handleButtonClick}><span>454</span>comments</button>
            </div>
            <div className='mt-1'>
              {selectedTab && (
                <div><Comments /></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashLayout>

  )
}

export default Jobs_Updates