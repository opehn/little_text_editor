export { };

interface UserToken {
    userId: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserToken;
        }
    }
}

export interface Note {
    id: number;
    title: string;
    created_at: Date;
    updated_at: Date;
}

export interface NoteDetail {
    id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}