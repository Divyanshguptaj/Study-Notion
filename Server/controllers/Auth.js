const User = require('../models/User');
const OTP = require('../models/OTP');
const otpgenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Profile = require('../models/Profile');
require('dotenv').config();

//Send OTP -
exports.sendOTP = async (req, res)=>{
    try{
        const {email} = req.body;
        // console.log(email);
        const checkUserPresent = await User.findOne({email})
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User already exists! , Please go and try for login ...", 
            })
        }
        var otp = otpgenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,    
        })
        let result = await OTP.findOne({otp: otp})
        while(result){
            var otp = otpgenerator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,    
            })
            result = await OTP.findOne({otp: otp})
        }

        // console.log("OTP generated succesfully",otp);
        const otpPayload = {email, otp};
        await OTP.create(otpPayload);
        
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error occured at generating otp",
        })
    }
}

//sign Up -
exports.signUp = async (req,res) =>{
    try{
        const {firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp} = req.body; 

        //validation
        if(!firstName || !lastName || !password || !confirmPassword || !otp || !contactNumber){
            return res.status(403).json({ 
                success: false,
                message: "All fields are mandatory...",
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Passwords are not same",
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            })
        }

        const recentOTP = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        
        if(recentOTP.length===0){
            return res.status(400).json({
                success: false,
                message: "Can't fetch otp",
            })
        }
        if (otp !== recentOTP[0].otp) {
            console.log(recentOTP[0].otp);        
            console.log(recentOTP[0]);        
            console.log(otp);        
            return res.status(400).json({
                success: false,
                message: "OTP not matched",
            });
        }

        //hash password 
        const hashedPassword = await bcrypt.hash(password, 10);
        //create profile -
        const profileDetails = await Profile.create({
            gender: null, 
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
        if(contactNumber) profileDetails.contactNumber = contactNumber;

        //create entry of user 
        const user = await User.create({
            firstName, lastName, email, password: hashedPassword, accountType, additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User can't registered!, please try again . . .",
        })
    }
}

//login
exports.login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Feilds can't be empty",
            })
        }

        const user = await User.findOne({email: email});
        if(!user){ 
            return res.status(400).json({
                success: false,
                message: "User doesn't exists , SignUp first then login...",
            })
        }
        //jwt token generation -
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn: "24h",
            });
            user.token = token;
            user.password = undefined; 

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            return res.cookie("Token", token, options).status(200).json({
                success: true,
                token, 
                user, 
                message: "Logged and cookie created successfully ...",
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "Password doesn't match",
            })
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Login failed , Please try again later...",
        })
    }
}

//ye bacha hua hai 
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, mail } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Password fields cannot be empty",
            });
        }
        console.log(mail)
        // Find user by email
        const user = await User.findOne({ email: mail });

        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "User not found",
            });
        }

        // Compare old password with stored password
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        user.password = hashedPassword;
        await user.save(); // ✅ Save changes

        return res.status(200).json({
            success: true,
            message: "Password Updated Successfully",
        });

    } catch (error) {
        console.error("Change Password Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};