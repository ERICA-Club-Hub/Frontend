import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from 'styled-components';
import { theme } from './config/theme.ts';
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </RecoilRoot>
    </StrictMode>,
);
