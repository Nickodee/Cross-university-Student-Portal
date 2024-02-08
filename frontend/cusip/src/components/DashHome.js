import {useEffect} from 'react'
import DashLayout from './Dashboard/DashLayout'
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../features/auth/authSlice';


function DashHome() {
    const dispatch = useDispatch();

    //Fetch user from store
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);
    
  return (
    <DashLayout>
        <div className=''>
            {user ? (<p className='text-center'>Welcome home, <span className='font-bold text-[#2dabb1]'>{user.first_name}</span></p>): (<p className='text-center'>Loading user data...</p>)}
            
        </div>
    </DashLayout>
  )
}

export default DashHome