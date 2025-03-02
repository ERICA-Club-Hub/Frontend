import axios from 'axios';
import { removeAccessToken, setAccessToken } from '../../utils/tokenHandler';
import { useRecoilValue } from 'recoil';
import { clubIdSelector } from '@/store/clubInfoState';

export const reissueToken = async () => {
    const clubId = useRecoilValue(clubIdSelector);

    try {
        const response = await axios.post(
            `${
                import.meta.env.VITE_BASE_URL
            }/api/clubs/service-admin/reissue?clubId=${clubId}`,
            {},
            {
                withCredentials: false, // 일단 현재 개발을 위한 API에서는 기존 토큰이 필요 없다고해서 헤더는 비워둠
            },
        );
        const newAccessToken = response.headers['authorization'];

        if (newAccessToken) {
            setAccessToken(newAccessToken);
            return newAccessToken;
        }
        return null;
    } catch (error) {
        console.error('토큰 재발급 실패:', error);
        removeAccessToken();
        return null;
    }
};
