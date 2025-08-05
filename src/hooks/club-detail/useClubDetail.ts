import { apiRequest } from '@/api/apiRequest';
import { activeTab } from '@/pages';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

interface ApiClubDetailHeaderResponse {
    clubImgUrl?: string;
    clubDescription: string;
    clubName: string;
    clubTag: string;
    recruitState: string;
    applicationUrl: string;
}

export const useClubDetail = () => {
    const location = useLocation();
    const nowUrl = location.pathname.split('/')[1];
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<activeTab>('intro');
    const isPreview = nowUrl === 'club-detail-preview';

    const {
        data: clubDetail,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['clubDetail', id, isPreview],
        queryFn: async (): Promise<ApiClubDetailHeaderResponse> => {
            const requestUrl = isPreview
                ? `/api/clubs/club-admin/${id}/draft`
                : `/api/clubs/${id}`;

            const response = await apiRequest({
                url: requestUrl,
                requireToken: isPreview,
            });

            if (response.isSuccess) {
                return response.result;
            }
            throw new Error('동아리 정보 불러오기 실패');
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    return {
        clubId: id,
        activeTab,
        setActiveTab,
        isPreview,
        clubDetail,
        isLoading,
        isError,
    };
};
