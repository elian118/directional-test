export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export const initLoginResponse: LoginResponse = {
  token: '',
  user: {
    id: '',
    email: '',
  },
};
