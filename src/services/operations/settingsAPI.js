import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

export function updateProfile(email, formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating Profile...");

    try {
      console.log(email, formData)
      const response = await apiConnector("POST", UPDATE_PROFILE_API , {
        email,
        ...formData,
      });

      console.log("UPDATE_PROFILE_API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser({ ...response.data.updatedUserDetails }));
      toast.success("Profile Updated Successfully");
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("UPDATE_PROFILE_API ERROR:", error);
      toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    // console.log(formData)
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData); 
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
    toast.dismiss(toastId)
    return response;
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export function deleteProfile(email, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", DELETE_PROFILE_API, { email }, {
        Authorization: `Bearer ${token}`,
      });
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    navigate('/login')

    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}