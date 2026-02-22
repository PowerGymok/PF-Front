export type Role = "coach" | "user" | "admin";

export interface UserSession {
    login: boolean;
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        phone?: string
        role: Role;
        orders?: [];
    };

}
