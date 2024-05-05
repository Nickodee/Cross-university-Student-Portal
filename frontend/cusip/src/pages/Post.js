import React,{useState} from 'react'
import {createNewJobPost} from '../features/postJob/postJobSlice'
import {useDispatch} from 'react-redux'

function Post() {
  const [postJobData, setPostJobData] =  useState({
    name: '',
    company: '',
    jobType:'',
    description: '',
  })
  const dispatch = useDispatch()

  const{name, company, jobType, description} = postJobData

  const onChange = (e) => {
    setPostJobData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onJobPost = (e) => {
    e.preventDefault();

    const postJobData = {
      name,
      company,
      jobType,
      description,
    }
    dispatch(createNewJobPost(postJobData))

    setPostJobData({
      name: '',
      company: '',
      jobType: '',
      description: '',
    });
  }

  return (
    <div className='items-center flex flex-col justify-center text-center'>
      <h1 className='text-xl text-center text-[#2dabb1] mt-4'>Do have a Job, Internship or Attachment Opportunity?</h1>
      <p>Fill in the form below</p>
      <form className='flex flex-col gap-2 items-start w-[500px] p-3 border rounded bg-white' onClick={onJobPost}>
        <div className='flex flex-col w-full items-start'>
          <label>Name</label>
          <input placeholder='Enter your name' name='name' onChange={onChange} value={name} id='name' className='w-full border p-2 outline-[#2dabb1]'/>
        </div>
        <div className='flex flex-col w-full items-start'>
          <label>Company</label>
          <input placeholder='Enter your Company' value={company} onChange={onChange} name='company' id='company' className='w-full border p-2 outline-[#2dabb1]'/>
        </div>
        <div className='flex flex-col w-full items-start'>
          <label>Job Type</label>
          <input placeholder='eg. Full time/Internship/Attachment' onChange={onChange} id='jobType' name='jobType' value={jobType} className='w-full border p-2 outline-[#2dabb1]'/>
        </div>
        <div className='flex flex-col w-full items-start'>
          <label>Job Description</label>
          <textarea className='border outline-[#2dabb1] w-full p-2 h-[300px]' id='description' name='description' value={description} onChange={onChange} placeholder='Enter the Job description'></textarea>
        </div>
        <button type='submit' className='text-white bg-[#2dabb1] w-full p-2 text-xl font-bold'>Submit</button>
      </form>
    </div>
  )
}

export default Post