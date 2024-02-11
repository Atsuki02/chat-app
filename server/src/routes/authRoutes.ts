const express = require('express')
const {register, login, validateSession} = require('../controllers/authController')
const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/session', validateSession);

module.exports = router

