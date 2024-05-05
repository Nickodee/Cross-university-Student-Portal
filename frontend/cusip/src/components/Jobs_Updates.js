import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DashLayout from './Dashboard/DashLayout'
import { FaPlus } from "react-icons/fa";
import { CiBookmark, CiImageOn } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { SlLike } from "react-icons/sl";
import { GoComment } from "react-icons/go";
import Comments from './Job_Updates/Comments';
import { IoMdClose } from "react-icons/io";
import { BsEmojiGrin } from "react-icons/bs";
import { LuFiles } from "react-icons/lu";
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { createNewPost, reset, retrieveAllPosts } from '../features/posts/postSlice';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import postService from '../features/posts/postService';



function Jobs_Updates() {
  const [selectedTab, setSelectedTab] = useState(false);
  const [isPostClicked, setIsPostClicked] = useState(false);
  const [posts, setPosts] = useState(null)
  const fileInputRef = useRef(null);
  const [is3DotsClicked, setIs3DotsClicked] = useState(false)
  const [clickedPostIndex, setClickedPostIndex] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.retrievePosts();
        setPosts(response);
      } catch (error) {
        console.error('Failed to fetch posts:', error.message);
      }
    };

    fetchPosts();
  }, []);


  // Function to handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData((prevState) => ({
          ...prevState,
          image: reader.result // Store image as base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const [postData, setPostData] = useState({
    title: '',
    description: '',
    image: '',
    content: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const { title, description, image, content } = postData

  const { user } = useSelector((state) => state.auth)


  const onChange = (e) => {
    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


  const onPostSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title,
      description,
      image,
      content
    }
    dispatch(createNewPost(postData))
  }


  const handleButtonClick = () => {
    setSelectedTab(!selectedTab);
  };

  const handlePostClicked = () => {
    setIsPostClicked(!isPostClicked)
  }

  const handle3DotsClicked = (index) => {
    setIs3DotsClicked(!is3DotsClicked)
    setClickedPostIndex(index);
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
              <div className='fixed top-0 z-20 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center' togglePost={handlePostClicked}>
                <div className='bg-white rounded-lg p-4 max-w-[500px]'>
                  <div className='flex font-bold justify-between items-center'>
                    Create your Post
                    <button className='cursor-pointer hover:bg-gray-100 p-2 rounded' >
                      <IoMdClose size={24} onClick={handlePostClicked} />
                    </button>
                  </div>
                  <div>
                    <form className='mt-2 max-h-[500px]' onSubmit={onPostSubmit}>
                      <div className='h-full overflow-hidden pb-1 overflow-y-scroll w-full'>
                        <div>
                          <input
                            type='file'
                            id='image'
                            accept='image/*'
                            // style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleImageChange}
                          />
                          <button className='flex items-center gap-3' onClick={() => fileInputRef.current.click()}>Add a cover Photo <MdPhotoSizeSelectLarge className='cursor-pointer text-[#2dabb1]' /></button>
                        </div>
                        <input type='text' placeholder='Write your title' id='title' onChange={onChange} value={title} name="title" className='outline-none p-1 w-full border-b-2' />
                        <input type='text' placeholder='Enter the title description' id='description' onChange={onChange} value={description} name="description" className='outline-none border-b-2 p-1 w-full' />
                        <textarea className=' text-wrap whitespace-normal w-full outline-none mt-3' value={content} id='content' name='content' onChange={onChange} placeholder='Content goes here'></textarea>
                      </div>
                      <div className='w-full border-t-2 pt-2  md:justify-between flex-col md:flex-row gap-2 flex md:gap-4 md:items-center'>
                        <div className='flex items-center gap-3'>
                          <CiImageOn className='cursor-pointer' />
                          <BsEmojiGrin className='cursor-pointer' />
                          <FaLink className='cursor-pointer' />
                          <LuFiles className='cursor-pointer' />
                        </div>
                        <p className='flex items-center gap-2'>You are posting to <button className='underline flex items-center gap-1'>ROOM <RiArrowDropDownLine className='font-bold' size={24} /></button></p>
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
          {posts && posts.map((post, index) => (
            <div className='bg-white p-2 rounded'>
              <div className='max-h-96'>
                {post.image}
              </div>
              <div className='flex justify-between items-center relative'>
                <div className='flex gap-3 items-center'>
                  <div className='bg-[#2aabb1] h-10 w-10 rounded'></div>
                  <div className='flex flex-col'>
                    <div className='flex gap-3 items-center'><span className='text-[#2dabb1]'>{post.first_name}</span> <span className='text-gray-400'>2 hrs ago</span></div>
                    <p>Posted in SCIT Room</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 relative'><CiBookmark className='cursor-pointer' /> <HiOutlineDotsVertical className='cursor-pointer' onClick={() => handle3DotsClicked(index)} /></div>
                {/* handle dots clicked */}
                {is3DotsClicked && clickedPostIndex === index && (
                  <div className='bg-white absolute py-2 pl-2 pr-5 rounded shadow z-10 right-2 top-10 flex flex-col gap-2'>
                    <button className='hover:bg-slate-200 hover:p-1 hover:text-black hover:rounded p-1 bg-[#2dabb1] text-white rounded'>Send Message</button>
                    <a href="/profile" className='hover:text-[#2dabb1] hover:underline'>View Profile</a>
                  </div>
                )}
                {/* handle dots clicked */}
              </div>
              <div>
                <h1 className='font-bold mt-2'>{post.title}</h1>
                <p className='mt-2 text-[13px]'>{post.description}</p>
                <div className='mt-3'>
                  {post.content}
                </div>
              </div>
              <div className='flex w-full justify-between items-center mt-4'>
                <div className='flex gap-3 items-center '>
                  <button className=" text-gray-600 hover:text-black font-semibold flex items-center gap-2"><SlLike />Like</button>
                  <button className=" text-gray-600 hover:text-black font-semibold flex items-center gap-2" onClick={handleButtonClick}><GoComment />Comment</button>
                </div>
                <button className='flex text-gray-600 hover:text-black items-center gap-2' onClick={handleButtonClick}><span>454</span>comments</button>
              </div>
              <div className='mt-1 mb-3 border-b-2'>
                {selectedTab && (
                  <div><Comments /></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashLayout>

  )
}

export default Jobs_Updates