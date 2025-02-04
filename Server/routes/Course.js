const express = require('express');
const router = express.Router();
const { createCategory, findAllCategory, categoryPageDetails } = require("../controllers/Category");
const {createCourse, showAllCourses, getCourseDetails} = require("../controllers/Course");
const {auth, isAdmin, isStudent, isInstructor} = require("../middlewares/auth");
const {createSection, updateSection, deleteSection} = require('../controllers/Section')
// const {createSection, updateSection, deleteSection} = require('../controllers/Subsection')
const {createSubSection} = require('../controllers/Subsection')
const {createRating, getAverageRating, getAllReviews} = require('../controllers/RatingAndReview');

//course -
router.post('/createCourse',auth ,isInstructor, createCourse)
router.get('/showAllCoures', showAllCourses);
router.get('/getCourseDetails',getCourseDetails);

//section -
router.post('/createSection',auth ,isInstructor, createSection)
router.post('/updateSection',auth , isInstructor, updateSection);
router.post('/deleteSection',auth , isInstructor,deleteSection);

//sub-section -
router.post('/createSubSection',auth ,isInstructor, createSubSection)

//category -
router.post('/createCategory',auth ,isAdmin, createCategory)
router.get('/showAllCategory',findAllCategory);
router.get('/getCategoryPageDetails',categoryPageDetails);

//review and rating -
router.post('/createRating',auth , isStudent, createRating)
router.get('/getAverageRating',getAverageRating);
router.get('/getReviews',getAllReviews);

module.exports = router