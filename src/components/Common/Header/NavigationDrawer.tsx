import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import NavigateArrow from '@/assets/common/navigate-arrow.svg?react';
import { isAuthenticatedSelector } from '@/store/authState';
import { filterHeaderMenus } from '@/utils/filterHeaderMenus';
import { useAuthToggle } from '@/hooks/auth/useAuthToggle';
import { NavigationLink } from '../NavigationLink';

interface NavigationDrawerProps {
    isOpen: boolean;
    toggle: () => void;
    setIsOpen: (isOpen: boolean) => void;
    dropdownRef: React.RefObject<HTMLDivElement>;
}

export default function NavigationDrawer({
    isOpen,
    toggle,
    setIsOpen,
    dropdownRef,
}: NavigationDrawerProps) {
    const isAuthenticatedValue = useRecoilValue(isAuthenticatedSelector); // 로그인 여부
    const { toggleAuthentication } = useAuthToggle(); // 로그인 & 로그아웃 로직
    const filteredMenus = filterHeaderMenus(); // 어드민 유형에 따라 필터링된 메뉴

    const handleToggleAuthBtn = () => {
        toggleAuthentication();
        setIsOpen(false);
    };

    return (
        <Container ref={dropdownRef} $isOpen={isOpen}>
            <LoginButton onClick={handleToggleAuthBtn}>
                <h2>
                    {isAuthenticatedValue ? '어드민 로그아웃' : '어드민 로그인'}
                </h2>
                <NavigateArrow />
            </LoginButton>
            <MenuList>
                {filteredMenus.map((menu, index) => (
                    <MenuItem key={`navigate-menu-${index}`} onClick={toggle}>
                        <NavigationLink url={menu.url} size="small">
                            {menu.title}
                        </NavigationLink>
                    </MenuItem>
                ))}
            </MenuList>
        </Container>
    );
}

const Container = styled.div<{ $isOpen: boolean }>`
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
