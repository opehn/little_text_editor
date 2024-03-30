import express = require('express');
const router = express.Router();
import { login, join, logout, healthCheck } from './users_handler'

router.post('/login', login);

router.get('/logout', logout);

//회원가입
router.post('/users', join);

router.get('/users/me', [],);
router.get('/healthcheck', healthCheck);

export default router;
