import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/api/queryClient';
import { useMutation } from '@tanstack/react-query';
import { SchedulesSchema } from '../model/schedule.schema';

// 동아리 월별 일정 입력 및 수정
export const useUpdateScheduleMutation = ({
    clubId,
}: {
    clubId: string | undefined;
}) => {
    return useMutation({
        mutationFn: async (data: SchedulesSchema) => {
            return await apiRequest({
                url: `/api/clubs/club-admin/${clubId}/schedules`,
                method: 'POST',
                data,
                requireToken: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['clubs', 'schedules', clubId],
            });
        },
    });
};

/**
 * 동아리 월별 일정 삭제
 */
export const useDeleteScheduleMutation = ({
    clubId,
}: {
    clubId: string | undefined;
}) => {
    return useMutation({
        mutationFn: async ({ scheduleId }: { scheduleId: number }) => {
            return await apiRequest({
                url: `/api/clubs/club-admin/${clubId}/schedules/${scheduleId}`,
                method: 'DELETE',
                requireToken: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['clubs', 'schedules', clubId],
            });
        },
    });
};
