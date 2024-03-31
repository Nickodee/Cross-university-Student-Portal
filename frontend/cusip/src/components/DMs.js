import { useState, useEffect } from 'react'
import DashLayout from './Dashboard/DashLayout'
import { FaPlus } from "react-icons/fa6";
import { MdOutlineEmojiEmotions, MdAddLink, MdGifBox } from "react-icons/md";
import { CiImageOn, CiLink } from "react-icons/ci";
import { GoPaperclip } from "react-icons/go";
import { AiOutlineAudio } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import authService from '../features/auth2/authService';


function DMs() {
  const [selectedTab, setSelectedTab] = useState('About');
  const [showTextUser, setShowTextUser] = useState('Details')
  const [message, setMessage] = useState('');

  const handleMessageSend = () => {
    const messageInput = document.getElementById('messageInput');
    const newMessage = messageInput.value.trim();
    if (newMessage !== '') {
      setMessage(newMessage);
      messageInput.value = '';
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleShowText = (textTab) => {
    setShowTextUser(textTab)
  }


  const [query, setQuery] = useState('');
  const [membersDetails, setMembersDetails] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);


  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await authService.getAllUsers();
        setMembersDetails(response);
        setFilteredMembers(response); // Initialize filtered members with all members
        console.log('members', response);
      } catch (error) {
        console.error('Failed to fetch members:', error.message);
      }
    };

    fetchMembers();
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    // Filter members based on the input value
    const filtered = membersDetails.filter(member =>
      member.first_name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  const handleUserSelect = (user) => {
    // Check if the selected user is already in the selectedMemberIds
    if (!selectedMemberIds.includes(user.id)) {
      setSelectedMemberIds(prevIds => [...prevIds, user.id]);
      setQuery('');
      setFilteredMembers([]); // Clear filtered members
    }
  };

  const handleRemoveSelectedMember = (id) => {
    setSelectedMemberIds(prevIds => prevIds.filter(memberId => memberId !== id));
  };

  return (
    <DashLayout>
      <div>
        <div className=' rounded-md md:gap-0 gap-2 flex md:flex-row flex-col justify-between my-2 w-full bg-white shadow-lg max-h-screen '>
          <div className=' md:border-b-0 border-b-2 md:w-[400px] w-full border-r-0 md:border-r-2 p-3'>
            <div className='flex justify-between border-b-2 p-1'>Direct Messages <FaPlus className='cursor-pointer' onClick={() => handleShowText('TextUser')} /></div>
            <div className='overflow-y-scroll flex flex-col gap-2  overflow-hidden pr-2'>
              <button className='hover:underline mt-2 hover:text-[#2dabb1]'>Inbox</button>
              <div className='flex cursor-pointer items-center gap-4 bg-slate-500 text-white p-2 rounded' onClick={() => handleShowText('Details')}>
                <div className='h-9 w-9 bg-[#2dabb1] rounded-md flex items-center justify-center'>NM</div>
                <div>
                  <h1 className='gap-3'>James <span className='text-slate-400'>2 Days ago</span></h1>
                  <p>Hi Text, I would to...</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex w-full'>
            {showTextUser === 'Details' && <div className='flex w-full'>{
              <>
                <div className='flex md:border-b-0  border-b-2 flex-col md:border-r-2 items-center w-full'>
                  <p className='font-bold text-center w-full border-b-2'>James Malimba</p>
                  <div className='overflow-hidden h-full overflow-y-scroll w-full px-2'>
                    I have seen you love programming I would...
                  </div>
                  <div className='w-full pb-1 flex flex-col gap-2'>
                    <input type="text" placeholder="Type a message..." className='outline-none border w-full text-wrap py-2 px-4 shadow-sm' />
                    <div className='flex items-center mx-2 gap-2'>
                      <MdOutlineEmojiEmotions className='cursor-pointer' />
                      <CiImageOn className='cursor-pointer' />
                      <MdAddLink className='cursor-pointer' size={20} />
                      <MdGifBox className='cursor-pointer' />
                      <GoPaperclip className='cursor-pointer' />
                      <AiOutlineAudio className='cursor-pointer' />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <p className='font-bold border-b-2 w-full'>Profile</p>
                  <div className='flex items-center w-full pl-3 gap-2 border-b-2 pb-2'>
                    <div className='w-9 h-9 rounded-md items-center justify-center flex bg-[#2dabb1] text-white'>JM</div>
                    <div className=' flex flex-col'><p className='font-bold'>James Malimba</p> <span className='text-[13px]'>Software Developer</span> <CiLink size={24} className='border rounded hover:bg-[#2dabb1] hover:text-white text-black' /></div>
                  </div>
                  <ul className='flex ml-3 gap-2 cursor-pointer justify-start'>
                    <li
                      className={`hover:underline ${selectedTab === 'About' ? 'font-bold text-[#2dabb1] underline ' : ''}`}
                      onClick={() => handleTabClick('About')}
                    >
                      About
                    </li>
                    <li
                      className={`hover:underline ${selectedTab === 'Posts' ? 'font-bold text-[#2dabb1] underline' : ''}`}
                      onClick={() => handleTabClick('Posts')}
                    >
                      Posts
                    </li>
                    <li
                      className={`hover:underline ${selectedTab === 'Comments' ? 'font-bold text-[#2dabb1] underline' : ''}`}
                      onClick={() => handleTabClick('Comments')}
                    >
                      Comments
                    </li>
                  </ul>
                  <div className='w-full overflow-y-scroll h-full p-1'>
                    {selectedTab === 'About' && <div>{<h1>About</h1>}</div>}
                    {selectedTab === 'Posts' && <div>{<h1>Posts</h1>}</div>}
                    {selectedTab === 'Comments' && <div>{<h1>Comments</h1>}</div>}
                  </div>
                </div>
              </>
            }</div>}
            {showTextUser === 'TextUser' &&
              <div className='w-full h-full overflow-hidden'>
                {
                  <div className='flex flex-col'>
                    <h1 className='ml-2'>New Message</h1>
                    <div className='p-2 border-b-2 border-t-2 flex items-center gap-2'>
                      To:
                      {selectedMemberIds.map(id => {
                        const selectedMember = membersDetails.find(member => member.id === id);
                        return (
                          <div key={id} className="flex gap-2 bg-gray-100 rounded items-center px-2">
                            <div className='flex gap-1 '>
                            <span>{selectedMember.first_name}</span> <span>{selectedMember.last_name}</span></div>
                            <button onClick={() => handleRemoveSelectedMember(id)} className='font-bold text-[24px]'>×</button>
                          </div>
                        );
                      })}
                      <input
                        type='text'
                        placeholder='Start typing name'
                        className='w-full outline-none'
                        value={query}
                        onChange={handleInputChange}
                      />
                    </div>
                    {query && (
                      <div className="bg-white z-10 shadow-md rounded overflow-y-scroll">
                        <ul className='cursor-pointer'>
                          {filteredMembers.map(member => (
                            <li key={member.id} onClick={() => handleUserSelect(member)}>
                              {member.first_name} {member.last_name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className='h-full w-full overflow-y-scroll overflow-hidden p-2'>
                      <p>{message}</p>
                    </div>
                    <div className='m-2 p-2 border rounded'>
                      <input type='text' id='messageInput' placeholder='Type a message' className='outline-none w-full' />
                      <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                          <MdOutlineEmojiEmotions className='cursor-pointer' />
                          <CiImageOn className='cursor-pointer' />
                          <MdAddLink size={20} className='cursor-pointer' />
                          <MdGifBox className='cursor-pointer' />
                          <GoPaperclip className='cursor-pointer' />
                          <AiOutlineAudio className='cursor-pointer' />
                        </div>
                        <FiSend className='cursor-pointer' onClick={handleMessageSend} />
                      </div>
                    </div>
                  </div>
                }
              </div>
            }

          </div>
        </div>
      </div>
    </DashLayout>
  )
}

export default DMs