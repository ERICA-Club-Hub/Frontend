import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedSelector } from '@/domains/auth/model/authState';

export const AuthGuard = () => {
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};
