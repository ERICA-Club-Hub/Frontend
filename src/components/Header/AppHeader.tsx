import { useRef } from 'react';
import HeaderMenuIcon from '@/assets/common/header-menu.svg?react';
import HomeIcon from '@/assets/common/home-icon.svg?react';
import ClosedBtn from '@/assets/common/closed-btn.svg?react';
import { Link } from 'react-router-dom';
import { useClickOutside } from '@/hooks/useClickOutside';
import useToggle from '@/hooks/useToggle';
import Logo from '@/assets/common/header-logo.svg?react';
import LogoText from '@/assets/common/hanjari.svg?react';
import NavigationDrawer from './NavigationDrawer';

function AppHeader() {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { isOpen, setIsOpen, toggle } = useToggle();

    useClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <>
            <header className="fixed top-0 left-1/2 -translate-x-1/2 flex justify-between items-center w-full min-w-[360px] max-w-[600px] min-h-[55px] px-[20px] bg-white cursor-pointer z-[100]">
                <Link to="/" className="flex items-center gap-[7px]">
                    <Logo />
                    <LogoText />
                </Link>

                {isOpen ? (
                    <button
                        type="button"
                        aria-label="메뉴 닫기"
                        onClick={toggle}
                        className="flex items-center justify-center cursor-pointer"
                    >
                        <ClosedBtn width="24" height="24" />
                    </button>
                ) : (
                    <div className="flex items-center gap-[10px]">
                        <Link to="/">
                            <HomeIcon />
                        </Link>
                        <button
                            type="button"
                            aria-label="메뉴 열기"
                            onClick={toggle}
                            className="cursor-pointer pt-[1px]"
                        >
                            <HeaderMenuIcon />
                        </button>
                    </div>
                )}

                {/* 드롭다운 매뉴 */}
                <NavigationDrawer
                    isOpen={isOpen}
                    toggle={toggle}
                    setIsOpen={setIsOpen}
                    dropdownRef={dropdownRef}
                />
            </header>
        </>
    );
}

export { AppHeader };
