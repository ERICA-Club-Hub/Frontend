import { useRecoilValue } from 'recoil';
import NavigateArrow from '@/assets/common/navigate-arrow.svg?react';
import { isAuthenticatedSelector } from '@/domains/auth/model/authState';
import { useAuthToggle } from '@/domains/auth/model/useAuthToggle';
import { NavigationLink } from '../Link/NavigationLink';
import { useFilteredMenus } from '@/hooks/ui/useFilteredMenus';
import { cn } from '@/utils/cn';

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
    const filteredMenus = useFilteredMenus(); // 어드민 유형에 따라 필터링된 메뉴

    const handleToggleAuthBtn = () => {
        toggleAuthentication();
        setIsOpen(false);
    };

    return (
        <div
            ref={dropdownRef}
            className={cn(
                'absolute top-[55px] right-0 flex flex-col items-center w-full rounded-bl-[10px] rounded-br-[10px] bg-white overflow-hidden shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)]',
                isOpen
                    ? 'h-auto py-[20px] pb-[30px] transition-all duration-300 ease-in-out'
                    : 'h-0 px-[36px] py-0',
            )}
        >
            <button
                onClick={handleToggleAuthBtn}
                className="flex items-center gap-[5px] w-[288px] mb-[30px] cursor-pointer"
            >
                <h2 className="text-body-01 font-semibold text-black">
                    {isAuthenticatedValue ? '어드민 로그아웃' : '어드민 로그인'}
                </h2>
                <NavigateArrow />
            </button>
            <ul className="w-[288px] flex flex-col gap-[15px] cursor-pointer">
                {filteredMenus.map((menu, index) => (
                    <li
                        key={`navigate-menu-${index}`}
                        onClick={toggle}
                        className="flex justify-between items-center h-[17px] cursor-pointer"
                    >
                        <NavigationLink url={menu.url} size="small">
                            {menu.title}
                        </NavigationLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
