import createConnection from "../utils/mysql";
import bcrypt from 'bcrypt';
const salt = 10;

async function selectUserByEmail(email: string): Promise<any> {
    const conn = await createConnection();
    try {
        const sql: string = 'SELECT `id`, `encrypted_password` FROM `users` WHERE `email` = ?';
        const result = await conn.query(sql, [email]);
        return result;
    } catch (e) {
        throw e;
    } finally {
        await conn.end();
    }
}

async function createUser(email: string, password: string): Promise<void> {
    const conn = await createConnection();
    try {
        const encryptedPassword = await bcrypt.hash(password, salt);
        const sql: string = 'INSERT INTO `users` (`email`, `encrypted_password`) VALUES (?, ?) '
        let values = [email, encryptedPassword];
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
        const foundUser = await selectUserByEmail(email);

        if (!foundUser)
            return (false);

        return await bcrypt.compare(password, foundUser[0][0].encrypted_password);
    } catch (e) {
        throw e;
    }
}

export default { createUser, validateUser }