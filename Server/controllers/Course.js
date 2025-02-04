const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require("../models/User")
const {uploadImagetoCloudinary} = require('../utils/imageUploader')
require('dotenv').config();

exports.createCourse = async (req, res)=>{
    try{
        const {courseName, courseDescription, whatYouWillLearn, price , category} = req.body;
        const thumbnail = req.files.thumbnail;
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category){
            return res.status(400).json({
                success: false,
                message: "Feilds can't be empty..."
            })
        }
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        if(!instructorDetails){
            return res.status(400).json({
                success: false,
                message: "Can't find instructor Details..."
            })
        }else{
            console.log("Instructor Details: ",instructorDetails)
        }
        
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(400).json({
                success: false,
                message: "Can't find category..."
            })
        }else{
            console.log(categoryDetails);
        }
        const thumbnailImage = await uploadImagetoCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
        })

        await User.findByIdAndUpdate({id: instructorDetails._id},{$push:{courses:newCourse._id}},{new: true})
        return res.status(200).json({
            success: true,
            message: "New Course Added...",
            data: newCourse,
        })
        
    }catch(error){
        return res.status(400).json({
            success: false,
            message: "Some error occured while creating course , please try again..."
        })
    }
}

exports.showAllCourses = async (req,res)=>{
    try{
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instuctor: true,
            ratingAndReviews: true,
            studentsEnrolled: true,
        }).populate("instructor").exec();
        
        return res.status(200).json({
            success: true,
            message: "All courses shown successfully...",
            data: allCourses,
        })

    }catch(error){
        return res.status(400).json({
            success: false,
            message: "Some error occured while showing all courses..."
        })
    }
}

exports.getCourseDetails = async (req,res)=>{
    try {
        const {courseId} = req.body;
        if(!courseId){
            return res.status(400).json({
                success: false,
                message: "Feilds can't be empty",
            })
        }
        const courseDetails = await Course.findById(courseId)
        .populate({path: 'instructor',populate:{path:'additionalDetails'},})
        .populate('ratingAndReviews')
        .populate('category')
        .populate({path: 'courseContent',populate:{path: 'subSection'},}).exec();
        // .populate({path: "studentsEnrolled",populate:{path:'additionalDetails'},});

        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: "Can't find the course...",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Found course details succesfully...",
            data: courseDetails
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Can't get course details",
        })
    }
}