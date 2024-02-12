const express = require('express')
const { getChatRoomById } = require('../controllers/chatController')
const router = express.Router();

router.get('/:chatRoomId', getChatRoomById)



module.exports = router