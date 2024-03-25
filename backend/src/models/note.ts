import createConnection from "../utils/mysql";
import User from "../models/user"
import { Note } from "../types"

async function selectNoteByUserId(userId: number): Promise<Note[]> {
    const conn = await createConnection();
    try {
        const sql: string = `SELECT id, title, content, created_at, updated_at 
        FROM notes WHERE user_id = ? `;
        const result = await conn.query(sql, [userId]);
        let res: Note[] = result[0] as Note[];
        console.log(res);
        return res;
    } catch (e) {
        throw e;
    } finally {
        conn.end();
    }
}

async function createNote(userId: number, title: string, content: string): Promise<void> {
    const conn = await createConnection();
    try {
        const sql: string = `INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)`;
        const values = [title, content, userId];
        let result = await conn.query(sql, values);
        console.log(result);
        return;
    } catch (e) {
        throw e;
    } finally {
        conn.end();
    }
}

export default { selectNoteByUserId, createNote };