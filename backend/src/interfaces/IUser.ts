export interface IUser {
    id?: number;
    name: string;
    email: string;
    email_verified_at?: Date | null; 
    password: string;
    remember_token?: string | null; 
    phone: string;
    avatar: string;
    level: "admin" | "user"; 
}