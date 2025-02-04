const subSection = require('../models/SubSection')
const Section = require('../models/Section')
const {uploadVideoToCloudinary} = require('../utils/imageUploader');

exports.createSubSection = async (req, res)=>{
    try{
        const {sectionId, title, timeDuration, description} = req.body;
        const video = req.files.videoFile;
        if(!title || !sectionId || !timeDuration || !description || !video){
            return res.status(400).json({
                success: false,
                message: "Feilds can't be empty..."
            })
        }

        const uploadDetails = await uploadVideoToCloudinary(video, process.env.FOLDER_NAME);
        const newSubSection = await subSection.create({
            title, timeDuration, description, videoURL: uploadDetails.secure_url
        })
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$push:{subSection:newSubSection._id}},{new: true}).populate("subSection");
        return res.status(200).json({
            success: true,
            message: "New SubSection Added...",
            updatedSection,
        })
    }catch(error){
        return res.status(400).json({
            success: false,
            message: "Can't create new SubSection, some error occured ..."
        })
    }
}