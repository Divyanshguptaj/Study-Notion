const {instance} = require('../config/razorpay').instance;
const { default: mongoose } = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User')
const mailSender = require("../utils/mailSender")

exports.capturePayment = async (req,res) => {
    try {
        const {courseId} = req.body;
        const UserId = req.user.body;
        if(!courseId){
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            })
        }
        let course;
        try {
            course = await Course.findById(courseId);
            if(!course){
                return res.status(404).json({
                    success: false,
                    message: "Course not found ...",
                })
            }
            console.log(course);
            const uid = mongoose.Types.ObjectId(UserId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success: false,
                    message: "You have already purchased this course",
                })
            }

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Course not found ...",
            })
            
        }

        const amount = course.price * 100;
        const currency = "INR";
        const options = {
            amount: amount,
            currency: currency,
            recipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: courseId,
                UserId: UserId,
            }
        }
        try {
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.description,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency, 
                amount: paymentResponse.amount,
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Order cancelled ...",
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Payment failed",
        })
    }
}

exports.verifySignature = async (req,res)=>{
    try {
        webhookSignature = "12345678";

        const signature = req.headers['x-razorpay-signature'];
        const shasum = crypto.createHmac('sha256', webhookSignature);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest('hex');
        if(signature === digest){
            console.log("Request is legit");
            const {courseId, UserId} = req.body.payload.payment.entity.notes;

            try {
                const enrolledCourse = await Course.findByIdAndUpdate(courseId,{
                    $push: {studentsEnrolled: UserId},
                },{new: true});

                if(!enrolledCourse){
                    return res.status(500).json({
                        success: false,
                        message: "course not found",
                    })
                }
                console.log(enrolledCourse);
                
                const enrolledStudent = await User.findByIdAndUpdate(UserId,{
                    $push: {courses: courseId},
                },{new: true});
                console.log(enrolledStudent);

                if(!enrolledStudent){
                    return res.status(500).json({
                        success: false,
                        message: "User not found",
                    })
                }
                //sending mail -
                const sendMail = await mailSender({
                    to: enrolledStudent.email,
                    subject: "Course Enrollment",
                    text: `You have successfully enrolled in ${enrolledCourse.courseName}`,
                });
                console.log(sendMail);
                return res.status(200).json({
                    success: true,
                    message: "Enrolled successfully",
                })
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "can't enroll in course",
                })
            }
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "can't enroll in course",
        }) 
    }
}