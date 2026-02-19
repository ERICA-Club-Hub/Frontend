import { apiRequest } from '@/api/apiRequest';
import { GetFeedbacksResponse } from '@/api/data-contracts';
import { APIResponse } from '@/types/api.types';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchFeedbacks = async ({
    pageParam = 0,
}): Promise<APIResponse<GetFeedbacksResponse>> =>
    apiRequest({
        url: `/api/feedbacks`,
        method: 'GET',
        params: { page: pageParam, size: 10 },
    });

/**
 * 동아리 상세 정보 조회 (동아리 소개)
 */
export const useFeedbackQuery = () => {
    return useInfiniteQuery({
        queryKey: ['feedbacks'],
        queryFn: fetchFeedbacks,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const currList = lastPage.result.feedbackDTOList || [];
            if (currList.length < 10) return;
            return allPages.length;
        },
        select: (data) =>
            data.pages.flatMap((page) => page.result.feedbackDTOList || []),
    });
};
