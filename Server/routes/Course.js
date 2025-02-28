const express = require('express');
const router = express.Router();
const { createCategory, findAllCategory, categoryPageDetails } = require("../controllers/Category");
const {createCourse, showAllCourses, getCourseDetails, editCourse,getInstructorCourses, deleteCourse,updateCourseProgress} = require("../controllers/Course");
const {auth, isAdmin, isStudent, isInstructor} = require("../middlewares/auth");
const {createSection, updateSection, deleteSection} = require('../controllers/Section')
// const {createSection, updateSection, deleteSection} = require('../controllers/Subsection')
const {createSubSection,deleteSubSection, updateSubSection} = require('../controllers/Subsection')
const {createRating, getAverageRating, getAllReviews} = require('../controllers/RatingAndReview');

//course -
router.post('/editCourse', editCourse)
router.post('/updateCourseProgress', updateCourseProgress)
router.post('/createCourse', createCourse)
router.post('/deleteCourse', deleteCourse)
router.get('/showAllCoures', showAllCourses);
router.get('/getInstructorCourses', getInstructorCourses);
router.post('/getFullCourseDetails',getCourseDetails);

//section -
router.post('/createSection',createSection)
router.post('/updateSection',updateSection);
router.post('/deleteSection',deleteSection);

//sub-section -
router.post('/addSubSection',createSubSection)
router.post('/deleteSubSection', deleteSubSection)
router.post('/updateSubSection', updateSubSection)

//category -
router.post('/createCategory',auth ,isAdmin, createCategory)
router.get('/showAllCategories',findAllCategory);
router.post('/getCategoryPageDetails',categoryPageDetails);

//review and rating -
router.post('/createRating',/*auth , isStudent,*/ createRating)
router.get('/getAverageRating',getAverageRating);
router.get('/getReviews',getAllReviews);

module.exports = router