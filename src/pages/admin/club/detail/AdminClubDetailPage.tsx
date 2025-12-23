import { TopNavigator } from '@/components/Common';
import { useState } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { clubDetailRegisterNavigations } from '@/constants/navigations.constant';

const AdminClubDetailPage = () => {
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
        <Container>
            <TopNavigatorWrapper>
                <TopNavigator
                    navStatus={navStatus}
                    navList={clubDetailRegisterNavigations}
                    onClick={(id: number) => handleNavClick(id)}
                />
            </TopNavigatorWrapper>
            <Outlet />
        </Container>
    );
};

export { AdminClubDetailPage };

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TopNavigatorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 55px;
    margin-bottom: 15px;
    background-color: ${({ theme }) => theme.colors.white};
`;
