const express = require('express');
const router = express.Router();

const {updateProfile, deleteAccount, getAllUsers} = require('../controllers/Profile')

router.post('/updateProfile',updateProfile);
router.post('/deleteAccount',deleteAccount);
router.post('/getAllUsers', getAllUsers);

module.exports = router