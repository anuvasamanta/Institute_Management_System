const express = require('express')
const UserController = require('../controllers/UserController')
const AuthCheck = require('../middleware/AuthCheck')
const router = express.Router();


router.post('/register',  UserController.register)
router.post('/verify', UserController.verify)
router.post('/login', UserController.createLogin)
router.get('/user/profile', AuthCheck, UserController.getProfile)
router.put('/profile/update', AuthCheck, UserController.updateProfile)
router.delete('/user/logout',AuthCheck, UserController.logoutUser)

module.exports = router