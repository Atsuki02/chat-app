
import { User } from '@prisma/client';
import { Request, Response } from 'express';
const { findUserById, toggleDarkMode, toggleNotifications, updateUserProfileImage, findAllUsers, findFavoriteUsers, addFavorite, removeFavorite } = require('../models/userModel')

exports.getUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const user = await findUserById(userId);
        if (user) {
            res.json(user);
          } else {
            res.status(404).send({ error: 'User not found' });
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          res.status(500).send({ error: 'Internal server error' });
    }
};


exports.toggleDarkMode = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { darkMode } = req.body;
  
    try {
      const updatedUser = await toggleDarkMode(userId, darkMode);
      res.json({ message: 'Dark mode updated successfully', updatedUser });
    } catch (error) {
      console.error('Error updating dark mode:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
};

exports.toggleNotifications = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { notifications } = req.body;
  
    try {
      const updatedUser = await toggleNotifications(userId, notifications);
      res.json({ message: 'Notifications updated successfully', updatedUser });
    } catch (error) {
      console.error('Error updating Notifications:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
};

exports.updateProfileImage = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { imageUrl } = req.body; 
  
    try {
      const updatedUser = await updateUserProfileImage(userId, imageUrl);
      res.json({ message: 'Profile image updated successfully', updatedUser });
    } catch (error) {
      console.error('Error updating profile image:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
};

exports.getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await findAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

exports.getFavoriteUsers = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    
    try {
        const favoriteUsers = await findFavoriteUsers(userId)
        res.json(favoriteUsers.map((favorite: { favoriteUser: User }) => favorite.favoriteUser));
    } catch (error) {
        console.error("Failed to get favorite users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.addFavorite = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { favoriteUserId } = req.body;
    try {
      const favorite = await addFavorite(userId, favoriteUserId)
      res.json(favorite);
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ error: "Failed to add favorite user." });
    }
};

exports.removeFavorite = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { favoriteUserId } = req.body;
    try {
      const favorite = await removeFavorite(userId, favoriteUserId)
      res.json(favorite);
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ error: "Failed to add favorite user." });
    }
};