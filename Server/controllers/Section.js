const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res)=>{
    try{
        const {sectionName, courseId} = req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "Feilds can't be empty..."
            })
        }
        // const courseDetails = await Course.findById(courseId);
        // if(!courseDetails){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Can't find course..."
        //     })
        // }else{
        //     console.log(courseDetails);
        // }
        const newSection = await Section.create({sectionName})
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,{$push:{courseContent:newSection._id}},{new: true}).populate("courseContent");
        // console.log(updatedCourseDetails)
        return res.status(200).json({
            success: true,
            message: "New Section Added...",
            data: updatedCourseDetails,
        })
    }catch(error){
        return res.status(400).json({
            success: false,
            message: "Can't create new section, some error occured ..."
        })
    }
}

exports.updateSection = async (req, res)=>{
    try {
        const {sectionName, sectionId} = req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: "Feilds can't be empty..."
            })
        }
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true});
        return res.status(200).json({
            success: true,
            message: "Section Updated...",
            data: updatedSection,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Can't update section, some error occured ..."
        })
        
    }
}

exports.deleteSection = async (req, res)=>{
    try {
        const {sectionId, courseId} = req.body;
        if(!sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "Feilds can't be empty..."
            })
        }
        await Section.findByIdAndDelete(sectionId);
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,{$pull:{courseContent:sectionId}},{new: true}).populate("courseContent");
        return res.status(200).json({
            success: true,
            message: "Section Deleted...",
            data: updatedCourseDetails,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Can't delete section, some error occured ..."
        })
    }
}