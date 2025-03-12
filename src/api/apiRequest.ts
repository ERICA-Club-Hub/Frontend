import axios from 'axios';
import { getAccessToken, setAccessToken } from '../utils/tokenHandler';
import { axiosInstance } from './axiosInstance';
import { RequestConfig } from '@/types';

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
            const token = response.headers['authorization'];
            if (token) {
                const accessToken = token.replace('Bearer ', '');
                setAccessToken(accessToken);
            }
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            try {
                // 기존 reissue API로는 토큰 재발급 불가능하다고 하여 기존 로직은 삭제
                // 추후 refreshToken 관련 로직 추가 예정
            } catch (error) {}
        }
        throw error;
    }
};
