import {useState} from 'react'
import DashLayout from '../Dashboard/DashLayout'
import ChatRoom from './components/ChatRoom';
import Files from './components/Files';
import Members from './components/Members';
function Rooms() {
    const [activeFeature, setActiveFeature] = useState('ChatRoom')
    const handleSelectedFeatureTab = (tab) => {
        setActiveFeature(tab);
    };
  return (
    <DashLayout>
        <div className='p-3'>
            <ul className='flex items-center gap-3'>
                <li ><button className={`hover:underline ${activeFeature === 'ChatRoom' ? 'font-bold text-[#2dabb1] underline' : ''}`} onClick={() => handleSelectedFeatureTab('ChatRoom')}>ChatRoom</button></li>
                <li ><button className={`hover:underline ${activeFeature === 'files' ? 'font-bold text-[#2dabb1] underline' : ''}`} onClick={() => handleSelectedFeatureTab('files')}>Files</button></li>
                <li ><button className={`hover:underline ${activeFeature === 'members' ? 'font-bold text-[#2dabb1] underline' : ''}`} onClick={() => handleSelectedFeatureTab('members')}>Members</button></li>
            </ul>
            <div>
            {activeFeature === 'ChatRoom' && <div>{<ChatRoom/>}</div>}
            {activeFeature === 'files' && <div>{<Files/>}</div>}
            {activeFeature === 'members' && <div>{<Members/>}</div>}
            </div>
        </div>
    </DashLayout>
  )
}

export default Rooms