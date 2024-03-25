import createConnection from "../utils/mysql";
import bcrypt from 'bcrypt';
const salt = 10;

interface User {
    id: number;
    encrypted_password: string;
}

async function selectUserByEmail(email: string): Promise<User | undefined> {
    const conn = await createConnection();
    try {
        const sql: string = 'SELECT `id`, `encrypted_password` FROM `users` WHERE `email` = ?';
        const result: any = await conn.query(sql, [email]);
        const foundUser = result[0][0];
        if (foundUser) {
            const user: User = {
                id: foundUser.id,
                encrypted_password: foundUser.encrypted_password
            }
            return user;
        }
        else {
            return undefined;
        }
    } catch (e) {
        throw e;
    } finally {
        await conn.end();
    }
}

async function getUserIdByEmail(email: string): Promise<number | undefined> {
    const result = await selectUserByEmail(email);
    if (result)
        return result.id;
    else
        return undefined;
}

async function getUserPasswordByEmail(email: string): Promise<string | undefined> {
    const result = await selectUserByEmail(email);
    if (result)
        return result.encrypted_password;
    else
        return undefined;
}

async function createUser(email: string, password: string): Promise<void> {
    const conn = await createConnection();
    try {
        const encryptedPassword = await bcrypt.hash(password, salt);
        const sql: string = 'INSERT INTO `users` (`email`, `encrypted_password`) VALUES (?, ?) '
        const values = [email, encryptedPassword];
        await conn.query(sql, values);
        return;
    } catch (e) {
        throw e;
    } finally {
        await conn.end();
    }
}

async function validateUser(email: string, password: string): Promise<boolean> {
    try {
        const encrypted_password = await getUserPasswordByEmail(email)

        if (!encrypted_password)
            return (false);

        return await bcrypt.compare(password, encrypted_password);
    } catch (e) {
        throw e;
    }
}

export default { createUser, validateUser, getUserIdByEmail, getUserPasswordByEmail }