import { BrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/components/Common';
import AppRoutes from './routes/Routes';
import { useSplash } from './hooks/actions/useSplash';
import SplashScreen from './pages/splash/SplashScreen';

function App() {
    const { isSplashVisible } = useSplash();

    return (
        <>
            <BrowserRouter>
                {isSplashVisible ? (
                    <SplashScreen />
                ) : (
                    <RootLayout>
                        <AppRoutes />
                    </RootLayout>
                )}
            </BrowserRouter>
        </>
    );
}

export default App;
