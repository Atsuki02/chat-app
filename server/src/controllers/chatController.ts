import { Request, Response } from 'express';
const { findChatRoomById } = require('../models/chatModel')

exports.getChatRoomById = async (req: Request, res: Response)  => {
    const  chatRoomId  = req.params.chatRoomId; 

    try {
        const chatRoom = await findChatRoomById(chatRoomId)

        if (!chatRoom) {
            return res.status(404).json({ message: 'Chat room not found' });
        }

        res.json(chatRoom);
    } catch (error) {
        console.error('Failed to fetch chat room:', error);
        res.status(500).json({ message: 'Failed to fetch chat room' });
    }
};



