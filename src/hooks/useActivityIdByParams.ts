import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const useActivityIdByParams = (): string => {
    const { activityId } = useParams<{ activityId: string }>();
    const navigate = useNavigate();
    const { id: clubId } = useParams<{ id: string }>();

    useEffect(() => {
        if (!activityId || activityId.trim() === '') {
            navigate(`/club/${clubId}`, { replace: true });
        }
    }, [activityId, clubId, navigate]);

    return activityId as string;
};
