import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderDropdownMenu from './HeaderDropdownMenu';
import Logo from '@/assets/logo/header-logo.svg?react';
import LogoText from '@/assets/common/hanjari.svg?react';
import HomeIcon from '@/assets/common/home.svg?react';
import { PATHS } from '@/routes/paths';
import NavigateArrow from '@/assets/common/navigate-arrow.svg?react';

function AppHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === PATHS.HOME;

    return (
        <header className="fixed top-0 left-1/2 -translate-x-1/2 flex justify-between items-center w-full min-w-[360px] max-w-[600px] min-h-[56px] px-[20px] bg-white cursor-pointer z-[100]">
            {isHomePage ? (
                <Link to="/" className="flex items-center gap-[4px]">
                    <Logo />
                    <LogoText />
                </Link>
            ) : (
                <button
                    onClick={() => navigate(-1)}
                    className="transform rotate-180 cursor-pointer"
                    aria-label="이전 페이지로 이도"
                >
                    <NavigateArrow width="28" height="28" />
                </button>
            )}

            {/* 드롭다운 매뉴 */}
            <div className="flex items-center gap-[4px]">
                {!isHomePage && (
                    <Link to={PATHS.HOME} className="flex items-center">
                        <HomeIcon />
                    </Link>
                )}
                <HeaderDropdownMenu />
            </div>
        </header>
    );
}

export { AppHeader };
