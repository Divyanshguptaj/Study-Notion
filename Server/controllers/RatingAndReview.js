const RatingAndReview = require('../models/RatingAndReview')
const Course = require('../models/Course')

exports.createRating = async (req, res)=>{
    try {
        const {rating, review, courseId, userId} = req.body;
        // const userId = req.user.id;

        if(!rating || !review){
            return res.status(400).json({
                success: false,
                message: "Fields can't be empty",
            })
        }

        const courseDetails = await Course.findOne({ _id:courseId, studentsEnrolled:{$elemMatch: {$eq: userId}}});
        // console.log(courseDetails)
        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: "To review the course you must have it's subscription...",
            })
        }

        const alreadyReviewed = await RatingAndReview.findOne({user: userId,course: courseId});  
        // console.log("alredyReviewed", alreadyReviewed)
        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: "You already reviewed the course",
            })
        }
        const RatingAndReviewResponse = await RatingAndReview.create({
            user: userId,
            course: courseId,
            rating: rating,
            review: review,
        })
        if(!RatingAndReviewResponse){
            return res.status(400).json({
                success: false,
                message: "Can't create review object ...",
            })
        }
        const updatedCourseDetails = await Course.findByIdAndUpdate(coureseId,{$push:{
            ratingAndReviews: RatingAndReviewResponse._id 
        }},{new: true});
        console.log(updatedCourseDetails)
        return res.status(200).json({
            success: true,
            message: "Review done successfully",
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Some error occured please try again ...",
        })
    }
}

exports.getAverageRating = async (req,res)=>{
    try {
        const courseId = req.body.courseId;
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id: null,
                    getAverageRating: {$avg:'$rating'}
                }
            }
        ])
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                message: "Average calculated",
                averageRating: result[0].averageRating,
            })
        }

        return res.status(200).json({
            success: true,
            message: "Average calculated",
            averageRating: 0,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Please try again",
        })
    }
}

exports.getAllReviews = async (req,res)=>{
    try {
        const allReviews = await RatingAndReview.find({}).sort({rating: "desc"}).populate({path:'user',select:"firstName lastName email image"}).populate({path:'course',select:'courseName'}).exec();
        return res.status(200).json({
            success: true,
            message: "All reviews found succesfully...",
            data: allReviews,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Please try again",
        })
    }
}