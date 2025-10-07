import apiClient from './client';

export interface TextToVoiceResponse {
  message: string;
  ttsUrl: string;
}

export const voiceApi = {
  textToVoice: async (text: string) => {
    const response = await apiClient.post<TextToVoiceResponse>('/auth/voice/text-to-voice', { text });
    return response.data;
  },

  imageToVoice: async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await apiClient.post<TextToVoiceResponse>('/auth/voice/text-to-voice', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
