const express = require('express')
const {register, login, validateSession, deleteAccount, logout} = require('../controllers/authController')
const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/session', validateSession);
router.delete('/delete/:userId', deleteAccount);
router.post('/logout', logout);

module.exports = router

