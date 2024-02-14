import { useState } from 'react'
import DashLayout from './Dashboard/DashLayout'
import { RiArrowDropDownLine } from "react-icons/ri";
import All from './NotificationsTab/All';
import Unread from './NotificationsTab/Unread';
import Mentions from './NotificationsTab/Mentions';
import Replies from './NotificationsTab/Replies';
import Calendar from './NotificationsTab/Calendar';
import Likes from './NotificationsTab/Likes';


function Notifications() {
    const [notifications, setNotifications] = useState('All')
    const handleSelectedNotificatioTab = (tab) => {
        setNotifications(tab);
    };

    return (
        <DashLayout>
            <div>
                <div>
                    <div className='flex p-2 items-center justify-between mx-4'>
                    <ul className='flex ml-3 gap-2 cursor-pointer justify-start'>
                        <li
                            className={`hover:underline ${notifications === 'All' ? 'font-bold text-[#2dabb1] underline ' : ''}`}
                            onClick={() => handleSelectedNotificatioTab('All')}
                        >
                            All
                        </li>
                        <li
                            className={`hover:underline ${notifications === 'Unread' ? 'font-bold text-[#2dabb1] underline' : ''}`}
                            onClick={() => handleSelectedNotificatioTab('Unread')}
                        >
                            Unread
                        </li>
                        <li
                            className={`hover:underline ${notifications === 'Mentions' ? 'font-bold text-[#2dabb1] underline' : ''}`}
                            onClick={() => handleSelectedNotificatioTab('Mentions')}
                        >
                            Mentions
                        </li>
                        <li
                            className={`hover:underline ${notifications === 'Calender' ? 'font-bold text-[#2dabb1] underline' : ''}`}
                            onClick={() => handleSelectedNotificatioTab('Calender')}
                        >
                            Calender
                        </li>
                        <li
                            className={`hover:underline ${notifications === 'Likes' ? 'font-bold text-[#2dabb1] underline' : ''}`}
                            onClick={() => handleSelectedNotificatioTab('Likes')}
                        >
                            Likes
                        </li>
                        <li
                            className={`hover:underline ${notifications === 'Replies' ? 'font-bold text-[#2dabb1] underline' : ''}`}
                            onClick={() => handleSelectedNotificatioTab('Replies')}
                        >
                            Replies
                        </li>
                    </ul>
                    <div className='p-1 cursor-pointer rounded-md border-2 items-center flex gap-2'>Sort by Room <RiArrowDropDownLine size={24}/></div>
                    </div>
                    <div className='w-full overflow-y-scroll h-full p-1'>
                        {notifications === 'All' && <div>{<All/>}</div>}
                        {notifications === 'Unread' && <div>{<Unread/>}</div>}
                        {notifications === 'Mentions' && <div>{<Mentions/>}</div>}
                        {notifications === 'Replies' && <div>{<Replies/>}</div>}
                        {notifications === 'Calender' && <div>{<Calendar/>}</div>}
                        {notifications === 'Likes' && <div>{<Likes/>}</div>}
                    </div>
                </div>
            </div>
        </DashLayout>
    )
}

export default Notifications