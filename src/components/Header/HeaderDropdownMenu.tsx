import { useRecoilValue } from 'recoil';
import { isAuthenticatedSelector } from '@/domains/auth/model/auth.atom';
import { useAuthToggle } from '@/domains/auth/model/useAuthToggle';
import { useFilteredMenus } from '@/components/Header/useFilteredMenus';
import { cn } from '@/utils/cn';
import createDropdown from '../Dropdown/Dropdown';
import HeaderMenuIcon from '@/assets/common/header-menu.svg?react';
import ClosedBtn from '@/assets/common/close.svg?react';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { PATHS } from '@/routes/paths';

interface DropdownItemType {
    label: string;
    url?: string;
    onClick?: () => void;
}

const Dropdown = createDropdown<DropdownItemType>();

export default function HeaderDropdownMenu() {
    const location = useLocation();
    const isAuthenticatedValue = useRecoilValue(isAuthenticatedSelector); // 로그인 여부
    const { toggleAuthentication } = useAuthToggle(); // 로그인 & 로그아웃 로직
    const filteredMenus = useFilteredMenus(); // 어드민 유형에 따라 필터링된 메뉴

    const allMenuItems: DropdownItemType[] = useMemo(() => {
        const menus = filteredMenus.map((menu) => ({
            label: menu.label,
            url: menu.url,
        }));

        const authMenu = {
            label: isAuthenticatedValue ? '어드민 로그아웃' : '어드민 로그인',
            onClick: toggleAuthentication,
            url: isAuthenticatedValue ? undefined : PATHS.ADMIN_LOGIN,
        };

        return [...menus, authMenu];
    }, [filteredMenus, isAuthenticatedValue, toggleAuthentication]);

    return (
        <Dropdown.Container
            itemOptions={allMenuItems}
            className={cn('h-[28px]')}
        >
            <Dropdown.Trigger className="cursor-pointer">
                {({ isOpen }) => (isOpen ? <ClosedBtn /> : <HeaderMenuIcon />)}
            </Dropdown.Trigger>
            <Dropdown.List
                className={cn(
                    'top-[44px] right-0 flex flex-col gap-[6px] min-w-full w-max py-[8px] px-[10px] rounded-[12px]',
                    'divide-y divide-neutral-100 bg-neutral-00 shadow-dropdown',
                )}
            >
                {allMenuItems.map((item, idx) => {
                    const isActive = item.url === location.pathname;

                    const Component: React.ElementType = item.url
                        ? Link
                        : 'button';
                    const props = item.url
                        ? { to: item.url }
                        : {
                              type: 'button' as const,
                          };

                    return (
                        <Dropdown.Item
                            key={item.label}
                            index={idx}
                            onClick={item?.onClick}
                            className={cn(
                                'flex justify-center pb-[4px] last:pb-0 cursor-pointer',
                            )}
                        >
                            <Component
                                className={cn(
                                    'flex justify-center items-center w-full h-full min-h-[36px] py-[6px] px-[8px] cursor-pointer',
                                    isActive && 'bg-neutral-100 rounded-[8px]',
                                )}
                                {...props}
                            >
                                <span
                                    className={cn(
                                        isActive ? 'text-b2' : 'text-b1',
                                    )}
                                >
                                    {item.label}
                                </span>
                            </Component>
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.List>
        </Dropdown.Container>
    );
}
