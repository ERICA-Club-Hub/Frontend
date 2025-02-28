import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/queryClient.ts';
import { theme } from './config/theme.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </RecoilRoot>
        </QueryClientProvider>
    </StrictMode>,
);
