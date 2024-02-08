import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../features/auth/authSlice';
import DashHome from '../components/DashHome';



function Dashboard() {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
      dispatch(getUser()); // Fetch the authenticated user
    }, [dispatch]);

    if  (!user){
        return navigate('/pages/login')
    }
  return (
    <>
    <DashHome/>
    </>
  )
}

export default Dashboard