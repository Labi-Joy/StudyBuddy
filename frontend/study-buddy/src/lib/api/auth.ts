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
    // Prefer /auth/signup; fallback to /auth/register on 404
    try {
      const response = await apiClient.post<AuthResponse>('/auth/signup', data);
      return response.data as any;
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 404) {
        const response = await apiClient.post<AuthResponse>('/auth/register', data);
        return response.data as any;
      }
      throw err;
    }
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
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'https://backend-studybuddy.onrender.com/api'}/auth/google`;
  },
};
