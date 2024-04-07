import { useState, useRef } from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlinePersonAddAlt, MdKeyboardArrowDown, MdOutlineClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";


function ChatRoom() {
    const [isDotsClicked, setIsDotsClicked] = useState(false)
    const messageRef = useRef(null);
    const [isNewPostClicked, setIsNewPostClicked] = useState(false)
    const [isAnonymousClicked, setIsAnonymousClicked] = useState(false)

    const handleDotsClicked = () => {
        setIsDotsClicked(!isDotsClicked)
    }

    const handleNewPost = () => {
        setIsNewPostClicked(!isNewPostClicked)
    }

    const handleClosePost = () => {
        setIsNewPostClicked(!isNewPostClicked)
    }

    const handleAnonymousclicked = () => {
        setIsAnonymousClicked(!isAnonymousClicked)
    }


    return (
        <main className='flex md:flex-row flex-col'>
            <div className='flex h-full flex-col gap-3 border-b-2 md:border-b-0 md:border-r-2 border-gray-300 pr-3'>
                <div className='flex items-center justify-between'>
                    <h1>SCIT</h1>
                    <HiOutlineDotsHorizontal className='cursor-pointer' onClick={handleDotsClicked} />
                </div>
                {/* Handle Dots clicked */}
                {isDotsClicked && (
                    <div className='fixed justify-start gap-3 flex flex-col z-10 right-0 md:left-64 md:top-28 top-24  bg-white shadow-lg border p-2  rounded w-full md:w-[200px]'>
                        <div className='flex items-center gap-2'><div className='bg-red-200 h-9 w-9 rounded-full'></div><span>SCIT</span></div>
                        <button className='flex items-center gap-2 hover:text-[#2dabb1]'><FaPlus /> Create a Group</button>
                        <button className='flex items-center gap-2 hover:text-[#2dabb1]'><MdOutlinePersonAddAlt /> Invite People</button>
                    </div>
                )}
                {/* Handle Dots clicked */}
                <div className='flex md:gap-3 justify-between'>
                    <div className='py-1 px-2 cursor-pointer border flex items-center rounded-full border-gray-300'>All Categories <RiArrowDropDownLine className='text-[24px]' /></div>
                    <div className='p-2 border border-gray-300 rounded-full'><CiSearch /></div>
                    <div className='px-2  py-1 rounded-full cursor-pointer text-white bg-[#2dabb1]' onClick={handleNewPost}>+ New Post</div>
                </div>
                {/* handle the post */}
                {isNewPostClicked && (
                    <div className='fixed justify-start gap-3 flex flex-col z-10 right-3 md:top-[53px] border top-24 h-full bg-white  rounded w-full md:w-[600px]'>
                        <div className='flex items-center justify-between border-b-4 border-gray-200 p-2'>
                            <div className='flex gap-3 items-center'>
                                New
                                <div className='py-1 px-2 border gap-2 bg-gray-100 rounded-full flex items-center'>Question <MdKeyboardArrowDown /></div>
                                in
                                <span>SCIT</span>
                            </div>
                            <MdOutlineClose className='text-[24px] cursor-pointer' onClick={handleClosePost} />
                        </div>
                        <div></div>
                        <div className='flex justify-between mx-3'>
                            <div className='flex items-center gap-2'>
                                {/* anonymous clicked */}
                                {isAnonymousClicked ? (
                                    <div className='flex items-center gap-2'>
                                    <div className='rounded-full justify-between flex w-[45px] h-[25px] items-center p-1 bg-[#2dabb1] cursor-pointer' onClick={handleAnonymousclicked}>
                                        <div></div>
                                        <div className='rounded-full h-4 w-4 bg-gray-50'></div>
                                    </div>
                                    Post Anonymously
                                    </div>
                                ) : (
                                    <div className='flex items-center gap-2'>
                                    <div className='rounded-full flex w-[45px] h-[25px] items-center p-1 bg-gray-200 cursor-pointer' onClick={handleAnonymousclicked}>
                                        <div className='rounded-full h-4 w-4 bg-gray-50'></div>
                                        <div></div>
                                    </div> Post Anonymously</div>)}
                                {/* anonymous clicked */}
                            </div>
                            <button className='py-1 px-2 rounded-full text-white bg-[#2dabb1]'>Post to Everyone</button>
                        </div>
                    </div>
                )}
                {/* handle the post */}
                <div className='overflow-y-scroll'>sdffgdf</div>
            </div>
            <div>ghj</div>
        </main>
    )
}

export default ChatRoom