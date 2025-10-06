import apiClient from './client';

export interface SignupData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    isVerified: boolean;
  };
}

export const authApi = {
  signup: async (data: SignupData) => {
    const response = await apiClient.post<{ message: string }>('/auth/signup', data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpData) => {
    const response = await apiClient.post<AuthResponse>('/auth/verify-otp', data);
    return response.data;
  },

  googleAuth: () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/google`;
  },
};
