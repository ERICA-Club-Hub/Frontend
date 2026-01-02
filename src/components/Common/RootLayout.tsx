import { ReactNode } from 'react';
import { AppHeader } from './Header/AppHeader';

function RootLayout({ children }: { children: ReactNode }) {
    return (
        <main className="min-w-[360px] max-w-[600px] min-h-screen pt-[55px] mx-auto bg-background-default">
            <AppHeader />
            {children}
        </main>
    );
}

export { RootLayout };
