import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { IoMdChatboxes,IoIosLogOut } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import { logout } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';





function AsideNav({ collapsed }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout());
        navigate('/pages/login')
      };
    return (
        <aside className={`py-2 md:flex hidden md:flex-col justify-between border-r-2 ${collapsed ? 'w-16 ' : 'w-44'} transition-all duration-300`}>
            <div>
                <Link className='justify-center flex p-2' to='/'>
                    CUSIP
                </Link>
                <hr className='mt-1' />
                <div className=' gap-2 mt-3 flex flex-col'>
                    <Link to='/dashboard/dashhome' className='flex py-2 hover:bg-slate-400 hover:text-white items-center px-2 gap-2' activeClassName='bg-blue-500 text-white'>
                        <MdOutlineDashboardCustomize />
                        {collapsed ? null : <span>Dashboard</span>}
                    </Link>
                    <Link to='/dashboard/room' className='py-2 hover:bg-slate-400 hover:text-white flex items-center px-2 gap-2'>
                        <IoMdChatboxes />
                        {collapsed ? null : <span >Chat Room</span>}
                    </Link>
                    <Link to='/dashboard/profile' className='py-2 hover:bg-slate-400 hover:text-white flex items-center px-2 gap-2'>
                        <ImProfile />
                        {collapsed ? null : <span>Pro Profile</span>}
                    </Link>
                    <Link to='/dashboard/job_updates' className='py-2 hover:bg-slate-400 hover:text-white flex items-center px-2 gap-2'>
                        <GrUpdate />
                        {collapsed ? null : <span>Jobs_Updates</span>}
                    </Link>
                </div>
            </div>
            <button onClick={handleLogout} className='py-2 cursor-pointer hover:bg-slate-400 hover:text-white px-2 items-center flex gap-2'>
                <IoIosLogOut/>
                {collapsed ? null : <span>Logout</span>}
            </button>
        </aside>
    );
}

export default AsideNav;
