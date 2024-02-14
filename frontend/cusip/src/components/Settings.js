import { useState } from 'react'
import DashLayout from './Dashboard/DashLayout'
import { FaCircleExclamation,FaPeopleGroup } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { GiStarsStack } from "react-icons/gi";
import RoomDetails from './Settings/RoomDetails';
import RoomMembers from './Settings/RoomMembers';
import InvitePeople from './Settings/InvitePeople';
import FeaturePreference from './Settings/FeaturePreference';


function Settings() {
  const [settings, setSettings] = useState('RoomDetails')
  const handleSelectedSettingTab = (tab) => {
    setSettings(tab);
  };
  return (
    <DashLayout>
      <div className='flex'>
        <div className='w-2/5 border-r-2'>
          <div className='border-b-2 p-2'>
            <h1 className='font-bold'>Settings</h1>
            <span className='text-[12px]'>ROOM</span>
          </div>
          <div className='flex flex-col gap-2 mx-3 my-3'>
            <div className={`flex flex-col gap-1 cursor-pointer p-2 rounded-md ${settings === 'RoomDetails' ? 'bg-[#2dabb1] text-white' : 'hover:bg-gray-200'}`} onClick={() => handleSelectedSettingTab('RoomDetails')}>
              <div className='flex gap-2 items-center'>
                <FaCircleExclamation />
                <div>Room details</div>
              </div>
              <p>Change your room name and display image</p>
            </div>
            <div className={`flex flex-col gap-1 cursor-pointer p-2 rounded-md ${settings === 'FeaturePreference' ? 'bg-[#2dabb1] text-white' : 'hover:bg-gray-200'}`} onClick={() => handleSelectedSettingTab('FeaturePreference')}>
              <div className='flex gap-2 items-center'>
                <GiStarsStack />
                <div>Feature Preferences</div>
              </div>
              <p>Customize the Room features to your liking</p>
            </div>
            <div className={`flex flex-col gap-1 cursor-pointer p-2 rounded-md ${settings === 'RoomMembers' ? 'bg-[#2dabb1] text-white' : 'hover:bg-gray-200'}`} onClick={() => handleSelectedSettingTab('RoomMembers')}>
              <div className='flex gap-2 items-center'>
                <FaPeopleGroup />
                <div>Room Members</div>
              </div>
              <p>See and Edit your Room roster</p>
            </div>
            <div className={`flex flex-col gap-1 cursor-pointer p-2 rounded-md ${settings === 'InvitePeople' ? 'bg-[#2dabb1] text-white' : 'hover:bg-gray-200'}`} onClick={() => handleSelectedSettingTab('InvitePeople')}>
              <div className='flex gap-2 items-center'>
                <IoMdPersonAdd />
                <div>Invite People</div>
              </div>
              <p>Send Invites for people to join the room</p>
            </div>
          </div>
        </div>
        <div className='w-3/5'>
        {settings === 'RoomDetails' && <div>{<RoomDetails/>}</div>}
        {settings === 'FeaturePreference' && <div>{<FeaturePreference/>}</div>}
        {settings === 'RoomMembers' && <div>{<RoomMembers/>}</div>}
        {settings === 'InvitePeople' && <div>{<InvitePeople/>}</div>}
        </div>
      </div>
    </DashLayout>
  )
}

export default Settings