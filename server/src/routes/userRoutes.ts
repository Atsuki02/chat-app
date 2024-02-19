const express = require('express');
const {
  getUser,
  toggleDarkMode,
  toggleNotifications,
  updateProfileImage,
  getAllUsers,
  getFavoriteUsers,
  addFavorite,
  removeFavorite,
  getUserChatRooms,
  getPinnedChatRoomsByUser,
  getChatRoomByIdAndUserId,
  createDirectMessageChatRoom,
  createChatRoomWithMembers,
  createMessage,
  pinChatRoom,
  unPinChatRoom,
  leaveChatRoom,
  updateLastOnline,
  updateUserOnlineStatus,
} = require('../controllers/userController');
const router = express.Router();

router.get('/users', getAllUsers);
router.post('/direct', createDirectMessageChatRoom);
router.post('/create-group', createChatRoomWithMembers);
router.post('/create-message', createMessage);
router.post('/pin', pinChatRoom);
router.delete('/unPin', unPinChatRoom);
router.delete('/:userId/leave', leaveChatRoom);
router.post('/:userId/favorites/add', addFavorite);
router.delete('/:userId/favorites/remove', removeFavorite);
router.get('/:userId', getUser);
router.patch('/:userId/dark-mode', toggleDarkMode);
router.patch('/:userId/notifications', toggleNotifications);
router.patch('/:userId/profile-image', updateProfileImage);
router.get('/:userId/favorites', getFavoriteUsers);
router.get('/:userId/chatRooms', getUserChatRooms);
router.get('/:userId/pinnedChatRooms', getPinnedChatRoomsByUser);
router.get('/:userId/chatRooms/:chatRoomId', getChatRoomByIdAndUserId);
router.patch('/:userId/last-online', updateLastOnline);
router.patch('/:userId/online-status', updateUserOnlineStatus);

module.exports = router;
