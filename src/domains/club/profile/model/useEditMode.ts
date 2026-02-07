import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import {
    adminTypeSelector,
    isAuthenticatedSelector,
} from '@/domains/auth/model/auth.atom';

export default function useEditMode() {
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
    const adminType = useRecoilValue(adminTypeSelector);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    // 동아리 등록 수정 페이지는 로그인 상태 & clubId가 있으므로 true로 설정 -> 수정 모드
    useEffect(() => {
        if (isAuthenticated && adminType) {
            setIsEditMode(true);
        } else {
            setIsEditMode(false);
        }
    }, [adminType, isAuthenticated]);

    return { isEditMode };
}
