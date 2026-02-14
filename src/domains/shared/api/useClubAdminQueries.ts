import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/api/queryClient';
import { clubIdSelector } from '@/domains/auth/model/clubInfo.atom';
import {
    IActivityLogValue,
    IClubIntroValue,
    IEventScheduleValue,
} from '@/types/input-value.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
    IActivitiesLog,
    IActivityImageDTO,
} from '@/domains/club/activity/activity-log.types';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import converURLtoFile from '@/utils/convertURLtoFile';

// TODO: 도메인 별 각 함수 파일로 분리하기
function useClubAdminQueries() {
    const navigate = useNavigate();
    const clubId = useRecoilValue(clubIdSelector);
    const { handleError } = useErrorHandler();

    // 월별 활동 일정 불러오기
    const useEventSchedulesQuery = (
        setSchedules: React.Dispatch<
            React.SetStateAction<IEventScheduleValue[]>
        >,
    ) => {
        const { isSuccess, data, isError, error } = useQuery({
            queryKey: ['eventSchedules'],
            queryFn: async () => {
                return await apiRequest({
                    url: `/api/clubs/${clubId}/schedules`,
                    method: 'GET',
                    requireToken: true,
                });
            },
            select: (data) => data.result.schedules,
            staleTime: 5 * 60 * 1000,
        });

        // 데이터 불러오기 성공 시, schedules 상태 업데이트
        useEffect(() => {
            if (isSuccess && data.length > 0) {
                setSchedules(data);
            }

            if (isError) {
                console.error('동아리 일정 불러오기 실패');
            }
        }, [isSuccess, data]);

        return { isError, error };
    };

    // 월별 활동 일정 삭제
    const useDeleteEventScheduleMutation = () => {
        const { mutate, isPending, isSuccess } = useMutation({
            mutationFn: async (scheduleId: number) => {
                return await apiRequest({
                    url: `/api/clubs/club-admin/${clubId}/schedules/${scheduleId}`,
                    method: 'DELETE',
                    requireToken: true,
                });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['eventSchedules'],
                });
            },
            onError: (error) => {
                console.error('동아리 일정 삭제 실패', error);
            },
        });
        return { mutate, isPending, isSuccess };
    };

    // 동아리 소개 저장
    const useSaveClubIntroMutation = ({
        inputValue,
        postSchedules,
    }: {
        postSchedules: IEventScheduleValue[];
        inputValue: IClubIntroValue;
    }) => {
        const { mutate, isPending, isSuccess } = useMutation({
            mutationFn: async () => {
                const [introResponse, scheduleResponse] = await Promise.all([
                    apiRequest({
                        url: `/api/clubs/club-admin/${clubId}/introduction`,
                        method: 'POST',
                        data: inputValue,
                        requireToken: true,
                    }),
                    apiRequest({
                        url: `/api/clubs/club-admin/${clubId}/schedules`,
                        method: 'POST',
                        data: {
                            schedules: postSchedules,
                        },
                        requireToken: true,
                    }),
                ]);

                return { introResponse, scheduleResponse };
            },
            onSuccess: () => {
                // 해당 쿼리키를 stale 상태로 변경
                // -> 기존에 캐시된 데이터를 사용할 수 없도록 하여 이후 호출 시에 최신 데이터를 다시 가져오도록 트리거
                queryClient.invalidateQueries({
                    queryKey: ['eventSchedules'],
                });
                queryClient.invalidateQueries({
                    queryKey: [clubId, 'clubDescription'],
                });

                navigate(`/admin/club/${clubId}`);
            },
            onError: (error) => {
                handleError(error);
            },
        });
        return { mutate, isPending, isSuccess };
    };

    // 전체 활동로그 불러오기
    const useActivitiesLogQuery = (
        setActivitiesLog: React.Dispatch<
            React.SetStateAction<IActivitiesLog[]>
        >,
    ) => {
        const { isPending, isSuccess, data, isError } = useQuery({
            queryKey: ['activitesLog'],
            queryFn: async () => {
                return await apiRequest({
                    url: `/api/activities/club/${clubId}`,
                    method: 'GET',
                });
            },
            select: (data) => data.result.activityThumbnailDTOList,
            staleTime: 5 * 60 * 1000,
            retry: 1,
        });

        // 데이터 불러오기 성공 시, 모집안내 상태 업데이트
        useEffect(() => {
            if (isSuccess && data) {
                setActivitiesLog(data);
            }

            if (isError) {
                console.error('동아리 전체 활동로그 불러오기 실패');
            }
        }, [isSuccess, data]);

        return { isPending, isSuccess };
    };

    // 활동로그 상세 조회
    const useDetailActivitiesLogQuery = ({
        activityId,
        setInputValue,
        setPreviewImg,
        setPostImg,
    }: {
        activityId: number;
        setInputValue: React.Dispatch<React.SetStateAction<IActivityLogValue>>;
        setPreviewImg: React.Dispatch<React.SetStateAction<string[]>>;
        setPostImg: React.Dispatch<React.SetStateAction<File[]>>;
    }) => {
        const { isPending, isSuccess, data, error, isError } = useQuery({
            queryKey: ['activitesLog', activityId],
            queryFn: async () => {
                return await apiRequest({
                    url: `/api/activities/${activityId}`,
                    method: 'GET',
                    requireToken: true,
                });
            },
            select: (data) => data.result,
            staleTime: 5 * 60 * 1000,
        });

        // 데이터 불러오기 성공 시, 모집안내 상태 업데이트
        useEffect(() => {
            if (isSuccess && data) {
                setInputValue({
                    content: data.content,
                    date: data.date,
                });

                // 이미지 url 리스트 생성
                const imgUrlList = data.activityImageDTOList.map(
                    (img: IActivityImageDTO) => img.imageUrl,
                );

                // 상태 업데이트
                setPreviewImg([...imgUrlList]);

                if (data.activityImageDTOList) {
                    // 이미지 파일로 변환 후 상태 업데이트

                    Promise.all(
                        imgUrlList.map((imgUrl: string) =>
                            converURLtoFile(imgUrl),
                        ),
                    )
                        .then((imageFiles) => {
                            setPostImg(imageFiles);
                        })
                        .catch((error) => {
                            handleError(error);
                        });
                }
            }
        }, [isSuccess, data]);

        return { isPending, isSuccess, isError, error };
    };

    // 활동로그 생성
    const useCreateActivityLogMutation = (clubId: number | null) => {
        const { mutate, isPending, isSuccess } = useMutation({
            mutationFn: async (formData: FormData) => {
                return await apiRequest({
                    url: `/api/activities/club-admin/${clubId}`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    requireToken: true,
                });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['activitesLog'],
                });
                navigate(`/admin/club/${clubId}/activities/feed`);
            },
            onError: (error) => {
                handleError(error);
            },
        });

        return { isPending, isSuccess, mutate };
    };

    // 활동로그 수정
    const useUpdateActivityLogMutation = (activityId: number | null) => {
        const { mutate, isPending, isSuccess } = useMutation({
            mutationFn: async (formData: FormData) => {
                return await apiRequest({
                    url: `/api/activities/club-admin/${activityId}`,
                    method: 'PATCH',
                    requireToken: true,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['activitesLog'],
                });
                navigate(`/admin/club/${clubId}/activities/feed`);
            },
            onError: (error) => {
                handleError(error);
            },
        });
        return { isPending, isSuccess, mutate };
    };

    // 활동로그 삭제
    const useDeleteActivityLogMutation = (activityId: number | null) => {
        const { mutate, isPending, isSuccess, isError } = useMutation({
            mutationFn: async () => {
                return await apiRequest({
                    url: `/api/activities/club-admin/${activityId}`,
                    method: 'DELETE',
                    requireToken: true,
                });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['activitesLog'],
                });
                navigate(`/admin/club/${clubId}/activities/feed`, {
                    replace: true,
                });
            },
            onError: (error) => {
                handleError(error);
            },
        });

        return { isPending, isSuccess, isError, mutate };
    };

    return {
        useSaveClubIntroMutation,
        useEventSchedulesQuery,
        useDeleteEventScheduleMutation,
        useActivitiesLogQuery,
        useDetailActivitiesLogQuery,
        useUpdateActivityLogMutation,
        useCreateActivityLogMutation,
        useDeleteActivityLogMutation,
    };
}

export default useClubAdminQueries;
