import { apiRequest } from '@/api/apiRequest';
import {
    adminType,
    isAuthenticated,
    isAuthenticatedSelector,
} from '@/store/authState';
import { clubId } from '@/store/clubInfoState';
import { removeAccessToken } from '@/utils/tokenHandler';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const useAuthToggle = () => {
    const isAuthenticatedValue = useRecoilValue(isAuthenticatedSelector);
    const navigate = useNavigate();
    const setAuthenticated = useSetRecoilState(isAuthenticated);
    const setAdminType = useSetRecoilState(adminType);
    const setClubId = useSetRecoilState(clubId);

    // 로그아웃
    const handleLogout = async () => {
        await apiRequest({
            url: '/api/auth/logout',
            method: 'post',
            requireToken: true,
        });
        removeAccessToken();
        setAuthenticated(false);
        setAdminType(null);
        setClubId(null);
        navigate('/admin/login');
    };

    // 로그인
    const handleLogin = () => {
        navigate('/admin/login');
    };

    const toggleAuthentication = () => {
        if (isAuthenticatedValue) {
            handleLogout();
        } else {
            handleLogin();
        }
    };

    return { toggleAuthentication, handleLogout };
};

export { useAuthToggle };
