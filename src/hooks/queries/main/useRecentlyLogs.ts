import { apiRequest } from '@/api/apiRequest';
import { useQuery } from '@tanstack/react-query';

interface RecentlyLogsResponse {
    imageUrl: string;
    clubId: number;
    clubName: string;
    clubProfileImageUrl: string;
}

export const useRecentlyLog = () => {
    const { data: recentlyLogs } = useQuery({
        queryKey: ['dk'],
        queryFn: async (): Promise<RecentlyLogsResponse[]> => {
            const response = await apiRequest({
                url: '/api/activities/club/recent',
            });
            return response.result.activityLogs;
        },
    });
    return { recentlyLogs };
};
