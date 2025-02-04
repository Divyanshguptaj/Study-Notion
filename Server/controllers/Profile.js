const Profile = require('../models/Profile');
const User = require('../models/User');

exports.updateProfile = async (req, res)=>{
    try {
        const {dateOfBirth="", about="", contactNumber,gender} = req.body;
        const userId = req.user.id; 

        if(!contactNumber || !gender || !userId){
            return res.status(400).json({
                success: false,
                message: "Feilds can't be empty..."
            })
        }

        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails
        const updatedProfile = await Profile.findByIdAndUpdate(profileId, {dateOfBirth, about, contactNumber,gender});
        return res.status(200).json({
            success: true,
            message: "Profile Updated...",
            updatedProfile,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Can't update profile, some error occured ..."
        })        
    }
}

exports.deleteAccount = async (req, res)=>{
    try {
        const userId = req.user.id;
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found..."
            })
        }

        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete(profileId)
        await User.findByIdAndDelete(userId);
        return res.status(200).json({
            success: true,
            message: "Account Deleted..."
        }) 
        //search chron job
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Can't delete account, some error occured ..."
        })
        
    }
}

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