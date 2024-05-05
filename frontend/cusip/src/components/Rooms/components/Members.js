import React,{useState, useEffect} from 'react'
import Member from '../../../assets/member.jpg'
import { HiOutlineDotsVertical } from "react-icons/hi";
import authService from '../../../features/auth2/authService';

function Members() {
  const [membersDetails, setMembersDetails] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
        try {
            const response = await authService.getAllUsers();
            setMembersDetails(response);
            console.log('members', response);
        } catch (error) {
            console.error('Failed to fetch members:', error.message);
        }
    };

    fetchMembers();
}, []);
  return (
<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-1'>
  {membersDetails && membersDetails.map((member) => (
    <div className='flex flex-col items-center bg-white shadow-sm rounded' key={member.id}>
      <div className='h-32 rounded-lg w-full bg-white object-cover'>
        {member.profile_pic}
      </div>
      <div className='flex p-1 justify-between items-center w-full text-white bg-[#2dabb1]'>
        <h1>{member.first_name} {member.last_name}</h1>
        <HiOutlineDotsVertical className='cursor-pointer' />
      </div>
    </div>
  ))}
</div>

  )
}

export default Members