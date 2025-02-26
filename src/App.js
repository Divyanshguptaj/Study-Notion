import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import ResendMail from './pages/ResendMail';
import ResetComplete from './pages/ResetComplete';
import VerifyEmail from './pages/VerifyEmail';
import UpdateProfile from './pages/UpdateProfile';
import DashBoard from './pages/Dashboard';
import Profile from '../src/components/core/Dashboard/MyProfile';
import Cart from './components/core/Dashboard/Cart';
import Settings from './components/core/Dashboard/Settings';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import EditCourse from './components/core/Dashboard/EditCourse';
import AddCourse from './components/core/Dashboard/AddCourse'
import InstructorCourses from './components/core/Dashboard/MyCourses'
import About from './pages/About';
import Catalog from './pages/Catalog';
// import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resendMail" element={<ResendMail />} />
        <Route path="/resetComplete" element={<ResetComplete />} />
        <Route path="/update-Password" element={<ChangePassword />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />


        <Route path="/dashboard" element={<DashBoard />}>
          <Route path="my-profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="add-courses" element={<AddCourse />} />
          <Route path="settings" element={<Settings />} />
          <Route path="instructor-courses" element={<InstructorCourses />} />
          <Route path="enrolled-courses" element={<EnrolledCourses />} />
          <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
