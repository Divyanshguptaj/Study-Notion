const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCategory = async (req, res) =>{
    try{
        const {name, description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "Feilds can't be empty"
            })
        }

        const catDetails = await Category.create({
            name: name,
            description: description,
        })
        console.log(catDetails);
        
        return res.status(200).json({
            success: true,
            message: "Tag created succesfully...", 
        })

    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message, 
        })
    }
}

exports.findAllCategory = async (req, res)=>{
    try{
        const allCategory = await Category.find({}, {name: true, description: true});
        return res.status(200).json({
            success: true,
            message: "All tags found succesfully...",
            allCategory,
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Can't find all category...",
        })
    }
}

exports.categoryPageDetails = async (req, res)=>{
    try {
        const {categoryId} = req.body;

        const getSelectedCourses = await Category.findById(categoryId).populate('courses').exec();
        if(!getSelectedCourses){
            return res.status(400).json({
                success: false,
                message: "Can't found any selected course",
            })
        }

        const differentCourses = await Category.find({_id: {$ne: categoryId},}).populate('courses').exec();
        if(!differentCourses){
            return res.status(400).json({
                success: false,
                message: "Please try again",
            })
        }
        //get top selling course
        return res.status(200).json({
            success: true,
            message: "Found all the details",
            getSelectedCourses,
            differentCourses,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Please try again",
        })
    }
}