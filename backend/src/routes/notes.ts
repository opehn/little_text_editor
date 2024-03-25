import express = require('express');
const router = express.Router();
import { authenticateUser } from '../middlewares/authentication';
import { getNote, createNote } from './notes_handler';

router.get('/', [authenticateUser], getNote);

router.get('/:id',);

router.post('/', [authenticateUser], createNote);

router.put('/:id');

router.delete(':id');

export default router;