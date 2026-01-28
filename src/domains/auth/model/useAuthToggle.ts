import { apiRequest } from '@/api/apiRequest';
import {
    adminType,
    isAuthenticated,
    isAuthenticatedSelector,
} from '@/domains/auth/model/auth.atom';
import { clubId } from '@/domains/auth/model/clubInfo.atom';
import { removeAccessToken } from '@/utils/tokenHandler';
import axios from 'axios';
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
        try {
            await apiRequest({
                url: '/api/auth/logout',
                method: 'post',
                requireToken: true,
            });
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                console.warn('401 Error: 토큰의 유효기간이 만료되었습니다.');
            } else {
                console.error('로그아웃 중 오류가 발생했습니다:', err);
            }
        } finally {
            removeAccessToken();
            setAuthenticated(false);
            setAdminType(null);
            setClubId(null);
            navigate('/admin/login');
        }
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
