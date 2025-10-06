import apiClient from './client';

/**
 * Wake up the backend server (useful for free tier deployments that sleep)
 * Returns true if server is awake, false otherwise
 */
export const wakeUpServer = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health', {
      timeout: 60000, // 60 seconds for cold start
    });
    return response.status === 200;
  } catch (error) {
    console.error('Failed to wake up server:', error);
    return false;
  }
};

/**
 * Check if server is healthy
 */
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health', {
      timeout: 5000, // 5 seconds
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
