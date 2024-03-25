import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/user'

function makeCookieOpt(): { sameSite: "lax" | "none" | "strict"; secure: boolean } {
    let sameSite: "lax" | "none" | "strict";
    let secure: boolean;

    if (process.env.NODE_ENV === 'development') {
        sameSite = 'lax';
        secure = false;
    } else {
        sameSite = 'none';
        secure = true;
    }
    return { sameSite, secure };
}

function isQueryError(e: any) {
    return e && e.code;
}

const login: RequestHandler = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        const secretKey = process.env.JWT_SECRET || 'defaultSercretKey';
        if (await User.validateUser(email, password)) {
            const userId = await User.getUserIdByEmail(email)
            const accessToken = jwt.sign({ userId: userId }, secretKey, { expiresIn: '14d' });
            res.cookie('access-token', accessToken, makeCookieOpt());
            res.status(204).json({ message: '로그인에 성공했습니다' });
        }
    } catch (e) {
        console.log(e)
        res.status(500);
    }
}

const join: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        await User.createUser(email, password);
    } catch (e: any) {
        if (isQueryError(e) && e.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: '중복된 이메일입니다' });
        }
        throw e;
    }
    res.status(201).json({ message: '회원가입에 성공했습니다' });
}

const logout: RequestHandler = async (req, res, next) => {
    res.clearCookie('access-token');
    res.status(200).json({ message: '로그아웃 되었습니다' });
}

export { login, join, logout };