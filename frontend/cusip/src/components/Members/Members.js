import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { FaLink } from 'react-icons/fa6';
import authService from '../../features/auth2/authService';
import { useSelector } from 'react-redux';

function Members() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [profileVisible, setProfileVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState('About');
    const [membersDetails, setMembersDetails] = useState(null);
    const [userData, setUserData] = useState(null)

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

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const toggleProfile = (member) => {
        setSelectedMember(member);
        setProfileVisible(!profileVisible);
    };

    //Fetch user from store
    const {user} = useSelector((state) => state.auth)

    return (
        <div>
            <div className="border-b-2 pb-5 flex gap-2 items-center">
                Members <span>({membersDetails ? membersDetails.length : 0})</span>
                <div className="border-2 border-gray-400 rounded-md w-full">
                    <input type="text" className="w-full p-1 outline-[#2dabb1]" placeholder="Search here..." />
                </div>
            </div>
            {membersDetails &&
                membersDetails.map((member) => (
                    <div className="mt-3" key={member.id}>
                        <div
                            className="flex cursor-pointer bg-white gap-2 hover:shadow-md hover:relative p-2 border rounded w-full"
                            onClick={() => toggleProfile(member)}
                        >
                            <div className="h-[50px] w-[50px] flex items-center justify-center rounded-md bg-[#2dabb1] font-bold text-[30px] text-white">
                                {member.first_name.charAt(0).toUpperCase()}
                                {member.last_name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-bold">
                                        {member.first_name} {member.last_name}
                                    </h1>
                                    <button className="border rounded p-1 absolute top-0 right-0 mt-4 mr-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        Message
                                    </button>
                                </div>
                                <span>Nairobi, Kenya</span>
                                <p>{member.bio}</p>
                            </div>
                        </div>
                        <div className={`profile-sidebar top-[35px] md:top-[53px] w-full md:w-[500px] ${profileVisible && selectedMember === member ? 'show' : ''}`} key={member.id}>
                            {/* Profile content */}
                            <div className="p-4">
                                <div className="flex justify-between items-center">
                                    Profile{' '}
                                    <IoClose
                                        onClick={() => toggleProfile(member)}
                                        className="cursor-pointer  hover:rounded hover:bg-gray-100"
                                    />
                                </div>
                                <div className="flex items-center gap-3 mt-5">
                                    <div className="bg-[#2dabb1] text-3xl font-bold justify-center flex items-center rounded-md h-[50px] w-[50px] text-white p-5">{member && member.profile_picture? (member.profile_picture): (member.first_name.charAt(0).toUpperCase() + member.last_name.charAt(0).toUpperCase())}</div>
                                    <div className="flex flex-col gap-2">
                                        {member.first_name} {member.last_name}
                                        {userData.id === member.id ? ('') : (
                                        <div className="flex gap-2 items-center">
                                            <button className=" rounded p-2 border-2 text-gray-600 flex gap-2 items-center">
                                                <BiMessageSquareDetail /> Message
                                            </button>
                                            <button className=" hover:bg-[#2dabb1] hover:border-0 hover:text-white border-black rounded-md p-2 border text-gray-600">
                                                <FaLink />
                                            </button>
                                        </div>)}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <ul className="flex items-center gap-3 cursor-pointer">
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
                                        <li
                                            className={`hover:underline ${selectedTab === 'Rooms' ? 'font-bold text-[#2dabb1] underline' : ''}`}
                                            onClick={() => handleTabClick('Rooms')}
                                        >
                                            Rooms
                                        </li>
                                    </ul>
                                    <div className="w-full overflow-y-scroll h-full p-1">
                                        {selectedTab === 'About' && <div>{<h1>About</h1>}</div>}
                                        {selectedTab === 'Posts' && <div>{<h1>Posts</h1>}</div>}
                                        {selectedTab === 'Comments' && <div>{<h1>Comments</h1>}</div>}
                                        {selectedTab === 'Rooms' && <div>{<h1>Rooms</h1>}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Members;
