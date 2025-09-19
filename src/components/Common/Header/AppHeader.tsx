import { useRef } from 'react';
import styled from 'styled-components';
import HeaderMenuIcon from '@/assets/common/header-menu.svg?react';
import HomeIcon from '@/assets/common/home-icon.svg?react';
import ClosedBtn from '@/assets/common/closed-btn.svg?react';
import { Link } from 'react-router-dom';
import { useClickOutside } from '@/hooks/actions/useClickOutside';
import useToggle from '@/hooks/actions/useToggle';
import Logo from '@/assets/common/header-logo.svg?react';
import LogoText from '@/assets/common/hanjari.svg?react';
import NavigationDrawer from './NavigationDrawer';

function AppHeader() {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { isOpen, setIsOpen, toggle } = useToggle();

    useClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <>
            <Container>
                <LogoWrapper to="/">
                    <Logo />
                    <LogoText />
                </LogoWrapper>

                {isOpen ? (
                    <ClosedButton
                        type="button"
                        aria-label="메뉴 닫기"
                        onClick={toggle}
                    >
                        <ClosedBtn width="24" height="24" />
                    </ClosedButton>
                ) : (
                    <IconWrapper>
                        <Link to="/">
                            <HomeIcon />
                        </Link>
                        <DrawerMenuButton
                            type="button"
                            aria-label="메뉴 열기"
                            onClick={toggle}
                        >
                            <HeaderMenuIcon />
                        </DrawerMenuButton>
                    </IconWrapper>
                )}

                {/* 드롭다운 매뉴 */}
                <NavigationDrawer
                    isOpen={isOpen}
                    toggle={toggle}
                    setIsOpen={setIsOpen}
                    dropdownRef={dropdownRef}
                />
            </Container>
        </>
    );
}

export { AppHeader };

const Container = styled.header`
    position: fixed;
    top: 0;
    left: 50%;
    margin: 0 auto;

    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-width: 360px;
    max-width: 600px;
    min-height: 55px;
    padding: 0 20px;

    background-color: ${(prop) => prop.theme.colors.white};
    cursor: pointer;
    z-index: 100;
`;

const LogoWrapper = styled(Link)`
    display: flex;
    align-items: center;
    gap: 7px;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ClosedButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const DrawerMenuButton = styled.button`
    cursor: pointer;
    padding-top: 1px; // 홈 아이콘이랑 수평 맞추기 위한 padding
`;
