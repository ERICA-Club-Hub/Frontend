import { BrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/components/Common';
import AppRoutes from './routes/Routes';

function App() {
    return (
        <>
            <BrowserRouter>
                <RootLayout>
                    <AppRoutes />
                </RootLayout>
            </BrowserRouter>
        </>
    );
}

export default App;
