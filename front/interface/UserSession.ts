
export interface UserSession {
    login: boolean;
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        phone?: string
        role: string;
        orders?: [];
    };

}