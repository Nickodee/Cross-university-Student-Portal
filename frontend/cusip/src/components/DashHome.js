import {useEffect,useState} from 'react'
import DashLayout from './Dashboard/DashLayout'
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../features/auth2/authSlice';
import authService from '../features/auth2/authService';


function DashHome() {
  const [userData, setUserData] = useState(null)
    const dispatch = useDispatch();

    //Fetch user from store
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);


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

  return (
    <DashLayout>
        <div className='mx-1'>
            {userData ? (<p className='text-center'>Welcome home, <span className='font-bold text-[#2dabb1]'>{userData.first_name}</span></p>): (<p className='text-center'>Loading user data...</p>)}
            <div className='bg-white mt-1 w-full rounded p-2'>Graph</div>
        </div>
    </DashLayout>
  )
}

export default DashHome