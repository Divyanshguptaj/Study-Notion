const express = require('express');
const router = express.Router();

const {updateProfile, deleteAccount, getAllUsers,getUserDetails} = require('../controllers/Profile')

router.post('/updateProfile',updateProfile);
router.post('/deleteAccount',deleteAccount);
router.get('/getAllUsers', getAllUsers);
router.get('/getUserDetails', getUserDetails);

module.exports = router