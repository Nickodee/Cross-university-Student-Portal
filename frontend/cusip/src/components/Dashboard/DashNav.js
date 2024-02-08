import { useState, useEffect, useRef } from 'react';
import { LuMessageSquare } from 'react-icons/lu';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FaBars } from 'react-icons/fa';
import { IoSearch } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";





function DashNav({ onToggleAsideNav }) {
  const [isDotsClicked, setIsDotsClicked] = useState(false);
  const [isMessageClicked, setIsMessageClicked] = useState(false);
  const [isNotificationClicked, setIsNotificationClicked] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const messageRef = useRef(null);

  //handle message button clicked
  const handleMessageClick = () => {
    setIsMessageClicked(!isMessageClicked);
    setIsProfileClicked(false)
    setIsNotificationClicked(false)
  };

  //handle three dots clicked
  const handleDotsClick = () => {
    setIsDotsClicked(!isDotsClicked)
  }

  //handle is profile clicked
  const handleProfileClick = () => {
    setIsProfileClicked(!isProfileClicked);
    setIsMessageClicked(false)
    setIsNotificationClicked(false)
  };

  //handle  notification click
  const handleNotificationClick = () => {
    setIsNotificationClicked((prev) => !prev);
    setIsMessageClicked(false)
    setIsProfileClicked(false)
  };


  //To handle removal of the divs when someone clicks anywhere outside the in the page
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setIsMessageClicked(false);
        setIsProfileClicked(false)
        setIsNotificationClicked(false)
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <nav className='w-full items-center px-3 py-2 justify-between bg-white md:flex'>
      <div className='w-full flex justify-between items-center'><FaBars onClick={onToggleAsideNav} className='cursor-pointer' />
        <button className='md:hidden' onClick={() => setIsDotsClicked(!isDotsClicked)}>{isDotsClicked ? (
                      <IoIosClose size={24} />
                    ) : (
                      <BsThreeDotsVertical />
                    )}</button>
      </div>
      <div className={`border rounded z-10 items-center md:mr-6 md:flex p-1 ${isDotsClicked ? 'mt-3 block flex justify-between' : 'hidden'}`}><input type='text' className='outline-none w-full' placeholder='Search here...' /> <IoSearch /></div>
      <div className={`md:flex z-10 items-center gap-3 ${isDotsClicked ? 'md:p-0 block  items-center justify-end flex mt-2' : 'hidden'}`} ref={messageRef}>
        <div className='items-center flex' onClick={handleNotificationClick}>
          <IoIosNotificationsOutline size={20} className='text-[#2dabb1] cursor-pointer' />
          <div className='bg-red-600 -top-2 cursor-pointer text-[14px] right-3 relative max-h-4 items-center p-1 justify-center flex text-white rounded-full'>
            0
          </div>
        </div>
        {isNotificationClicked && (
          <div className='fixed items-center flex flex-col p-3 z-10 right-0 md:right-32 md:top-12 w-full top-32 md:w-[200px]  bg-white shadow-lg border  rounded'>
            <div>Your Notifications</div>
          </div>
        )}
        <div className='items-center cursor-pointer flex' onClick={handleMessageClick} >
          <LuMessageSquare size={18} className='text-[#2dabb1]' />
          <div className='bg-red-600 -top-2 text-[14px] right-3 relative max-h-4 items-center p-1 justify-center flex text-white rounded-full'>
            0
          </div>
        </div>
        {isMessageClicked && (
          <div className='fixed items-center flex flex-col z-10 right-0  md:right-24 md:top-12 top-32  bg-white shadow-lg border  rounded ${isDotsClicked w-full md:w-[200px]'>
            <div className='flex flex-row w-full justify-between items-center my-2 px-2'>
              <p>MESSAGES</p>
              <div className='bg-red-400 text-white p-1'>0 New</div>
            </div>
            <hr className='border-b border-gray-300 w-full' />
            <hr className='border-b border-gray-300 w-full mt-5 mb-2' />
            <div className='text-center p-1 cursor-pointer w-full  hover:bg-gray-200 center mb-2 text-[13px]'>Read all messages</div>
          </div>
        )}
        <div className='h-9 w-9 cursor-pointer bg-black rounded-full text-white items-center justify-center flex' onClick={handleProfileClick}>NM</div>
        {isProfileClicked && (
          <div className='fixed items-center flex flex-col z-10 right-0 md:right-9 md:top-12 top-32  bg-white shadow-lg border  rounded w-full md:w-[200px]'>
            <Link to="/dashboard/profile" className='cursor-pointer flex gap-2 items-center my-2 w-full  p-2 hover:bg-slate-200'><FiUser /> Edit Profile</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default DashNav;
