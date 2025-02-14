import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import ResendMail from './pages/ResendMail'
import ResetComplete from './pages/ResetComplete';
import VerifyEmail from './pages/VerifyEmail';
import UpdateProfile from './pages/UpdateProfile';
import Profile from './pages/Profile'
import Cart from './pages/Cart'
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/forgotPassword" element={<ForgotPassword/>}/>
          <Route path="/resendMail" element={<ResendMail/>}/>
          <Route path="/resetComplete" element={<ResetComplete/>}/>
          <Route path="/update-Password" element={<ChangePassword/>}/>
          <Route path="/updateProfile" element={<UpdateProfile/>}/>
          <Route path="/verifyEmail" element={<VerifyEmail/>}/>
          <Route path="/dashboard/my-profile" element={<Profile/>}/>
          <Route path="/dashboard/cart" element={<Cart/>}/>
        </Routes>
    </div>
  );
}

export default App;
