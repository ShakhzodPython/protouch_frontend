import { refreshAccessToken } from '../service/authService';

let refreshInterval: ReturnType<typeof setInterval> | null = null;

export const startTokenRefresh = async (): Promise<void> => {
  if (refreshInterval) return;

  try {
    await refreshAccessToken();
  } catch (error) {
    console.error('Initial refresh failed:', error);
    return;
  }

  refreshInterval = setInterval(async () => {
    try {
      await refreshAccessToken();
    } catch (error) {
      console.error('Failed auto-refresh:', error);
      stopTokenRefresh();
    }
  }, 56 * 60 * 1000); // 56 minutes
};

export const stopTokenRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
};
