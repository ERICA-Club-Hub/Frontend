import { useRecoilValue } from 'recoil';
import { clubIdselector } from '@/store/clubIdState';
import { useEffect, useState } from 'react';

export default function useEditMode() {
    const clubId = useRecoilValue(clubIdselector);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    // 동아리 수정 페이지에서는 clubId가 있으므로 true로 설정 -> 수정 모드
    useEffect(() => {
        clubId ? setIsEditMode(true) : setIsEditMode(false);
    }, []);

    return { isEditMode };
}
