import { useRef } from 'react';
import styled from 'styled-components';
import HeaderMenuLogo from '@/assets/common/header-menu.svg?react';
import HomeIcon from '@/assets/common/home-icon.svg?react';
import ClosedBtn from '@/assets/common/closed-btn.svg?react';
import NavigateArrow from '@/assets/common/navigate-arrow.svg?react';
import { Link, useNavigate } from 'react-router-dom';
import { navigations } from '@/constants';
import { ArrowLinkButton } from './ArrowLinkButton';
import { isAuthenticatedSelector } from '@/store/authState';
import { useRecoilValue } from 'recoil';
import { apiRequest } from '@/api/apiRequest';
import { useClickOutside } from '@/hooks/useClickOutside';
import useToggle from '@/hooks/useToggle';

const HeaderMenu = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { isOpen, setIsOpen, toggle } = useToggle();
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

    useClickOutside(dropdownRef, () => setIsOpen(false));

    const handleAuthClick = () => {
        if (isAuthenticated) {
            // 로그아웃
            apiRequest({ url: '/api/auth/logout', method: 'post' });
            navigate('/');
        } else {
            // 로그인
            navigate('/admin/login');
        }
        setIsOpen(false);
    };

    return (
        <>
            <Container>
                <div>로고</div>
                {isOpen ? (
                    <ClosedBtn width="24" height="24" onClick={toggle} />
                ) : (
                    <IconWrapper>
                        <Link to="/">
                            <HomeIcon />
                        </Link>
                        <HeaderMenuLogo onClick={toggle} />
                    </IconWrapper>
                )}

                {/* 드롭다운 매뉴 */}
                <DropdownNavigator ref={dropdownRef} $isOpen={isOpen}>
                    <LoginButton onClick={handleAuthClick}>
                        <h2>
                            {isAuthenticated
                                ? '어드민 로그아웃'
                                : '어드민 로그인'}
                        </h2>
                        <NavigateArrow />
                    </LoginButton>
                    <MenuList>
                        {navigations.map((menu, index) => (
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
    position: relative;
    top: 0;
    left: 50%;
    margin: 0 auto;

    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-width: 360px;
    max-width: 400px;
    height: 55px;
    padding: 0 20px;

    background-color: ${(prop) => prop.theme.colors.white};
    cursor: pointer;
    z-index: 100;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
`;

const DropdownNavigator = styled.div<{ $isOpen: boolean }>`
    position: absolute;
    top: 55px;
    right: 0px;
    width: 100%;
    height: ${({ $isOpen }) => ($isOpen ? '212px' : '0')};
    padding: ${({ $isOpen }) => ($isOpen ? '20px 36px 30px' : '0 36px')};
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
