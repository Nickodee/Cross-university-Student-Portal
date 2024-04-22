import { useState, useRef, useEffect } from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useDispatch} from 'react-redux'
import { CiSearch } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlinePersonAddAlt, MdKeyboardArrowDown, MdOutlineClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Question from "../Post-Components/Question"
import Note from '../Post-Components/Note';
import Poll from "../Post-Components/Poll"
import questionService from '../../../features/questions/questionService';
import { AiFillLike } from "react-icons/ai";
import { LuMessageCircle } from "react-icons/lu";
import {createNewResponse} from '../../../features/questions/questionSlice'
import { IoMdPerson } from "react-icons/io";



function ChatRoom() {
    const [isDotsClicked, setIsDotsClicked] = useState(false)
    const messageRef = useRef(null);
    const [isNewPostClicked, setIsNewPostClicked] = useState(false)
    const [selectedDropdown, setSelectedDropdown] = useState(false)
    const [selectedDropdownTab, setSelectedDropdownTab] = useState('Note')
    const [showSelectedQuestion, setShowSelectedQuestion] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questions, setQuestions] = useState([])
    const [questionComment, setQuestionComment] = useState('comments')
    const [responses, setResponses] =  useState([])


    const [responseData, setResponseData] =  useState({
        content:''
    })

    const {content} = responseData

    const dispatch = useDispatch()

    const onChange = (e) => {
        setResponseData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

      const onResponsePost = (e) => {
        e.preventDefault();
    
        const responseData = {
          content
        }
        dispatch(createNewResponse(responseData))
    
        setResponseData({
          content: '',
        });
      }

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await questionService.retrieveQuestions();
                setQuestions(response);
            } catch (error) {
                console.error('Failed to fetch question:', error.message);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const response = await questionService.retrieveResponses();
                setResponses(response);
            } catch (error) {
                console.error('Failed to fetch responses:', error.message);
            }
        };

        fetchResponses();
    }, []);
    console.log('resp', responses)

    const handleQuestionCommentClicked = (tab) => {
        setQuestionComment(tab);
    };


    const handleSelectedDropdown = () => {
        setSelectedDropdown(!selectedDropdown);
    };

    const handleDropdownClicked = (tab) => {
        setSelectedDropdownTab(tab)
    }

    const handleDotsClicked = () => {
        setIsDotsClicked(!isDotsClicked)
    }

    const handleNewPost = () => {
        setIsNewPostClicked(!isNewPostClicked)
    }

    const handleClosePost = () => {
        setIsNewPostClicked(!isNewPostClicked)
    }

    const handleQuestionClicked = (question) => { // Accept the selected question as a parameter
        setSelectedQuestion(question); // Set the selected question to state
        setShowSelectedQuestion(true); // Show the selected question details
    };


    return (
        <main className='flex md:flex-row flex-col'>
            <div className='flex h-full flex-col gap-3 border-b-2 md:border-b-0 md:border-r-2 border-gray-300 pr-3 w-full'>
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
                    <div className='p-2 border border-gray-300 cursor-pointer rounded-full'><CiSearch /></div>
                    <div className='px-2  py-1 rounded-full cursor-pointer text-white bg-[#2dabb1]' onClick={handleNewPost}>+ New Post</div>
                </div>
                {/* handle the post */}
                {isNewPostClicked && (
                    <div className='fixed justify-start gap-3 flex flex-col z-10 right-3 md:top-[53px] border top-24 h-full bg-white  rounded w-full md:w-[600px]'>
                        <div className='flex items-center justify-between border-b-4 relative border-gray-200 p-2'>
                            <div className='flex gap-3 items-center'>
                                New
                                <div className='relative w-[100px] cursor-pointer items-center justify-between flex py-1 px-2 border rounded-full' onClick={handleSelectedDropdown}>
                                    <span>{selectedDropdownTab}</span>
                                    <MdKeyboardArrowDown />
                                    {selectedDropdown && (
                                        <div className='absolute items-start gap-1 flex flex-col w-[200px] border top-10 bg-white p-2 rounded shadow-lg'>
                                            <button className='hover:bg-gray-100 p-1 flex w-full items-start justify-start' onClick={() => handleDropdownClicked('Question')}><span>Question</span></button>
                                            <button className='hover:bg-gray-100 p-1 flex w-full items-start justify-start' onClick={() => handleDropdownClicked('Poll')}><span>Poll</span></button>
                                            <button className='hover:bg-gray-100 p-1 flex w-full items-start justify-start' onClick={() => handleDropdownClicked('Note')}><span>Note</span></button>
                                        </div>
                                    )}
                                </div>
                                in
                                <span>SCIT</span>
                            </div>
                            <MdOutlineClose className='text-[24px] cursor-pointer' onClick={handleClosePost} />
                        </div>
                        <div>
                            {selectedDropdownTab === 'Note' && <div>{<Note />}</div>}
                            {selectedDropdownTab === 'Question' && <div>{<Question />}</div>}
                            {selectedDropdownTab === 'Poll' && <div>{<Poll />}</div>}
                        </div>
                    </div>
                )}
                {/* handle the post */}
                <div className='overflow-y-scroll flex flex-col gap-3'>
                    {questions && questions.map((question) => (
                        <div className='cursor-pointer bg-gray-200 p-1 rounded' onClick={() => handleQuestionClicked(question)}>
                            <span className='text-[#2dabb1] font-bold'>{question.first_name}</span> Asked a Question:<p>{question.title}</p>
                        </div>))}
                </div>
            </div>
            <div className='w-full'>
                {showSelectedQuestion && selectedQuestion && (
                    <div>
                        <div className='font-bold text-xl ml-2'>{selectedQuestion.title}</div>
                        <div className='ml-2 mt-4'>{selectedQuestion.description}</div>
                        <div className='mt-3 ml-2'>{selectedQuestion.question_text}</div>
                        <div className='flex justify-between items-center w-full'>
                            <div className='flex ml-2 gap-4 mt-3 text-xl'><AiFillLike className='cursor-pointer' /> <LuMessageCircle className='cursor-pointer' onClick={() => handleQuestionCommentClicked('comments')} /></div>
                            <button className='p-2 bg-[#2dabb1] text-white rounded-full' onClick={() => handleQuestionCommentClicked('question')}>Answer this Question</button>
                        </div>
                        <div className='mt-3 ml-2'>
                            <div className=' flex gap-3 items-center'>
                                <div className={`hover:underline cursor-pointer ${questionComment === 'comments' ? 'font-bold text-[#2dabb1] underline' : ''}`} onClick={() => handleQuestionCommentClicked('comments')}>Comments</div>
                                <div className={`hover:underline cursor-pointer ${questionComment === 'question' ? 'font-bold text-[#2dabb1] underline' : ''}`} onClick={() => handleQuestionCommentClicked('question')}>Answer</div>
                            </div>
                            <div className='h-full w-full mt-3'>
                                {questionComment === 'comments' && <div>Comments</div>}
                                {questionComment === 'question' && <div >
                                    <div>
                                        {responses && responses.map((response) => (
                                            <div>
                                                <div className='text-[#2dabb1] flex gap-2 items-center'>
                                                    <div className='border-2 rounded-full'><IoMdPerson/></div>
                                                    {response.first_name} {response.last_name}
                                                </div>
                                            <div>{response.content}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <form onClick={onResponsePost}>
                                        <textarea placeholder='Write your Answer' className='w-full p-1 rounded outline-[#2dabb1]' onChange={onChange} id='content' value={content} name='content'></textarea>
                                        <button type='submit' className='text-white p-2 bg-[#2dabb1] rounded-full'>Post Answer</button>
                                    </form>
                                </div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default ChatRoom
