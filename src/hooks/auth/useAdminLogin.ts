import { apiRequest } from '@/api/apiRequest';
import { adminType, isAuthenticated } from '@/store/authState';
import { clubId } from '@/store/clubIdState';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const useAdminLogin = () => {
    const [isValidate, setIsValidate] = useState<boolean>(false);
    const setAuthenticated = useSetRecoilState(isAuthenticated);
    const setAdminType = useSetRecoilState(adminType);
    const setClubId = useSetRecoilState(clubId);

    const handleLogin = async (navStatus: number, code: string) => {
        try {
            // 총동연 로그인 && 사전에 지급된 총동연 코드와 일치할 때
            // 동아리 대표 로그인 && 사전 지급된 총동연 코드가 아닐 때에만 (총동연 코드는 총동연 로그인 란에서만 사용하도록 예외처리!)
            // 서비스 관리자 코드는 어디서든 사용 가능
            if (
                (navStatus === 2 &&
                    code === import.meta.env.VITE_UNION_ADMIN_CODE) ||
                (navStatus === 1 &&
                    code !== import.meta.env.VITE_UNION_ADMIN_CODE) ||
                code === import.meta.env.VITE_SERVICE_ADMIN_CODE
            ) {
                // 로그인 요청 (성공 시 자동으로 토큰 저장)
                const res = await apiRequest({
                    url: '/api/auth/login',
                    method: 'POST',
                    data: { code },
                });

                // 로그인 성공 시
                setIsValidate(true);
                setAuthenticated(true); // 로그인 전역 상태 업데이트

                // 어드민 유형에 따른 전역 상태 설정 및 라우팅
                if (code === import.meta.env.VITE_SERVICE_ADMIN_CODE) {
                    // 서비스 관리자
                    setAdminType('service');
                } else if (code === import.meta.env.VITE_UNION_ADMIN_CODE) {
                    // 총동연
                    setAdminType('union');
                } else {
                    // 동아리 대표
                    setAdminType('club');
                }

                setClubId(res.result); // clubId 저장
            } else {
                setIsValidate(false);
            }
        } catch (error) {
            //코드 불일치
            console.error('로그인 실패:', error);
            setIsValidate(false);
        }
    };

    return { isValidate, setIsValidate, handleLogin };
};

export default useAdminLogin;
