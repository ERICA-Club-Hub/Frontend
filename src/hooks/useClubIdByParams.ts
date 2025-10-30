import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * URL params에서 clubId를 추출하고, undefined인 경우 메인 페이지로 리다이렉트
 * @returns clubId(무조건 string)
 */
export const useClubIdByParams = (): string => {
    const { clubId } = useParams<{ clubId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!clubId || clubId.trim() === '') {
            navigate('/', { replace: true });
        }
    }, [clubId, navigate]);

    return clubId as string;
};
