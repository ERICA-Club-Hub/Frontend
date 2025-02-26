import { apiRequest } from '@/api/apiRequest';
import {
    adminType,
    isAuthenticated,
    isAuthenticatedSelector,
} from '@/store/authState';
import { removeAccessToken } from '@/utils/tokenHandler';
import { SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const useAuthenticationToggle = (
    setIsOpen: React.Dispatch<SetStateAction<boolean>>,
) => {
    const navigate = useNavigate();
    const isAuthenticatedValue = useRecoilValue(isAuthenticatedSelector);
    const setAuthenticated = useSetRecoilState(isAuthenticated);
    const setAdminType = useSetRecoilState(adminType);

    // 로그인 -> 로그아웃 로직
    const handleLogout = () => {
        apiRequest({
            url: '/api/auth/logout',
            method: 'post',
            requireToken: true,
        });
        removeAccessToken();
        setAuthenticated(false);
        setAdminType(null);
        navigate('/');
    };

    // 로그아웃 -> 로그인 페이지로 이동
    const handleLogin = () => {
        navigate('/admin/login');
    };

    const toggleAuthentication = () => {
        if (isAuthenticatedValue) {
            handleLogout();
        } else {
            handleLogin();
        }
        setIsOpen(false);
    };

    return toggleAuthentication;
};
