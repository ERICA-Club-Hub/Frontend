import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { adminTypeSelector, isAuthenticatedSelector } from '@/store/authState';
import { clubIdSelector } from '@/store/clubInfoState';

//로그인 됐을 때는 "로그인 페이지" 접근 제한 -> 메인 페이지로 리다이렉트
export const RedirectIfAuthenticated = () => {
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
    const adminType = useRecoilValue(adminTypeSelector);
    const clubId = useRecoilValue(clubIdSelector);

    return isAuthenticated ? (
        adminType === 'club' ? (
            <Navigate to={`/admin/club/${clubId}`} replace={true} />
        ) : adminType === 'union' ? (
            <Navigate to="/admin/union" replace={true} />
        ) : (
            <Navigate to="/" />
        )
    ) : (
        <Outlet />
    );
};
