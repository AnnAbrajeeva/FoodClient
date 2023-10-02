export type UserRegister = {
    username: string;
    surname: string;
    email: string;
    login: string;
    password: string;
    hash?: string
}

export type UserLogin = {
    login: string;
    password: string;
}

export type AuthUserData = {
    username: string;
    surname: string;
    email: string;
    login: string;
    password: string
}