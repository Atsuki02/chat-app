const express = require('express')
const { getUser, toggleDarkMode, toggleNotifications, updateProfileImage, getAllUsers, getFavoriteUsers, addFavorite, removeFavorite, getUserChatRooms, getPinnedChatRoomsByUser, getChatRoomByIdAndUserId, createDirectMessageChatRoom, createChatRoomWithMembers  } = require('../controllers/userController')
const router = express.Router();

router.get('/users', getAllUsers)
router.post('/direct', createDirectMessageChatRoom)
router.post('/create-group', createChatRoomWithMembers);
router.post('/:userId/favorites/add', addFavorite)
router.delete('/:userId/favorites/remove', removeFavorite)
router.get('/:userId', getUser)
router.patch('/:userId/dark-mode', toggleDarkMode)
router.patch('/:userId/notifications', toggleNotifications)
router.patch('/:userId/profile-image', updateProfileImage)
router.get('/:userId/favorites', getFavoriteUsers)
router.get('/:userId/chatRooms', getUserChatRooms)
router.get('/:userId/pinnedChatRooms', getPinnedChatRoomsByUser)
router.get('/:userId/chatRooms/:chatRoomId', getChatRoomByIdAndUserId )

module.exports = router