import Logo from '@/assets/splash/logo.svg?react';
import LogoText from '@/assets/splash/logo-text.svg?react';

export default function SplashScreen() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-b from-[#0d2138] to-[#0f2948] animate-background-fade">
            <div className="flex flex-col items-center gap-[15px] animate-fade-in-slow">
                <Logo />
                <LogoText />
            </div>
        </div>
    );
}
