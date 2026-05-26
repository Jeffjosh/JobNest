import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Jobdetail from './Pages/Jobdetail';
import Myapplications from './Pages/Myapplications';
import Createjobs from './Pages/Createjobs';
import Recruiterdashboard from './Pages/Recruiterdashboard';
import Applicants from './Pages/Applicants';
import Editjob from './Pages/Editjob';
import Protectroute from './Components/Protectroute';
import Profile from './Pages/Profile';
import Message from './Pages/Message';
import Admin from './Pages/Admin';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';

function App() {
  return (
  <Router>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/jobs/:id' element={<Jobdetail/>}/>
    <Route path='/myapplications' element={<Protectroute role="user" ><Myapplications/></Protectroute>}/>
    <Route path='/createjob' element={<Protectroute role="recruiter" ><Createjobs/></Protectroute>}/>
    <Route path='/recruiterdashboard' element={<Protectroute role="recruiter" ><Recruiterdashboard/></Protectroute>}/>
    <Route path='/applications/:id' element={<Protectroute role="recruiter" ><Applicants/></Protectroute>}/>
    <Route path='/editjob/:id' element={<Protectroute role="recruiter" ><Editjob/></Protectroute>}/>
    <Route path='/profile' element={<Protectroute role="user" ><Profile/></Protectroute>}/>
    <Route path='/messages/:id' element={<Message/>}/>
    <Route path='/admin' element={<Admin/>}/>
    </Routes>
    <Footer/>
  </Router>

  )
}

export default App
