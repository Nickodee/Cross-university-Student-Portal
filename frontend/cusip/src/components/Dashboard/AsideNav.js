import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { IoMdChatboxes, IoIosLogOut,IoIosNotifications } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import { logout } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { IoSettingsOutline } from "react-icons/io5";



function AsideNav({ collapsed }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout());
        navigate('/pages/login')
    };
    return (
        <aside className={`py-2 md:flex hidden md:flex-col justify-between border-r-2 ${collapsed ? 'w-16 ' : 'w-44 block'} transition-all duration-300`}>
            <div>
                <Link className='justify-center flex p-2' to='/'>
                    CUSIP
                </Link>
                <hr className='mt-1' />
                <div className=' gap-2 mt-3 flex flex-col'>
                    <NavLink to='/dashboard/dashhome' className={({ isActive }) =>
                            `flex py-2 items-center px-2 gap-2 cursor-pointer ${isActive ? 'bg-slate-400 text-white' : 'hover:bg-slate-400 hover:text-white'
                            }`
                        }>
                        <MdOutlineDashboardCustomize />
                        {collapsed ? null : <span>Dashboard</span>}
                    </NavLink>
                    <NavLink to='/dashboard/room' className={({ isActive }) =>
                        `flex py-2 items-center px-2 gap-2 cursor-pointer ${isActive ? 'bg-slate-400 text-white' : 'hover:bg-slate-400 hover:text-white'
                        }`
                    }>
                        <IoMdChatboxes />
                        {collapsed ? null : <span >DMs</span>}
                    </NavLink>
                    <NavLink
                        to='/dashboard/profile'
                        className={({ isActive }) =>
                            `flex py-2 items-center px-2 gap-2 cursor-pointer ${isActive ? 'bg-slate-400 text-white' : 'hover:bg-slate-400 hover:text-white'
                            }`
                        }
                    >
                        <ImProfile />
                        {collapsed ? null : <span>Pro Profile</span>}
                    </NavLink>
                    <NavLink to='/dashboard/job_updates' className={({ isActive }) =>
                            `flex py-2 items-center px-2 gap-2 cursor-pointer ${isActive ? 'bg-slate-400 text-white' : 'hover:bg-slate-400 hover:text-white'
                            }`
                        }>
                        <GrUpdate />
                        {collapsed ? null : <span>Jobs_Updates</span>}
                    </NavLink>
                    <NavLink to='/dashboard/notifications' className={({ isActive }) =>
                            `flex py-2 items-center px-2 gap-2 cursor-pointer ${isActive ? 'bg-slate-400 text-white' : 'hover:bg-slate-400 hover:text-white'
                            }`
                        }>
                        <IoIosNotifications />
                        {collapsed ? null : <span>Notifications</span>}
                    </NavLink>
                    <NavLink to='/dashboard/settings' className={({ isActive }) =>
                            `flex py-2 items-center px-2 gap-2 cursor-pointer ${isActive ? 'bg-slate-400 text-white' : 'hover:bg-slate-400 hover:text-white'
                            }`
                        }>
                        <IoSettingsOutline  />
                        {collapsed ? null : <span>Settings</span>}
                    </NavLink>
                </div>
            </div>
            <button onClick={handleLogout} className='py-2 cursor-pointer hover:bg-slate-400 hover:text-white px-2 items-center flex gap-2'>
                <IoIosLogOut />
                {collapsed ? null : <span>Logout</span>}
            </button>
        </aside>
    );
}

export default AsideNav;
