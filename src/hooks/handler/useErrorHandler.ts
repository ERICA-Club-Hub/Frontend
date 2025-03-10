import axios from 'axios';
import { useToast } from '../actions/useToast';
import { useTokenExpired } from '../auth/useTokenExpired';

const useErrorHandler = () => {
    const { showToast } = useToast();
    const { handleTokenExpired } = useTokenExpired();

    const handleError = (error: any) => {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;

            switch (status) {
                case 401: // 토큰 만료
                    handleTokenExpired();
                    break;
                case 403:
                    showToast('접근 권한이 없어요.');
                    break;
                case 404:
                    showToast('요청한 자원을 찾을 수 없어요.');
                    break;
                case 500:
                    showToast(
                        '서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
                    );
                    break;
                default:
                    showToast('오류가 발생했어요. 다시 시도해주세요.');
                    break;
            }
        } else {
            showToast('네트워크 오류가 발생했어요');
        }
    };

    return { handleError };
};

export { useErrorHandler };
