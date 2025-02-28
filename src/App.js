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
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor'
import About from './pages/About';
import Catalog from './pages/Catalog';
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
// import { ACCOUNT_TYPE } from "./utils/constants";
import CourseDetails from './pages/CourseDetails';
import ContactUsPage from './pages/Contact';
import { useSelector } from 'react-redux';
// import { Outlet } from 'react-router-dom';

function App() {
  const { user } = useSelector((state) => state.profile)
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
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />


        <Route path="/dashboard" element={<DashBoard />}>
          <Route path="my-profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="add-courses" element={<AddCourse />} />
          <Route path="settings" element={<Settings />} />
          <Route path="instructor-courses" element={<InstructorCourses />} />
          <Route path="instructor" element={<Instructor />} />
          <Route path="enrolled-courses" element={<EnrolledCourses />} />
          <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
        </Route>

        <Route path="view-course/:courseId" element={<ViewCourse />}>
          {/* {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <> */}
                <Route path="section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />}/>
              {/* </>
            )
          } */}
        </Route>

      </Routes>
    </div>
  );
}

export default App;
