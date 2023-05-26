export interface ICredentials {
    email: string;
    password: string;
}

export interface ILoginForm {
    type: 'email' | 'password';
    placeholder: string;
}
