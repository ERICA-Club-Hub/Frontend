import axios, { AxiosError } from 'axios';
import { useToast } from '../components/Toast/useToast';
import { useTokenExpired } from '../domains/auth/model/useTokenExpired';

const useErrorHandler = () => {
    const { showToast } = useToast();
    const { handleTokenExpired } = useTokenExpired();

    const handleError = (
        error: Error | AxiosError | unknown,
        action?: () => void,
    ) => {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;

            switch (status) {
                case 401: // 토큰 만료
                    handleTokenExpired();
                    break;
                case 403:
                    showToast('접근 권한이 없어요.');
                    console.error('403 ERROR', error);
                    break;
                case 404:
                    showToast('요청한 자원을 찾을 수 없어요.');
                    console.error('404 ERROR', error);
                    break;
                case 500:
                    showToast(
                        '서버 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
                    );
                    console.error('500 ERROR', error);
                    break;
                default:
                    showToast('오류가 발생했어요. 다시 시도해주세요.');
                    console.error('ERROR', error);
                    break;
            }
        } else {
            showToast('네트워크 오류가 발생했어요');
            console.error('NETWORK ERROR', error);
        }

        // 에러 핸들링 후에 action 함수 실행
        if (action) {
            action();
        }
    };

    return { handleError };
};

export { useErrorHandler };
