import axios from 'axios';
import { getAccessToken, setAccessToken } from '../utils/tokenHandler';
import { reissueToken } from './auth/reissue';
import { axiosInstance } from './axiosInstance';
import { RequestConfig } from '@/types/api.types';

/**
 * API 호출할 때 최종적으로 사용할 함수
 *
 * @param {string} url - 요청할 URL
 * @param {string} [method='GET'] - HTTP 메서드 (기본 값은 GET)
 * @param {unknown} [data] - 요청에 포함할 데이터
 * @param {Record<string, string>} [headers={}] - //'Content-Type', 'multipart/form-data' 등 헤더 설정
 * @param {boolean} [requireToken=false] - 토큰이 필요한 요청인지 여부 (내부 로직에서 자동으로 토큰 가져다가 쓰도록 조치)
 *
 * @returns {Promise<AxiosResponse>} - Axios 응답 객체
 */

export const apiRequest = async ({
    url,
    method = 'GET',
    data,
    headers = {},
    requireToken = false,
}: RequestConfig) => {
    try {
        if (requireToken) {
            const token = getAccessToken();
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
        }

        const response = await axiosInstance({ url, method, data, headers });

        if (url === '/api/auth/login') {
            // 로그인하는 api일 때는 호출하면 자동으로 토큰 저장하도록
            console.log(response);
            console.log(response.headers);
            console.log(response.headers['Authorization']);
            const token = response.headers['authorization'];
            if (token) {
                const accessToken = token.replace('Bearer ', '');
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
