const User = require('../models/User');
const OTP = require('../models/OTP');
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require('../models/Profile');
require('dotenv').config();

//Send OTP -
exports.sendOTP = async (req, res)=>{
    try{
        const {email} = req.body;
        console.log(email);
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

        console.log("OTP generated succesfully",otp);
        const otpPayload = {email, otp};
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);
        
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
        // console.log(firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp);

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

        //check recent otp
        console.log("fetching otp")
        const recentOTP = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log(recentOTP);
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
        console.log(email, password);
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Feilds can't be empty",
            })
        }

        const user = await User.findOne({email: email});
        console.log(user._id);
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
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined; 

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("Token", token, options).status(200).json({
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
exports.changePassword = async (req,res)=>{
    const {oldPassword, newPassword, confirmNewPassword} = req.body;
    if(!oldPassword || !newPassword || !confirmNewPassword){
        return res.status(400).json({
            success:false,
            message: "Password field can't be empty",
        })
    }
}