import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedSelector } from '@/store/authState';

//로그인 됐을 때는 "로그인 페이지" 접근 제한 -> 메인 페이지로 리다이렉트
export const RedirectIfAuthenticated = () => {
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};
