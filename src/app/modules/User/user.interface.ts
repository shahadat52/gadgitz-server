export type TUser = {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'admin' | 'user';
    address: string;
}

export type TAuthUser = {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
};