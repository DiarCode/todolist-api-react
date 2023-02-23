export interface IUser {
  id: number;
  email: string;
  name: string;
  avatar: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup {
  name: string;
  email: string;
  password: string;
}
