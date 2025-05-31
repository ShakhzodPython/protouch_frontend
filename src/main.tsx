import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';
import './i18n/i18n.ts';
import App from './App.tsx';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { CartProvider } from './providers/CartProvider.tsx';
import { FavoriteProvider } from './providers/FavoriteProvider.tsx';
import { CLIENT_ID } from './utils/index.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // Store fetched data in cache 24 hours
      refetchOnReconnect: true,
      retry: 3,
    },
  },
});

// Store fetched data in local
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: persister,
});

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartProvider>
              <FavoriteProvider>
                <App />
              </FavoriteProvider>
            </CartProvider>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </StrictMode>
  </BrowserRouter>
);
