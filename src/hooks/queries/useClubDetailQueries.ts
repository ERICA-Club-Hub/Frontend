import { apiRequest } from '@/api/apiRequest';
import { ISummaryInfoValue } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

// 동아리 요약 정보 불러오기
const useSummaryInfoQuery = ({
    clubId,
    setInputValue,
}: {
    clubId: number | null;
    setInputValue: React.Dispatch<React.SetStateAction<ISummaryInfoValue>>;
}) => {
    const { isSuccess, data, isError } = useQuery({
        queryKey: [clubId, 'summaryInfo'],
        queryFn: async () => {
            return await apiRequest({
                url: `/api/clubs/${clubId}`,
                method: 'GET',
                requireToken: true,
            });
        },
        select: (data) => ({
            recruitmentStatus: data.result.recruitmentStatus,
            leaderName: data.result.leaderName,
            leaderPhone: data.result.leaderPhone,
            activities: data.result.activities,
            membershipFee: data.result.membershipFee,
            snsUrl: data.result.snsUrl,
            applicationUrl: data.result.applicationUrl,
        }),
        staleTime: 5 * 60 * 1000,
    });

    // 데이터 불러오기 성공 시, schedules 상태 업데이트
    useEffect(() => {
        if (isSuccess && data) {
            setInputValue(data);
        }

        if (isError) {
            console.error('동아리 요약 정보 불러오기 실패');
        }
    }, [isSuccess, data]);
};

function useClubDetailQueries() {
    return {
        useSummaryInfoQuery,
    };
}

export default useClubDetailQueries;
