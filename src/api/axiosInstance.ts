import { getErrorMessage } from '@/utils/getErrorMessage';
import axios, { AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false, // jwt 쿠키로 관리 안해서 false로
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 3000,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status ?? 500; // 에러 status가 undefined일 땐 기본값으로 500
            const url = error.config?.url || '';

            // `ERROR_MESSAGE`에서 적절한 에러 메시지 찾기
            const errorKey = `${url}-${status}`;
            const lastShown = sessionStorage.getItem(errorKey);

            // 마지막 에러 발생 시간 확인 (1초 이내라면 alert 띄우지 않음)
            if (lastShown && Date.now() - Number(lastShown) < 1000) {
                return Promise.reject(error); // 1초 내에 같은 에러면 그냥 종료
            }

            // 에러 메시지 가져오기
            const errorHandler = getErrorMessage(url, status);
            if (errorHandler) {
                alert(errorHandler.message);
                sessionStorage.setItem(errorKey, Date.now().toString()); // 최근 표시 시간 기록
                errorHandler.action?.();
            } else {
                // 헨들링되지 않은 에러라면
                // alert('알 수 없는 오류가 발생했습니다'); -> 배포하면 이거로 바꿔야할듯
                console.error('처리하지 못한 에러', { url, status, error });
            }
        } else {
            console.error('Error:', error); // axios 에러가 아닌 다른 타입의 에러 발생
        }
        return Promise.reject(error);
    },
);
