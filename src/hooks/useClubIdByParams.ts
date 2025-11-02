import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * URL params에서 id를 추출하고, undefined인 경우 메인 페이지로 리다이렉트
 * @returns id(무조건 string)
 */
export const useClubIdByParams = (): string => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id || id.trim() === '') {
            navigate('/', { replace: true });
        }
    }, [id, navigate]);

    return id as string;
};
