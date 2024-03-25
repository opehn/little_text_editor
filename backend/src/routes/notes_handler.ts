import { RequestHandler } from 'express';
import noteModel from '../models/note';
import { Note } from '../types';


export const getNote: RequestHandler = async (req, res, next) => {
    try {
        if (!req.user)
            return;
        const userId: number = req.user.userId;
        const result: Note[] = await noteModel.selectNoteByUserId(userId as number);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
    }
}

export const createNote: RequestHandler = async (req, res, next) => {
    try {
        if (!req.user)
            return;
        const { title, content } = req.body;
        const userId: number = req.user.userId;
        await noteModel.createNote(userId, title, content);
        res.status(201).json({ message: 'Success' });
    } catch (e) {
        console.log(e)
        res.status(500);
    }
}
