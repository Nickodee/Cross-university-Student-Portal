import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Home from './components/Home';
import Register from './pages/Register';


export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='/pages/login' element={<Login/>}/>
        <Route path='/pages/register' element ={<Register/>}/>
      </Routes>
      </Router>
    </>
  )
}