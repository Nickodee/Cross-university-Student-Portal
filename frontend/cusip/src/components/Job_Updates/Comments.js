import { useState } from 'react'
import { BsEmojiGrin } from "react-icons/bs";
import { LuFiles } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";


function Comments() {
    const [replyTextBox, setReplyTextBox] = useState(false);
    const handleReplyClick = () => {
        setReplyTextBox(!replyTextBox);
    };
    return (
        <div>
            <div>
                <div className='flex gap-3 '>
                    <div className='w-10 h-10 rounded bg-[#2dabb1]'></div>
                    <div className='flex flex-col gap-3 w-full'>
                        <div className='font-medium'>Nicodemus Muholo <span className='text-gray-500'>2 days ago</span></div>
                        <p>Your comment goes here</p>
                        <div className='flex justify-between w-full items-center'>
                            <div className='flex gap-3 items-center'><button>Like</button> <button onClick={handleReplyClick}>Reply</button></div>
                            <div>2 likes</div>
                        </div>
                        {
                            replyTextBox && (
                                <div className='flex gap-3 mt-3'>
                                    <div className='h-10 w-10 bg-[#2dabb1] rounded'></div>
                                    <div className='w-full flex flex-col gap-2'>
                                        <input type='text' className='w-full p-2 rounded border outline-[#2dabb1]' placeholder='What are your thoughts' />
                                        <div className='flex justify-between'>
                                            <ul className='flex gap-3 items-center'>
                                                <LuFiles />
                                                <CiImageOn />
                                                <BsEmojiGrin />
                                            </ul>
                                            <button className='bg-[#2dabb1] px-2 rounded text-white'>Reply</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='flex gap-3 mt-3'>
                <div className='h-10 w-10 bg-[#2dabb1] rounded'></div>
                <div className='w-full flex flex-col gap-2'>
                    <input type='text' className='w-full p-2 rounded outline-[#2dabb1]' placeholder='What are your thoughts' />
                    <div className='flex justify-between'>
                        <ul className='flex gap-3 items-center'>
                            <LuFiles />
                            <CiImageOn />
                            <BsEmojiGrin />
                        </ul>
                        <button className='bg-[#2dabb1] px-2 rounded text-white'>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments