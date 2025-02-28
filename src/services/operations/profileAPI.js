import { toast } from "react-hot-toast"
import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
// import { logout } from "./authAPI"
const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API } = profileEndpoints

//get user details -
export const fetchUserDetails = (email) => {
  return async (dispatch) => {
    try {
      // console.log("user")
      const response = await apiConnector("GET", `${GET_USER_DETAILS_API}?email=${email}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      
      const userData = response.data.userDetails;
      console.log(userData);

      // Save user in Redux
      dispatch(setUser(userData));
      
      console.log("object")
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (error) {
      // dispatch(logout(navigate));
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details.");
    }
  };
};

export async function getUserEnrolledCourses(userId, token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    // console.log(userId);
    const response = await apiConnector( "GET", `${GET_USER_ENROLLED_COURSES_API}?userId=${userId}`,
      // {
      //   Authorization: `Bearer ${token}`,
      // }
    )
    // console.log("GET_USER_ENROLLED_COURSES_API API RESPONSE............",response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}

export async function getInstructorData(token, userId) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    // console.log("userId" ,userId)
    const response = await apiConnector("GET", `${GET_INSTRUCTOR_DATA_API}?userId=${userId}`, null, 
    // {
    //   Authorization: `Bearer ${token}`,
    // }
  )

    // console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.instructor

  }
  catch(error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}