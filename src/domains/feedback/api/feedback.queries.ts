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
 * 피드백 목록 조회 (무한 스크롤)
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
