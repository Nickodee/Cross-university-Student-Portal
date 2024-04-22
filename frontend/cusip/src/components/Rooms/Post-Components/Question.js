import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {createNewQuestion} from '../../../features/questions/questionSlice'

function Question() {
  const [isAnonymousClicked, setIsAnonymousClicked] = useState(false)
  const [questionData, setQuestionData] = useState(
    {
      title:'',
      description:'',
      question_text:'',
    }
  )

  const dispatch =  useDispatch()

  const {title, description, question_text} = questionData

  const {questions} = useSelector((state) => state.questions)
  console.log(questions)

  const onChange = (e) => {
    setQuestionData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onQuestionPost = (e) => {
    e.preventDefault();

    const questionData = {
      title,
      description,
      question_text,
    }
    dispatch(createNewQuestion(questionData))

    setQuestionData({
      title: '',
      description: '',
      question_text: '',
    });
  }


  const handleAnonymousclicked = () => {
    setIsAnonymousClicked(!isAnonymousClicked)
  }
  return (
    <div className='w-full '>
      <form className='flex flex-col' onSubmit={onQuestionPost}>
        <div>
          <input placeholder='Question Title' type='text' onChange={onChange} value={title} name='title' id='title' className='p-2 w-full outline-none border-b-2' />
          <input placeholder='Question Description' onChange={onChange} value={description} id='description' name='description' type='text' className='p-2 w-full outline-none border-b-2' />
          <div className='mt-2 h-full flex flex-col gap-1'>
            <label className='font-bold text-[#2dabb1] text-xl ml-2'>Write your Question</label>
            <textarea placeholder='Your question goes here' onChange={onChange} value={question_text} name='question_text' id='question_text' className='p-2 w-full outline-none border-b-2'></textarea>
          </div>
        </div>

        <div className='flex justify-between mx-3 mt-4'>
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
          <button type='submit' className='py-1 px-2 rounded-full text-white bg-[#2dabb1]'>Post to Everyone</button>
        </div>
      </form>
    </div>
  )
}

export default Question