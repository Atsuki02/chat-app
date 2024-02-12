

import { User } from '@prisma/client';
import { Request, Response } from 'express';
const { findUserById, toggleDarkMode, toggleNotifications, updateUserProfileImage, findAllUsers, findFavoriteUsers, addFavorite, removeFavorite, findUserChatRooms, findPinnedChatRoomsByUser, findChatRoomByIdAndUserId, createDirectMessageChatRoom, createChatRoomWithMembers, createMessage } = require('../models/userModel')

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

exports.getUserChatRooms = async (req: Request, res: Response) => {
    const userId = req.params.userId; 
    try {
        const memberships = await findUserChatRooms(userId);
        const chatRooms = memberships.map((membership: any) => {
            const isPinned = membership.chatRoom.pinnedByUsers.some((pinned: any) => pinned.userId === userId);
            let partnerUserInfo = null;
           
            if (membership.chatRoom.isDirectMessage) {
                const partnerMembership = membership.chatRoom.chatRoomMembership.find((m: any) => m.userId !== userId);
                partnerUserInfo = partnerMembership ? partnerMembership.user : null;
            }
            return {
                ...membership.chatRoom,
                isPinned,
                partnerUserInfo,
            };
        });
        res.json(chatRooms);
    } catch (error) {
        console.error("Error fetching user's chat rooms:", error);
        res.status(500).json({ error: "Failed to fetch user's chat rooms." });
    }
};
exports.getPinnedChatRoomsByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const pinnedChatRooms = await findPinnedChatRoomsByUser(userId);
      res.json(pinnedChatRooms);
    } catch (error) {
      console.error("Error fetching pinned chat rooms:", error);
      res.status(500).json({ error: "Failed to fetch pinned chat rooms." });
    }
};

exports.getChatRoomByIdAndUserId = async (req: Request, res: Response) => {
    const { userId, chatRoomId } = req.params; 

    console.log(userId, chatRoomId)
    try {
        const chatRoom = await findChatRoomByIdAndUserId(userId, chatRoomId);

        if (!chatRoom) {
            return res.status(404).json({ message: 'Chat room not found' });
        }

        res.json(chatRoom);
    } catch (error) {
        console.error('Failed to fetch chat room:', error);
        res.status(500).json({ message: 'Failed to fetch chat room' });
    }
};

exports.createDirectMessageChatRoom = async (req: Request, res: Response)  => {
    const { userId1, userId2 } = req.body;
  
    try {
      const room = await createDirectMessageChatRoom(userId1, userId2);
      res.json(room);
    } catch (error) {
      console.error('Error creating direct message chat room:', error);
      res.status(500).json({ error: 'Failed to create direct message chat room.' });
    }
}


exports.createChatRoomWithMembers = async (req: Request, res: Response) => {
  const { name, members, chatRoomImageUrl } = req.body;

  if (!name || members.length === 0) {
    return res.status(400).json({ error: 'Name and members are required' });
  }

  try {
    const room = await createChatRoomWithMembers(name, members, chatRoomImageUrl);
    res.json(room);
  } catch (error) {
    console.error('Error creating chat room with members:', error);
    res.status(500).json({ error: 'Failed to create chat room with members.' });
  }
};

exports.createMessage = async (req: Request, res: Response) => {
  const { content, userId, chatRoomId } = req.body;

  try {
    const message = await createMessage(content, userId, chatRoomId)
    res.json(message);
  } catch (error) {
    console.error("Failed to create message:", error);
    res.status(500).json({ error: "Failed to create message." });
  }
};

