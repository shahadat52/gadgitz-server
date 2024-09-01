
export type TLoginUser = {
  email: string;
  password: string;
};

export type TJwtUser = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}


