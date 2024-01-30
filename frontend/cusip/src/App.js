import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login';
import Home from './components/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';


export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='/pages/login' element={<Login/>}/>
        <Route path='/pages/register' element ={<Register/>}/>
        <Route path='/pages/dashboard' element ={<Dashboard/>}/>
      </Routes>
      </Router>
      <ToastContainer/>
    </>
  )
}