import { useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { clubDetailRegisterNavigations } from '@/constants/navigations.constant';
import { TopNavigator } from '@/components/Tabs/TopNavigator';

export default function AdminClubDetailPage() {
    const { id: clubId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // location.pathname을 기반으로 초기 navStatus 설정 (새로 고침 시 초기 값으로 라우팅 방지)
    const getInitialNavStatus = (path: string) => {
        if (path.includes('summary-info')) return 1;
        if (path.includes('club-intro')) return 2;
        if (path.includes('recruit-notice')) return 3;
        return 1; // 기본값 (summary-info)
    };

    const [navStatus, setNavStatus] = useState<number>(() =>
        getInitialNavStatus(location.pathname),
    );

    // navStatus 변경 시 라우팅
    const handleNavClick = (id: number) => {
        if (navStatus !== id) {
            setNavStatus(id);
            navigate(
                `/admin/club/${clubId}/${
                    id === 1
                        ? 'summary-info'
                        : id === 2
                        ? 'club-intro'
                        : 'recruit-notice'
                }`,
            );
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col justify-end items-center w-full h-[55px] mb-[15px] bg-white">
                <TopNavigator
                    navStatus={navStatus}
                    navList={clubDetailRegisterNavigations}
                    onClick={(id: number) => handleNavClick(id)}
                />
            </div>
            <Outlet />
        </div>
    );
}
