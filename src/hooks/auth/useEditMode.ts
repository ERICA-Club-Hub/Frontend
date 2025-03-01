import { useRecoilValue } from 'recoil';
import { clubIdselector } from '@/store/clubIdState';
import { useEffect, useState } from 'react';
import { isAuthenticatedSelector } from '@/store/authState';

export default function useEditMode() {
    const clubId = useRecoilValue(clubIdselector);
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    // 동아리 등록 수정 페이지는 로그인 상태 & clubId가 있으므로 true로 설정 -> 수정 모드
    useEffect(() => {
        isAuthenticated && clubId ? setIsEditMode(true) : setIsEditMode(false);
    }, []);

    return { isEditMode };
}
