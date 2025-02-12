import axios, { AxiosInstance } from 'axios';
import { getAccessToken, setAccessToken } from './auth/token';
import { reissueToken } from './auth/reissue';

interface RequestConfig {
    requireToken?: boolean;
    url: string;
    method?: string; // default GET으로 할거라 일단 optional
    data?: unknown;
    headers?: Record<string, string>;
}

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false, // jwt 쿠키로 관리 안해서 false로
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 3000,
});

// API 호출할 때 최종적으로 사용할 함수!!
export const fetchInstance = async ({
    url,
    method = 'GET', // default는 GET이고 필요하면 다른 메서드로 입력
    data,
    headers = {}, // 파일 업로드같은 작업할 때는 'Content-Type': 'multipart/form-data'로 지정하는 등 지유롭게 사용
    requireToken = false, // 토큰이 필요한 코드이면 true로 입력!! 내부 로직에서 자동으로 토큰 가져다가 쓰도록 해뒀습니다
}: RequestConfig) => {
    try {
        if (requireToken) {
            const token = getAccessToken();
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
        }

        const response = await axiosInstance({ url, method, data, headers });

        if (url === '/api/users/login') {
            // 로그인하는 api일 때는 호출하면 자동으로 토큰 저장하도록
            const token = response.headers['authorization'];
            const accessToken = token.replace('Bearer ', '');
            if (accessToken) {
                setAccessToken(accessToken);
            }
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.log(error.response?.data.message, '라는 이유로 다시 요청!');
            // 401일 때(토큰이 만료됐을 때)는 토큰 재발급하고 이전에 했던 작업 그대로 하도록
            // axios에러면서 응답이 401일 때만 토큰 관련 헨들링 진행
            try {
                const newToken = await reissueToken(); // 나중에 개발 완료되면 바뀐다고 하네여
                if (!newToken) throw new Error('토큰 재발급 실패');

                return axiosInstance({
                    url,
                    method,
                    data,
                    headers: {
                        ...headers,
                        Authorization: `Bearer ${newToken}`,
                    },
                });
            } catch (error) {
                console.error(error);
            }
        }
        // axios에러가 아닌 경우 (ex. 문법 오류, 타입 오류 등등..)로 구분
        console.error(error);
        throw error;
    }
};
