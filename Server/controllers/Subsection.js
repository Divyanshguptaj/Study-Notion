const subSection = require('../models/SubSection')
const Section = require('../models/Section')
const {uploadImagetoCloudinary} = require('../utils/imageUploader');
const Course = require('../models/Course')

exports.createSubSection = async (req, res)=>{
    try{
        const {sectionId, title, timeDuration, description,courseId} = req.body;
        const video = req.files.video;
        if(!title || !sectionId || !description || !video){
            return res.status(400).json({
                success: false,
                message: "Feilds can't be empty..."
            })
        }

        const uploadDetails = await uploadImagetoCloudinary(video, "Study-Notion");
        const newSubSection = await subSection.create({
            title, timeDuration, description, videoURL: uploadDetails.secure_url
        })
        await Section.findByIdAndUpdate(sectionId,{$push:{subSection:newSubSection._id}},{new: true}).populate("subSection");
        const updatedCourse = await Course.findOne({ _id: courseId })
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .populate("instructor")  // Optional: Populate instructor details
        .populate("category")    // Optional: Populate category details
        .exec();

        return res.status(200).json({
            success: true,
            message: "New SubSection Added...",
            data: updatedCourse,
        })
    }catch(error){
        return res.status(400).json({
            success: false,
            message: "Can't create new SubSection, some error occured ..."
        })
    }
}

exports.deleteSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, courseId } = req.body;

        if (!sectionId || !subSectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields (sectionId, subSectionId, courseId) are required",
            });
        }

        // Remove the subsection from the Section model
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $pull: { subSection: subSectionId } },
            { new: true }
        );

        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        // Delete the SubSection from the database
        await subSection.findByIdAndDelete(subSectionId);

        // Fetch updated course details with fully populated structure
        const updatedCourse = await Course.findOne({ _id: courseId })
            .populate({ 
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .populate("instructor")
            .populate("category")
            .exec();

        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
            data: updatedCourse, 
        });
    } catch (error) {
        console.log("Error deleting subsection:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting subsection, please try again",
        });
    }
};

exports.updateSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId, courseId, title, description } = req.body;
        const video = req.files?.video;  // Optional file upload

        if (!subSectionId || !sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields (subSectionId, sectionId, courseId) are required",
            });
        }

        // Find the subsection
        let SubSection = await subSection.findById(subSectionId);
        if (!SubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        // Update title and description if provided
        if (title) SubSection.title = title;
        if (description) SubSection.description = description;

        // Upload and update video if a new file is provided
        if (video) {
            const uploadDetails = await uploadImagetoCloudinary(video, "Study-Notion");
            SubSection.videoURL = uploadDetails.secure_url;
        }

        // Save the updated subsection
        await SubSection.save();

        // Fetch updated course details with fully populated structure
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .populate("instructor")
            .populate("category")
            .exec();

        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data: updatedCourse, // Return the updated course structure
        });
    } catch (error) {
        console.error("Error updating subsection:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating subsection, please try again",
        });
    }
};