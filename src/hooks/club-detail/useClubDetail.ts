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
    const isPreview = nowUrl === 'club-detail-preview'; // TODO 추후에 외부에서 주입하는 방식으로 refactor

    const {
        data: clubDetail,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['clubDetail', id, isPreview],
        queryFn: async (): Promise<ApiClubDetailHeaderResponse> => {
            const requestUrl = isPreview
                ? `/api/clubs/club-admin/${id}/draft` // TODO overview 미리보기 api 완성되면 수정
                : `/api/clubs/${id}/overview`;

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
