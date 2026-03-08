export type Role = "Coach" | "user" | "Admin";

export interface UserSession {
    login: boolean;
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        phone?: string
        role: Role;
<<<<<<< Updated upstream
        orders?: [] ;
=======
        orders?: unknown[];
>>>>>>> Stashed changes
        isProfileComplete: boolean;
        profileImg?: string;
    } ;

}
