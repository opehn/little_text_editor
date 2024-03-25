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

export const getOneNote: RequestHandler = async (req, res, next) => {
    try {
        const noteId = parseInt(req.params.id);
        const result = await noteModel.getOneNoteById(noteId);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
}

export const updateNote: RequestHandler = async (req, res, next) => {
    try {
        const noteId = parseInt(req.params.id);
        const { title, content } = req.body;

        await noteModel.updateNote(noteId, title, content);
        res.status(200).json({ message: "노트가 성공적으로 수정되었습니다." })

    } catch (e) {
        res.status(500);
    }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
    try {
        const noteId = parseInt(req.params.id);
        await noteModel.deleteNote(noteId);
        res.status(200).json({ message: "노트가 성공적으로 삭제되었습니다." })
    } catch (e) {
        res.status(500);
    }
}