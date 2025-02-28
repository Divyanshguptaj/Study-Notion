const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require("../models/User")
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const {uploadImagetoCloudinary} = require('../utils/imageUploader');
const CourseProgress = require("../models/CourseProgress");

require('dotenv').config();

exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            category,
            email,
            status = "Draft",
        } = req.body;

        let tags = req.body.tag ? JSON.parse(req.body.tag) : [];
        let instructions = req.body.instructions ? JSON.parse(req.body.instructions) : [];
        const thumbnail = req.files?.thumbnailImage;

        // Validate status
        const validStatuses = ["Draft", "Published"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course status provided",
            });
        }

        // Find existing course
        const existingCourse = await Course.findById(courseId);
        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Upload new thumbnail if provided
        let updatedThumbnail = existingCourse.thumbnail;
        if (thumbnail) {
            const uploadDetails = await uploadImagetoCloudinary(thumbnail, "Study-Notion");
            updatedThumbnail = uploadDetails.secure_url;
        }

        // Update course details
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                courseName: courseName || existingCourse.courseName,
                courseDescription: courseDescription || existingCourse.courseDescription,
                whatYouWillLearn: whatYouWillLearn || existingCourse.whatYouWillLearn,
                price: price || existingCourse.price,
                category: category || existingCourse.category,
                status: status || existingCourse.status,
                tag: tags.length > 0 ? tags : existingCourse.tag,
                instructions: instructions.length > 0 ? instructions : existingCourse.instructions,
                thumbnail: updatedThumbnail,
            },
            { new: true }
        )
        .populate("instructor")
        .populate("category")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        });

        return res.status(200).json({
            success: true,
            message: "Course details updated successfully",
            data: updatedCourse,
        });

    } catch (error) {
        console.error("Error updating course details:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating course details, please try again",
        });
    }
};

exports.createCourse = async (req, res) => {
    try { 
        const { courseName, courseDescription, whatYouWillLearn, price, category, email, status = "Draft" } = req.body;
        const thumbnail = req.files?.thumbnailImage;
        let tags = req.body.tag ? JSON.parse(req.body.tag) : []; // Parse tags properly
        let instructions = req.body.instructions ? JSON.parse(req.body.instructions) : [];

        // Validate required fields
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tags.length || !instructions.length) {
            return res.status(400).json({
                success: false,   
                message: "Fields can't be empty..."
            });
        }

        // Find instructor details
        const instructorDetails = await User.findOne({ email: email });
        if (!instructorDetails) {
            return res.status(400).json({
                success: false,
                message: "Can't find instructor details..."
            });
        }

        // Find category details
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(400).json({
                success: false,
                message: "Can't find category..."
            });
        }

        // Upload course thumbnail to Cloudinary
        const thumbnailImage = await uploadImagetoCloudinary(thumbnail, "Study-Notion");
        console.log("Cloudinary Response:", thumbnailImage);

        // Create new course
        let newCourse;
        try {
            newCourse = await Course.create({
                courseName,
                courseDescription,
                instructor: instructorDetails._id,
                whatYouWillLearn,
                price,
                category,
                thumbnail: thumbnailImage.secure_url,
                tag: tags,
                instructions: instructions,
                status: status, 
            });

            // Update instructor by adding the new course
            await User.findByIdAndUpdate(
                { _id: instructorDetails._id },
                { $push: { courses: newCourse._id } },
                { new: true }
            );

            // ✅ Update category by adding the new course
            await Category.findByIdAndUpdate(
                category,
                { $push: { courses: newCourse._id } },
                { new: true }
            );

        } catch (error) {
            console.log("Can't create the course:", error);
            return res.status(400).json({
                success: false, 
                message: "Can't create the course, please try again",
            });
        }

        return res.status(200).json({
            success: true,
            message: "New Course Added...",
            data: newCourse,
        });

    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({
            success: false,
            message: "Some error occurred while creating the course, please try again...",
        });
    }
};

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
        
        console.log(allCourses)

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
        // console.log("courseID", courseId) 
        if(!courseId){
            return res.status(400).json({
                success: false,
                message: "Feilds can't be empty",
            })
        }
        const courseDetails = await Course.findById(courseId)
        .populate({path: "studentsEnrolled", populate: {path: 'courseProgress'}})
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
        const result = {...courseDetails, success: true};
        // console.log(result)
        return res.status(200).json({
            success: true,  
            message: "Found course details succesfully...",
            data: result
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Can't get course details",
        })
    }
}

exports.getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.query.instructorId;  
        // console.log("Instructor ID:", instructorId);

        const courses = await Course.find({ instructor: instructorId })
            .populate("category") // Populate category details
            .populate("courseContent") // Populate sections
            .populate({ 
                path: "courseContent",
                populate: { path: "subSection" }, // Populate subsections inside sections
            });
            
        // console.log(courses);
        if (!courses || courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found for this instructor",
            });
        }

        res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: courses,
        });
    } catch (error) {
        console.error("Error fetching instructor courses:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch courses",
        });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Delete all sections and subsections related to this course
        for (const sectionId of course.courseContent) {
            const section = await Section.findById(sectionId);
            if (section) {
                await SubSection.deleteMany({ _id: { $in: section.subSection } });
                await Section.findByIdAndDelete(sectionId); 
            }
        }

        // Remove course from instructor's course list
        await User.findByIdAndUpdate(course.instructor, {
            $pull: { courses: courseId },
        });

        // Remove course from category
        // if (course.category) {
        //     await Category.findByIdAndUpdate(course.category, {
        //         $pull: { courses: courseId },
        //     });
        // }

        // Finally, delete the course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting course:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting course. Please try again.",
        });
    }
};

exports.updateCourseProgress = async (req, res) => {
  try {
    const { userId, courseId, subSectionId } = req.body;

    if (!userId || !courseId || !subSectionId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find the user's progress for this course
    let progress = await CourseProgress.findOne({ courseID: courseId });

    // If progress doesn't exist, create a new entry
    if (!progress) {
      progress = new CourseProgress({
        courseID: courseId,
        completedVideos: [],
      });
    }

    // Check if the subSection is already marked as completed
    if (!progress.completedVideos.includes(subSectionId)) {
      progress.completedVideos.push(subSectionId);
      await progress.save();
    }

    // Ensure the user's course progress list contains this progress
    if (!user.courseProgress.includes(progress._id)) {
      user.courseProgress.push(progress._id);
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Lecture marked as completed",
      progress,
    });

  } catch (error) {
    console.error("Error updating course progress:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
