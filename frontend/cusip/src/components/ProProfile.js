import { useState, useEffect } from 'react'
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
import { SlCalender } from "react-icons/sl";
import { MdOutlineMail } from "react-icons/md";
import authService from '../features/auth2/authService';
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../features/auth2/authSlice';



function ProProfile() {
  // Functions to open modals to update the user profile start here
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false)
  const [isExperienceOpen, setIsExperienceOpen] = useState(false)
  const [isLanguagesOpen, setIsLanguagesOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false)

  //user data
  const [userData, setUserData] = useState(null)

  const [updateFormData, setUpdateFormData] = useState({
    bio: '',
    first_name: '',
    last_name:'',
    email: '',
    title: '',
    course: '',
    profile_picture:'',
    linkedin_profile:'',
    region:'',
    year_of_study: '',
    cv: '',
    username: ''
  })
  const dispatch = useDispatch()
  const { bio,first_name,last_name,email,title,course,profile_picture,linkedin_profile,region,year_of_study,cv,username } = updateFormData


  const onChange = (e) => {
    setUpdateFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onUpdateSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      bio
    }
    dispatch(updateUser(updateData))

     // Close the bio modal
    setIsBioOpen(false);

    // Clear the bio input field
    setUpdateFormData((prevState) => ({
      ...prevState,
      bio: '',
    }));
     // Update the userData state with the new bio value
  setUserData((prevUserData) => ({
    ...prevUserData,
    bio: bio
  }));
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authService.getAuthUser();
        setUserData(response);
      } catch (error) {
        console.error('Failed to fetch user data:', error.message);
        // Handle the error appropriately, e.g., display an error message to the user
      }
    };

    fetchUserData();
  }, []);

  //open the bio modal
  const toggleBioModal = () => {
    setIsBioOpen(!isBioOpen);
  };
  const toggleUserModal = () => {
    setIsUserOpen(!isUserOpen)
  }

  //open education modal
  const toggleEducationModal = () => {
    setIsEducationOpen(!isEducationOpen)
  }

  //open Experience modal
  const toggleExperienceModal = () => {
    setIsExperienceOpen(!isExperienceOpen)
  }

  //open Languages modal
  const toggleLanguageModal = () => {
    setIsLanguagesOpen(!isLanguagesOpen)
  }

  //open Portfolio modal
  const togglePortfolioModal = () => {
    setIsPortfolioOpen(!isPortfolioOpen)
  }

  //open Languages modal
  const toggleVideoModal = () => {
    setIsAddVideoOpen(!isAddVideoOpen)
  }
  // Functions to open modals to update the user profile end here
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
              {userData ? (<>
                <div className='flex w-full justify-between items-center font-bold text-xl'>{userData.first_name + " " + userData.last_name} <FaPen onClick={toggleUserModal} className='cursor-pointer' /></div>
                <div>
                  <div className='flex gap-2 items-center'><SlLocationPin />Nairobi,Kenya</div>
                  <div className='flex gap-2 items-center'><MdLocalPhone />+25467676272</div>
                  <div className='text-[#2dabb1]'>Graphic Designer</div>
                  <div className='flex gap-2 items-center'><MdOutlineMail />{userData.email}</div>
                  <div className='flex gap-2 items-center'><CiLinkedin /><span>nicodemusmuholo/linkedin/co/ke</span><GoCopy /></div>
                </div>
              </>
              ) : (<p>Failed to</p>)}
            </div>
          </div>
          {/* Code to open the user Modal */}
          {isUserOpen && (
            <div className='fixed top-0 z-20 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
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
                    <div className='flex gap-3'>
                      <div>
                        <label>Email Address</label>
                        <input type='email' placeholder='Enter your Email Address' className='w-full border rounded p-1 outline-[#2dabb1]' />
                      </div>
                      <div>
                        <label>Phone Number</label>
                        <input type='text' placeholder='Enter your Phone Number' className='w-full border rounded p-1 outline-[#2dabb1]' />
                      </div>
                    </div>
                    <div>
                        <label>Linkedin profile</label>
                        <input type='text' placeholder='Enter your Linkedin profile' className='w-full border rounded p-1 outline-[#2dabb1]' />
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
            {userData ? (
              <div>{userData.bio}</div>) : ('')}
          </div>
          {/* Code to open the Bio Modal */}
          {isBioOpen && (
            <div className='fixed top-0 z-20 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
              <div className='bg-white rounded-lg p-4 max-w-[450px]'>
                <div className='flex font-bold justify-between items-center'>
                  Edit About
                  <button className='cursor-pointer hover:bg-gray-100 p-2 rounded' onClick={toggleBioModal}>
                    <IoMdClose size={24} />
                  </button>
                </div>
                <div>
                  <p>Let everyone know you a little bit better, share your experience and goals writing a quick story about yourself</p>
                  <form className='mt-4' onSubmit={onUpdateSubmit}>
                    <textarea placeholder='Give us your bio...' onChange={onChange} name='bio' value={bio} id='bio' className=' h-[200px] p-2 outline-[#2dabb1] w-full border rounded' />
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
            <div className='flex justify-between font-bold'>Education <span className='flex cursor-pointer font-medium items-center gap-2 text-[16px]'>Add <CiCirclePlus onClick={toggleEducationModal} /></span></div>
            <div>Education goes here..</div>
          </div>
          {/* Code for Education Modal */}
          {isEducationOpen && (
            <div className='fixed top-0 z-20 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
              <div className='bg-white rounded-lg p-4 max-w-[450px]'>
                <div className='flex font-bold justify-between items-center'>
                  Edit Education Details
                  <button className='cursor-pointer hover:bg-gray-100 p-2 rounded' onClick={toggleEducationModal}>
                    <IoMdClose size={24} />
                  </button>
                </div>
                <div>
                  <form className='mt-2 flex flex-col gap-2'>
                    <div>
                      <label>University, School or Organization</label>
                      <input type='text' placeholder='Enter your School' className='w-full border rounded p-1 outline-[#2dabb1]' />
                    </div>
                    <div>
                      <label>Country</label>
                      <input type='text' placeholder='Enter your Country' className='w-full border p-1 rounded outline-[#2dabb1]' />
                    </div>
                    <div>
                      <label>City</label>
                      <input type='text' placeholder='Enter your School' className='w-full border p-1 rounded outline-[#2dabb1]' />
                    </div>
                    <div className='flex justify-center w-full items-center gap-2'>
                      <div >
                        <label>Field of Study</label>
                        <input type='text' placeholder='Enter your Country' className='w-full border rounded p-1 outline-[#2dabb1]' />
                      </div>
                      <div >
                        <label>Level of Education</label>
                        <input type='text' placeholder='Enter your level of Education' className='w-full rounded border p-1 outline-[#2dabb1]' />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label>Start date</label>
                        <div>
                          <input type='text' placeholder='Enter Month' />
                          <SlCalender />
                        </div>
                      </div>
                    </div>
                    <div className='flex w-full justify-between gap-3 px-3'>
                      <button onClick={toggleEducationModal} className='border rounded-full w-full hover:bg-[#2dabb1] hover:text-white p-2'>Cancel</button>
                      <button type='submit' className='border bg-[#2dabb1] rounded-full w-full hover:shadow-md text-white p-2'>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div className='w-full bg-white rounded mt-3 p-3'>
            <div className='flex justify-between font-bold'>Experience <span className='flex cursor-pointer font-medium items-center gap-2 text-[16px]'>Add <CiCirclePlus onClick={toggleExperienceModal} /></span></div>
            <div>Experience goes here...</div>
          </div>
          {/* Code for Experience modal */}
          {isExperienceOpen && (
            <div className='fixed top-0 z-20 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
              <div className='bg-white rounded-lg p-4 max-w-[450px]'>
                <div className='flex font-bold justify-between items-center'>
                  Edit Experience
                  <button className='cursor-pointer hover:bg-gray-100 p-2 rounded' onClick={toggleExperienceModal}>
                    <IoMdClose size={24} />
                  </button>
                </div>
                <div>
                  <form className='mt-4'>
                    <input type='text' placeholder='work experience' />
                    <div className='flex w-full justify-between gap-3 px-3'>
                      <button onClick={toggleExperienceModal} className='border rounded-full w-full hover:bg-[#2dabb1] hover:text-white p-2'>Cancel</button>
                      <button type='submit' className='border bg-[#2dabb1] rounded-full w-full hover:shadow-md text-white p-2'>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-col w-full sm:mr-7 gap-2'>
          <div className='flex justify-between bg-white p-2 shadow-md items-center rounded'>Languages <FaPen className='cursor-pointer' onClick={toggleLanguageModal} /></div>
          {/* Language Modal here */}
          {isLanguagesOpen && (
            <div className='fixed top-0 z-20 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
              <div className='bg-white rounded-lg p-4 max-w-[450px]'>
                <div className='flex font-bold justify-between items-center'>
                  Edit Language
                  <button className='cursor-pointer hover:bg-gray-100 p-2 rounded' onClick={toggleLanguageModal}>
                    <IoMdClose size={24} />
                  </button>
                </div>
                <div>
                  <form className='mt-4'>
                    <div>English</div>
                    <div className='flex w-full justify-between gap-3 px-3'>
                      <button onClick={toggleLanguageModal} className='border rounded-full w-full hover:bg-[#2dabb1] hover:text-white p-2'>Cancel</button>
                      <button type='submit' className='border bg-[#2dabb1] rounded-full w-full hover:shadow-md text-white p-2'>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div className='flex flex-col justify-between bg-white p-2 shadow-md items-center rounded'>Your CV <div className='p-2 hover:text-blue-400 border-dotted border-2 bg-gray-200 flex flex-col gap-3 justify-center items-center'><IoCloudUploadOutline /><p><span><Link to='#' className='text-blue-300'>Click here to upload</Link></span> or drag and drop DOC, PDF, JPEG or PNG</p></div></div>
          <div className='flex flex-col gap-2 justify-between bg-white p-2 shadow-md items-center rounded'>Introduce yourself to clients with a pitch
            <button onClick={toggleVideoModal} className='bg-[#2dabb1] cursor-pointer p-2 rounded-lg flex items-center gap-2 text-white'><FaVideo /><span>+ Add link to your video</span></button>
          </div>
          {/* Video Modal open */}
          {isAddVideoOpen && (
            <div className='fixed top-0 z-20 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
              <div className='bg-white rounded-lg p-4 max-w-[450px]'>
                <div className='flex font-bold justify-between items-center'>
                  Update a Video Link
                  <button className='cursor-pointer hover:bg-gray-100 p-2 rounded' onClick={toggleVideoModal}>
                    <IoMdClose size={24} />
                  </button>
                </div>
                <div>
                  <form className='mt-4'>
                    <div className='gap-3 flex flex-col'>
                      <h1 className=''>Upload a video you google drive/ youtube/ vimeo / Loom and share the link</h1>
                      <div className='flex-col flex gap-2 mb-3'>
                        <label>My pitch video</label>
                        <input type='text' className='border p-1 rounded border-black outline-none' />
                      </div>
                    </div>
                    <div className='flex w-full justify-between gap-3 px-3'>
                      <button onClick={toggleVideoModal} className='border rounded-full w-full hover:bg-[#2dabb1] hover:text-white p-2'>Cancel</button>
                      <button type='submit' className='border bg-[#2dabb1] rounded-full w-full hover:shadow-md text-white p-2'>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div className='flex justify-between bg-white p-2 shadow-md items-center rounded'>Your Portfolio Web Link <FaPen className='cursor-pointer' onClick={togglePortfolioModal} /></div>
          {/* Your Portfolio Web modal */}
          {
            isPortfolioOpen && (
              <div className='fixed top-0 z-20 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
                <div className='bg-white rounded-lg p-4 max-w-[450px]'>
                  <div className='flex font-bold justify-between items-center'>
                    Your Portfolio Web
                    <button className='cursor-pointer hover:bg-gray-100 p-2 rounded' onClick={togglePortfolioModal}>
                      <IoMdClose size={24} />
                    </button>
                  </div>
                  <div>
                    <form className='mt-4'>
                      <div>Portfolio</div>
                      <div className='flex w-full justify-between gap-3 px-3'>
                        <button onClick={togglePortfolioModal} className='border rounded-full w-full hover:bg-[#2dabb1] hover:text-white p-2'>Cancel</button>
                        <button type='submit' className='border bg-[#2dabb1] rounded-full w-full hover:shadow-md text-white p-2'>Save</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </DashLayout>
  )
}

export default ProProfile