import express = require('express');
const router = express.Router();
import { login, join, logout } from './users_handler'

router.post('/login', login);

router.get('/logout', logout);

//회원가입
router.post('/users', join);

router.get('/users/me', [],);

export default router;
