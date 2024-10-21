import { Request, Response } from 'express';
import { createUser, getAllUsers, updateUser, deleteUser } from '../services/userService';

export const createUserController = async (req: any, res: any) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const user = await createUser({ name, email, password });
        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

export const getAllUsersController = async (req: any, res: any) => {
    try {
        const { page = '1', limit = '10' } = req.query;

        const users = await getAllUsers(parseInt(page as string), parseInt(limit as string));
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

export const updateUserController = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const user = await updateUser(parseInt(id), { name, email, password });
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

export const deleteUserController = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        await deleteUser(parseInt(id));
        res.status(204).send();

    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};
