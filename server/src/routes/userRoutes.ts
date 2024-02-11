const express = require('express')
const { getUser, toggleDarkMode, toggleNotifications, updateProfileImage, getAllUsers, getFavoriteUsers, addFavorite, removeFavorite } = require('../controllers/userController')
const router = express.Router();

router.get('/users', getAllUsers)
router.post('/:userId/favorites/add', addFavorite)
router.delete('/:userId/favorites/remove', removeFavorite)
router.get('/:userId', getUser)
router.patch('/:userId/dark-mode', toggleDarkMode)
router.patch('/:userId/notifications', toggleNotifications)
router.patch('/:userId/profile-image', updateProfileImage)
router.get('/:userId/favorites', getFavoriteUsers)

module.exports = router