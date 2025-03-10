const Profile = require('../models/Profile');
const User = require('../models/User');
const jwt = require("jsonwebtoken");

exports.getUserDetails = async (req, res) => {
    try {
        
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const userDetails = await User.findOne({ email }).populate("additionalDetails");

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,  // Fixed typo
            userDetails,
            message: "User found",
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { email, dateOfBirth, about, contactNumber, gender, firstName, lastName } = req.body;
        console.log(email, dateOfBirth, about, contactNumber, gender, firstName, lastName); 
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Fetch user details along with additional profile details
        const userDetails = await User.findOne({ email }).populate("additionalDetails");
        console.log(userDetails)
        if (!userDetails) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
        await User.findOneAndUpdate(
          { email }, 
          { $set: { firstName, lastName } },
          { new: true} 
        );
        
        // Get profile ID from user's additional details
        const profileId = userDetails.additionalDetails;
        if (!profileId) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        // Create an update object and add only provided fields
        const updateFields = {};
        if (dateOfBirth) updateFields.dateOfBirth = new Date(dateOfBirth); 
        if (about) updateFields.about = about;
        if (contactNumber) updateFields.contactNumber = contactNumber;
        if (gender) updateFields.gender = gender;
        // Update the profile only if there are fields to update
        if (Object.keys(updateFields).length > 0) {
            await Profile.findByIdAndUpdate(profileId, updateFields, { new: true });
        }

        return res.status(200).json({ success: true, message: "everything for profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.deleteAccount = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // Verify token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find user by ID
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete associated profile
    const profileId = userDetails.additionalDetails;
    if (profileId) {
      await Profile.findByIdAndDelete(profileId);
    }

    // Delete user account
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete Account Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error: Unable to delete account",
    });
  }
};

exports.getAllUsers = async (req, res)=>{
    try {
        const userId = req.user.id;
        const users = await User.findById(userId).populate("additionalDetails").exec();
        return res.status(200).json({
            success: true,
            message: "All Users...",
            data: users,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Can't get all users, some error occured ..."
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      // const userId = req.user.id; // Assuming authentication middleware adds `req.user`
      const { userId }= req.query
    //   console.log(userId);
      // Fetch user and populate enrolled courses
      const user = await User.findById(userId)
      .populate({
        path: "courses", // Populate the courses array
        populate: {
          path: "courseContent", // Inside courses, populate courseContent (sections)
          populate: {
            path: "subSection", // Inside courseContent, populate subsections
          },
        },
      });
      // console.log(user)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: user.courses,
      });
  
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      return res.status(500).json({
        success: false,
        message: "Can't fetch the enrolled courses",
        error: error.message,
      });
    }
};

exports.instructorDetails = async (req, res) => {
    try {
        const { userId } = req.query; // Get instructor ID from request params
        const instructorId = userId
        console.log(userId)
        // Find instructor, populate `additionalDetails` & `courses`
        const instructor = await User.findOne({
            _id: instructorId,
            accountType: "Instructor",
        })
        .populate("additionalDetails") // Fetch profile details
        .populate({
            path: "courses",
            select: "courseName courseDescription price studentsEnrolled",
        });

        // If instructor not found
        if (!instructor) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found",
            });
        }

        return res.status(200).json({
            success: true,
            instructor,
        });

    } catch (error) {
        console.error("Error fetching instructor details:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
