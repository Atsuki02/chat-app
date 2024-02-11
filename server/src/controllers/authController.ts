import { Request, Response } from 'express';
const bcrypt = require("bcrypt");
const { createUser, findUserByEmail, createSession, findSessionById, findUserById, deleteUserById, deleteSessionById  } = require('../models/userModel');

exports.register = async (req: Request, res: Response) => {
    const { email, password, username} = req.body;

    if (!password) {
        return res.status(400).json({ error: "Password is required." });
    }
    
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return res.status(409).json({ error: "Email is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const newUser = await createUser({
            email, username, passwordHash: hashedPassword
        })

        const session = await createSession(newUser.id);

        res.status(201).json( {id: newUser.id, email: newUser.email, username: newUser.username, sessionId: session.id} )
    } catch (error) {
        res.status(400).json({ error: "Failed to register a new user." });
      }
}

exports.login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email)
        if(!user) {
            return res.status(401).json({error: 'Failed to authenticate. '})
        }

        const isValid = await bcrypt.compare(password, user.passwordHash)
        if(!isValid) {
            return res.status(401).json({error: 'Failed to authenticate. '})
        }

        const session = await createSession(user.id);

        res.status(201).json( {id: user.id, email: user.email, username: user.username, sessionId: session.id} )
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to log in. '})
    }
}

exports.validateSession = async (req: Request, res: Response) => {
    const sessionId = req.headers['session-id'] || req.cookies['sessionId'];
    
    if (!sessionId) {
        return res.status(401).json({ error: "No session ID provided." });
    }

    try {
        const session = await findSessionById(sessionId);
        if (!session) {
            return res.status(401).json({ error: "Invalid session ID." });
        }

        const user = await findUserById(session.userId);
        res.json({ user: { id: user.id, email: user.email, username: user.username } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

exports.deleteAccount = async (req: Request, res: Response) => {
    const userId = req.params.userId; 
    console.log(userId)

    try {
        await deleteUserById(userId);
        res.status(200).json({ message: "User account successfully deleted." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete the account.' });
    }
};

exports.logout = async (req: Request, res: Response) => {
    const sessionId = req.headers['session-id'] || req.cookies['sessionId'];
    
    if (!sessionId) {
        return res.status(400).json({ error: "Session ID is required for logout." });
    }

    try {
        await deleteSessionById(sessionId);
        res.status(200).json({ message: "Successfully logged out." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to log out.' });
    }
};