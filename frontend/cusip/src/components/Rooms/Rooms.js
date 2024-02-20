import {useState} from 'react'
import DashLayout from '../Dashboard/DashLayout'
function Rooms() {
    const[activeFeature,setActiveFeature] = useState('GroupFeed')
    const  FeatureHandler=(e)=>{
        setActiveFeature(e)
    }
  return (
    <DashLayout>
        <div className='p-3'>
            <ul className='flex items-center gap-3'>
                <li><button>Group Feed</button></li>
                <li><button>ChatRooms</button></li>
                <li><button>Files</button></li>
                <li><button>Members</button></li>
            </ul>
            <div></div>
        </div>
    </DashLayout>
  )
}

export default Rooms