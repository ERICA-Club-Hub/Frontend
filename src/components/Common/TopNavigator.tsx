import { cn } from '@/utils/cn';

interface NavItem {
    id: number;
    nav: string;
}

interface TopNavigatorProps {
    navList: NavItem[];
    navStatus: number;
    onClick: (id: number) => void;
}

export const TopNavigator = ({
    navList,
    navStatus,
    onClick,
}: TopNavigatorProps) => {
    return (
        <div className="w-[320px] border-b border-[#eaeaea]">
            <ul className="flex justify-around">
                {navList.map((nav) => {
                    const isActive = navStatus === nav.id;
                    const isAuth = navList[0].nav.includes('로그인');
                    return (
                        <li
                            key={`nav-list-${nav.id}`}
                            onClick={() => onClick(nav.id)}
                            className="cursor-pointer"
                        >
                            <h2 className="relative h-[27px] text-body-03 font-medium text-black">
                                {nav.nav}
                                <div
                                    className={cn(
                                        'absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-primary-500 transition-opacity duration-300 ease-in-out',
                                        isAuth ? 'w-[104px]' : 'w-[64px]',
                                        isActive ? 'opacity-100' : 'opacity-0'
                                    )}
                                />
                            </h2>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
