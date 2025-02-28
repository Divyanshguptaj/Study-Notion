const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    whatYouWillLearn:{
        type: String,
    },
    courseContent:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }
    ],
    ratingAndReviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview"
        }
    ],
    price: {
        type: Number,
    },
    tag:{
        type: [String],
        // required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    thumbnail: {
        type: String,
    }, 
    instructions: {
        type: [String],
    },
    status: { 
        type: String,
        enum: ["Draft", "Published"],
    },
    studentsEnrolled:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('Course', courseSchema);