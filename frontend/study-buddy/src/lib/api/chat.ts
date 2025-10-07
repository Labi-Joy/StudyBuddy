import apiClient from './client';

export interface ChatResponse {
  reply: string;
}

export const chatApi = {
  sendMessage: async (message: string) => {
    const response = await apiClient.post<ChatResponse>('/auth/chat/chat', { message });
    return response.data;
  },
};
