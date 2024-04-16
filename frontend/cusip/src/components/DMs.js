import { useState, useEffect } from 'react';
import DashLayout from './Dashboard/DashLayout';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineEmojiEmotions, MdAddLink, MdGifBox } from "react-icons/md";
import { CiImageOn, CiLink } from "react-icons/ci";
import { GoPaperclip } from "react-icons/go";
import { AiOutlineAudio } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import authService from '../features/auth2/authService';
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getUserMessages, sendMessage } from '../features/chats/chatSlice';

function DMs() {
  const [selectedTab, setSelectedTab] = useState('About');
  const [showTextUser, setShowTextUser] = useState('Details');
  const [message, setMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [sentMessages, setSentMessages] = useState([]);
  const [showCounters, setShowCounters] = useState({});
  const [query, setQuery] = useState('');
  const [membersDetails, setMembersDetails] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  const dispatch = useDispatch();
  const userFromStorage = localStorage.getItem('user');
  const user = JSON.parse(userFromStorage);
  const user_id = user.user_id;

  const getSenderName = (senderId) => {
    const sender = membersDetails.find(member => member.id === senderId);
    return sender ? `${sender.first_name} ${sender.last_name}` : 'Unknown Sender';
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleShowText = (textTab, message) => {
    setShowTextUser(textTab);
    setSelectedMessage(message);
  };


  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await authService.getAllUsers();
        setMembersDetails(response);
        setFilteredMembers(response);
      } catch (error) {
        console.error('Failed to fetch members:', error.message);
      }
    };
    fetchMembers();
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    const filtered = membersDetails.filter(member =>
      member.first_name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  const handleMessageSend = () => {
    if (!message) {
      console.error('Message is missing.');
      return;
    }
    const messageData = {
      sender: user_id,
      receiver: selectedMemberIds[0],
      content: message
    };
    dispatch(sendMessage(messageData));
    setSentMessages(prevMessages => [...prevMessages, messageData]);
    setMessage('');
  };

  const handleUserSelect = (user) => {
    if (!selectedMemberIds.includes(user.id)) {
      setSelectedMemberIds(prevIds => [...prevIds, user.id]);
      setQuery('');
      setFilteredMembers([]);
    }
  };

  const handleRemoveSelectedMember = (id) => {
    setSelectedMemberIds(prevIds => prevIds.filter(memberId => memberId !== id));
  };

  useEffect(() => {
    dispatch(getUserMessages());
  }, [dispatch]);

  const { messages, isSuccess } = useSelector(state => state.chat);

  const getSenderInitials = (senderId) => {
    const sender = membersDetails.find(member => member.id === senderId);
    return sender ? `${sender.first_name.charAt(0).toUpperCase()} ${sender.last_name.charAt(0).toUpperCase()}` : 'Unknown Sender';
  };

  return (
    <DashLayout>
      <div className='rounded-md md:gap-0 gap-2 flex md:flex-row flex-col justify-between my-2 w-full bg-white shadow-lg max-h-screen'>
        <div className='md:border-b-0 border-b-2 md:w-[400px] w-full border-r-0 md:border-r-2 p-3'>
          <div className='flex justify-between border-b-2 p-1'>Direct Messages <FaPlus className='cursor-pointer' onClick={() => setShowTextUser('TextUser')} /></div>
          <div className='overflow-y-scroll flex flex-col gap-2 overflow-hidden pr-2'>
            <button className='hover:underline mt-2 hover:text-[#2dabb1]'>Inbox</button>
            {isSuccess && messages && messages.messages && messages.messages.length > 0 && (
              Object.values(
                messages.messages.reduce((acc, message) => {
                  if (!acc[message.sender]) {
                    acc[message.sender] = [];
                  }
                  acc[message.sender].push(message);
                  return acc;
                }, {})
              ).map((messagesGroup, index) => {
                const senderId = messagesGroup[0].sender;
                const latestMessage = messagesGroup[messagesGroup.length - 1];
                const messageCounter = messagesGroup.length;
                return (
                  <div key={index} className='flex cursor-pointer items-center gap-4 bg-slate-500 text-white p-2 rounded' onClick={() => handleShowText('Details', messagesGroup[0])}>
                    <div className='h-9 w-9 bg-[#2dabb1] rounded-md flex items-center justify-center font-bold'>{getSenderInitials(senderId)}</div>
                    <div>
                      <h1>{getSenderName(senderId)}</h1>
                      <p>{latestMessage.content}</p>
                      {showTextUser !== 'Details' && showCounters[senderId] && (
                        <span>({messageCounter})</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className='flex w-full'>
          {showTextUser === 'Details' && (
            <>
              <div className='flex md:border-b-0  border-b-2 flex-col md:border-r-2 items-center w-full'>
                <p className='font-bold text-center w-full border-b-2'>{selectedMessage && getSenderName(selectedMessage.sender)}</p>
                <div className='overflow-hidden h-full overflow-y-scroll w-full px-2'>

                  <p>
                    {selectedMessage && selectedMessage.content && Array.isArray(selectedMessage.content) ? (
                      selectedMessage.content.map((message, index) => (
                        <span key={index}>
                          {message}<br />
                        </span>
                      ))
                    ) : (
                      selectedMessage && selectedMessage.content
                    )}
                  </p>



                </div>
                <div className='w-full pb-1 flex flex-col gap-2'>
                  <div className='flex items-center border'>
                    <input type="text" placeholder="Type a message..." className='outline-none w-full text-wrap py-2 px-2' />
                    <IoIosSend className='text-[24px] mr-1 cursor-pointer' />
                  </div>
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
                  <div className='w-9 h-9 rounded-md items-center justify-center flex bg-[#2dabb1] text-white'>{selectedMessage && getSenderInitials(selectedMessage.sender)}</div>
                  <div className='flex flex-col'>
                    <p className='font-bold'>{selectedMessage && getSenderName(selectedMessage.sender)}</p>
                    <span className='text-[13px]'>Software Developer</span>
                    <CiLink size={24} className='border rounded hover:bg-[#2dabb1] hover:text-white text-black' />
                  </div>
                </div>
                <ul className='flex ml-3 gap-2 cursor-pointer justify-start'>
                  <li className={`hover:underline ${selectedTab === 'About' ? 'font-bold text-[#2dabb1] underline ' : ''}`} onClick={() => handleTabClick('About')}>
                    About
                  </li>
                  <li className={`hover:underline ${selectedTab === 'Posts' ? 'font-bold text-[#2dabb1] underline' : ''}`} onClick={() => handleTabClick('Posts')}>
                    Posts
                  </li>
                  <li className={`hover:underline ${selectedTab === 'Comments' ? 'font-bold text-[#2dabb1] underline' : ''}`} onClick={() => handleTabClick('Comments')}>
                    Comments
                  </li>
                </ul>
                <div className='w-full overflow-y-scroll h-full p-1'>
                  {selectedTab === 'About' && <div><h1>About</h1></div>}
                  {selectedTab === 'Posts' && <div><h1>Posts</h1></div>}
                  {selectedTab === 'Comments' && <div><h1>Comments</h1></div>}
                </div>
              </div>
            </>
          )}
          {showTextUser === 'TextUser' && (
            <div className='w-full h-full overflow-hidden'>
              <div className='flex flex-col'>
                <h1 className='ml-2'>New Message</h1>
                <div className='p-2 border-b-2 border-t-2 flex items-center gap-2'>
                  To:
                  {selectedMemberIds.map(id => {
                    const selectedMember = membersDetails.find(member => member.id === id);
                    return (
                      <div key={id} className="flex gap-2 bg-gray-100 rounded items-center px-2">
                        <div className='flex gap-1 '>
                          <span>{selectedMember.first_name}</span> <span>{selectedMember.last_name}</span>
                        </div>
                        <button onClick={() => handleRemoveSelectedMember(id)} className='font-bold text-[24px]'>×</button>
                      </div>
                    );
                  })}
                  <input type='text' placeholder='Start typing name' className='w-full outline-none' value={query} onChange={handleInputChange} />
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
                  {sentMessages && sentMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === user_id ? 'justify-start' : 'justify-end'}`}>
                      <p className={`bg-gray-200 rounded-md p-2 ${msg.sender === user_id ? 'mr-auto' : 'ml-auto'}`}>{msg.content}</p>
                    </div>
                  ))}
                </div>
                <div className='m-2 p-2 border rounded'>
                  <input type='text' id='messageInput' placeholder='Type a message' value={message} onChange={(e) => setMessage(e.target.value)} className='outline-none w-full' />
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
            </div>
          )}
        </div>
      </div>
    </DashLayout>
  );
}

export default DMs;
