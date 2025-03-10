import { useToast } from '@/hooks/actions/useToast';
import { useSetRecoilState } from 'recoil';
import { adminType, isAuthenticated } from '@/store/authState';
import { clubId } from '@/store/clubInfoState';
import { useNavigate } from 'react-router-dom';
import { removeAccessToken } from '@/utils/tokenHandler';

const useTokenExpired = () => {
    const navigate = useNavigate();
    const setAuthenticated = useSetRecoilState(isAuthenticated);
    const setAdminType = useSetRecoilState(adminType);
    const setClubId = useSetRecoilState(clubId);

    const { showToast } = useToast();

    const handleTokenExpired = () => {
        // 토큰 만료 시 토스트 메시지 띄우기
        showToast('세션이 만료되었습니다. 다시 로그인해주세요.');

        // 별도의 로그아웃 API 호출 없이 토큰만 제거 후 로그인 페이지로 이동
        setTimeout(() => {
            removeAccessToken();
            setAuthenticated(false);
            setAdminType(null);
            setClubId(null);
            navigate('/admin/login', { replace: true });
        }, 1300);
    };

    return { handleTokenExpired };
};

export { useTokenExpired };
