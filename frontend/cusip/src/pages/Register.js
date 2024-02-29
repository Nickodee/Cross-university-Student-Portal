import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
 

export default function Register() {
  const  [formData, setFormData] = useState({
    first_name: '',
    last_name:'',
    email: '',
    password: '',
    registration_number: '',
    gender:''
  });
  
  const {first_name, last_name, email, password, registration_number, gender} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    if(isSuccess) {
      navigate('/pages/login')
      toast.success('successfully  registered!')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      first_name,
      last_name,
      password,
      email,
      registration_number,
      gender,
    }
    dispatch(register(userData))
  }
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
        <form onSubmit={onSubmit}>
          <div className='flex sm:flex-row flex-col gap-2'>
            <div className='flex flex-col w-full'>
              <label>First Name</label>
              <input type="text" id='first_name' onChange={onChange} value={first_name} name="first_name" className='p-2 mt-1 border outline-[#2dabb1]' />
            </div>
            <div className='flex flex-col w-full'>
              <label>Last Name</label>
              <input type="text" id='last_name' value={last_name} onChange={onChange} name="last_name" className='p-2 mt-1 border outline-[#2dabb1]' />
            </div>
          </div>
          <div className='flex flex-col gap-1 mt-2'>
            <label>Email Address</label>
            <input className='outline-[#2dabb1] p-2 rounded border' onChange={onChange} value={email} id='email' type='email' name='email' placeholder='eg. cusip@gmail.com' />
          </div>
          <div className='flex flex-col gap-1 mt-2'>
            <label>Password</label>
            <input className='outline-[#2dabb1] p-2 rounded border' onChange={onChange} id='password' value={password} type='password' name='password'/>
          </div>
          <div className='mt-2 flex flex-col'>
            <label>Gender</label>
            <select 
              className="p-2 mt-1 w-full border outline-none rounded"
                name="gender"
                value={gender}
                onChange={onChange}
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
            <input className='border p-2 rounded outline-[#2dabb1]' onChange={onChange} id='registration_number' value={registration_number} type='text' placeholder='eg. scg202-0289/2025' name='registration_number'/>
          </div>
          <button type='submit' className='text-white font-bold items-center w-full bg-[#2dabb1] rounded mt-3 p-1'>Register</button>
        </form>
      </div>
      </div>
    </div>
  )
}
