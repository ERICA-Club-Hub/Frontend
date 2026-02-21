import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient.ts';
import Toast from './components/Toast/Toast.tsx';
import ModalContainer from './components/Modal/ModalContainer.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <ModalContainer />
                <App />
                <Toast />
            </RecoilRoot>
        </QueryClientProvider>
    </StrictMode>,
);
