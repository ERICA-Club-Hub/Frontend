import { useRef } from 'react';
import styled from 'styled-components';
import HeaderMenuIcon from '@/assets/common/header-menu.svg?react';
import HomeIcon from '@/assets/common/home-icon.svg?react';
import ClosedBtn from '@/assets/common/closed-btn.svg?react';
import NavigateArrow from '@/assets/common/navigate-arrow.svg?react';
import { Link } from 'react-router-dom';
import { ArrowLinkButton } from './ArrowLinkButton';
import { isAuthenticatedSelector } from '@/store/authState';
import { useRecoilValue } from 'recoil';
import { useClickOutside } from '@/hooks/actions/useClickOutside';
import useToggle from '@/hooks/actions/useToggle';
import { filterHeaderMenus } from '@/utils/filterHeaderMenus';
import { useAuthToggle } from '@/hooks/auth/useAuthToggle';
import Logo from '@/assets/common/header-logo.svg?react';
import LogoText from '@/assets/common/hanjari.svg?react';

const HeaderMenu = () => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { isOpen, setIsOpen, toggle } = useToggle();
    const isAuthenticatedValue = useRecoilValue(isAuthenticatedSelector); // 로그인 여부
    const toggleAuthentication = useAuthToggle(setIsOpen); // 로그인 & 로그아웃 로직
    const filteredMenus = filterHeaderMenus(); // 어드민 유형에 따라 필터링된 메뉴

    useClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <>
            <Container>
                <LogoWrapper>
                    <Logo />
                    <LogoText />
                </LogoWrapper>
                {isOpen ? (
                    <ClosedBtn width="24" height="24" onClick={toggle} />
                ) : (
                    <IconWrapper>
                        <Link to="/">
                            <HomeIcon />
                        </Link>
                        <HeaderMenuIconWrapper>
                            <HeaderMenuIcon onClick={toggle} />
                        </HeaderMenuIconWrapper>
                    </IconWrapper>
                )}

                {/* 드롭다운 매뉴 */}
                <DropdownNavigator ref={dropdownRef} $isOpen={isOpen}>
                    <LoginButton onClick={toggleAuthentication}>
                        <h2>
                            {isAuthenticatedValue
                                ? '어드민 로그아웃'
                                : '어드민 로그인'}
                        </h2>
                        <NavigateArrow />
                    </LoginButton>
                    <MenuList>
                        {filteredMenus.map((menu, index) => (
                            <MenuItem
                                key={`navigate-menu-${index}`}
                                onClick={toggle}
                            >
                                <ArrowLinkButton url={menu.url} size="small">
                                    {menu.title}
                                </ArrowLinkButton>
                            </MenuItem>
                        ))}
                    </MenuList>
                </DropdownNavigator>
            </Container>
        </>
    );
};

export { HeaderMenu };

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

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const HeaderMenuIconWrapper = styled.div`
    cursor: pointer;
    padding-top: 1px; // 홈 아이콘이랑 수평 맞추기 위한 padding
`;

const DropdownNavigator = styled.div<{ $isOpen: boolean }>`
    position: absolute;
    top: 55px;
    right: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: ${({ $isOpen }) => ($isOpen ? 'auto' : '0')};
    padding: ${({ $isOpen }) => ($isOpen ? '20px 0 30px 0' : '0 36px')};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    background-color: ${(prop) => prop.theme.colors.white};
    overflow: hidden;
    transition: ${({ $isOpen }) => ($isOpen ? 'all 0.3s ease-in-out' : 'none')};
    box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const LoginButton = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    width: 288px;
    margin-bottom: 30px;
    cursor: pointer;

    h2 {
        font-size: 16px;
        font-weight: 600;
        color: ${(props) => props.theme.colors.black};
    }
`;

const MenuList = styled.ul`
    width: 288px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    cursor: pointer;
`;

const MenuItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 17px;
    cursor: pointer;

    h3 {
        font-size: 14px;
        font-weight: 500;
        color: ${(props) => props.theme.colors.black};
    }
`;
