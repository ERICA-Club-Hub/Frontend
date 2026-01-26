import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
    adminTypeSelector,
    isAuthenticatedSelector,
} from '@/domains/auth/model/auth.atom';
import { clubIdSelector } from '@/domains/auth/model/clubInfo.atom';

//로그인 됐을 때는 "로그인 페이지" 접근 제한 -> 메인 페이지로 리다이렉트
export const RedirectIfAuthenticated = () => {
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
    const adminType = useRecoilValue(adminTypeSelector);
    const clubId = useRecoilValue(clubIdSelector);

    return isAuthenticated ? (
        adminType === 'club' ? (
            <Navigate to={`/admin/club/${clubId}`} replace={true} />
        ) : (
            <Navigate to="/" />
        )
    ) : (
        <Outlet />
    );
};
