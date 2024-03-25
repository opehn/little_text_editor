import express = require('express');
const router = express.Router();
import { authenticateUser } from '../middlewares/authentication';
import { getNote, getOneNote, createNote, updateNote, deleteNote } from './notes_handler';

router.get('/', [authenticateUser], getNote);

router.get('/:id', getOneNote);

router.post('/', [authenticateUser], createNote);

router.put('/:id', updateNote);

router.delete('/:id', deleteNote);

export default router;