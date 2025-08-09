import { apiRequest } from '@/api/apiRequest';
import { activeTab } from '@/pages';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

interface ApiClubDetailHeaderResponse {
    profileImageUrl?: string;
    description: string;
    name: string;
    category: string;
    recruitmentStatus: string;
    applicationUrl: string;
}

export const useClubDetail = () => {
    const location = useLocation();
    const nowUrl = location.pathname.split('/')[1];
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<activeTab>('intro');
    const isPreview = nowUrl === 'club-detail-preview';

    return {
        clubId: id,
        activeTab,
        setActiveTab,
        isPreview,
    };
};

export const useClubDetailHeader = (clubId: string, isPreview: boolean) => {
    return useQuery({
        queryKey: ['clubDetailHeader', clubId, isPreview],
        queryFn: async (): Promise<ApiClubDetailHeaderResponse> => {
            const requestUrl = isPreview
                ? `/api/clubs/club-admin/${clubId}/draft`
                : `/api/clubs/${clubId}/overview`;

            const response = await apiRequest({
                url: requestUrl,
                requireToken: isPreview,
            });

            if (response.isSuccess) {
                return response.result;
            }
            throw new Error('동아리 오버뷰 불러오기 실패');
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: !!clubId && clubId.trim() !== '',
    });
};
