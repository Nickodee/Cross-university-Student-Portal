import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login';
import Home from './components/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProProfile from './components/ProProfile';
import Jobs_Updates from './components/Jobs_Updates';
import DashHome from './components/DashHome';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import DMs from './components/DMs';
import Rooms from './components/Rooms/Rooms';
import Post from './pages/Post';


export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='/pages/login' element={<Login/>}/>
        <Route path='/pages/register' element ={<Register/>}/>
        <Route path='/pages/post' element={<Post/>} />
        <Route path='/pages/dashboard' element ={<Dashboard/>}/>
        <Route path='/dashboard/dashhome' element={<DashHome/>}/>
        <Route path='/dashboard/profile' element={<ProProfile/>}/>
        <Route path='/dashboard/job_updates' element={<Jobs_Updates/>}/>
        <Route path='/dashboard/dms' element={<DMs/>}/>
        <Route path='/dashboard/notifications' element={<Notifications/>}/>
        <Route path='/dashboard/settings' element={<Settings/>}/>
        <Route path='/dashboard/rooms' element={<Rooms/>}/>
      </Routes>
      </Router>
      <ToastContainer/>
    </>
  )
}