import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/config/queryClient';
import { clubIdSelector } from '@/store/clubInfoState';
import {
    ClubIdType,
    IActivitiesLog,
    IActivityLogValue,
    IClubIntroValue,
    IEventScheduleValue,
    IRecruitNoticeValue,
    ISummaryInfoValue,
} from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import convertImageToFile from '@/utils/convertImageToFile';
import { IActivityImageDTO } from '@/types/activity-log.types';
import { useErrorHandler } from '../handler/useErrorHandler';

function useClubAdminQueries() {
    const navigate = useNavigate();
    const clubId = useRecoilValue(clubIdSelector);
    const { handleError } = useErrorHandler();

    // 동아리 요약 정보 불러오기
    const useSummaryInfoQuery = (
        setInputValue: React.Dispatch<React.SetStateAction<ISummaryInfoValue>>,
    ) => {
        const { isPending, isSuccess, data, isError } = useQuery({
            queryKey: [clubId, 'summaryInfo'],
            queryFn: async () => {
                return await apiRequest({
                    url: `/api/clubs/${clubId}`,
                    method: 'GET',
                });
            },
            select: (data) => ({
                recruitmentStatus: data.result.recruitmentStatus,
                leaderName: data.result.leaderName || '',
                leaderPhone: data.result.leaderPhone || '',
                activities: data.result.activities || '',
                membershipFee: data.result.membershipFee || '',
                snsUrl: data.result.snsUrl || '',
                applicationUrl: data.result.applicationUrl || '',
            }),
            staleTime: 5 * 60 * 1000,
        });

        // 데이터 불러오기 성공 시, 요약정보 상태 업데이트
        useEffect(() => {
            if (isSuccess && data) {
                setInputValue(data);
            }

            if (isError) {
                console.error('동아리 요약 정보 불러오기 실패');
            }
        }, [isSuccess, data]);

        return {
            isPending,
        };
    };

    // 요약 정보 저장
    const useSaveSummaryInfoMutation = (inputValue: ISummaryInfoValue) =>
        useMutation({
            mutationFn: async () => {
                return await apiRequest({
                    url: `/api/clubs/club-admin/${clubId}`,
                    method: 'POST',
                    data: inputValue,
                    requireToken: true,
                });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [clubId, 'summaryInfo'],
                });
                navigate(`/admin/club/${clubId}`);
            },
            onError: (error) => {
                handleError(error);
            },
        });

    // 동아리 소개 저장
    const useSaveClubIntroMutation = ({
        inputValue,
        postSchedules,
    }: {
        postSchedules: IEventScheduleValue[];
        inputValue: IClubIntroValue;
    }) =>
        useMutation({
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

                navigate(`/admin/club/${clubId}`);
            },
            onError: (error) => {
                handleError(error);
            },
        });

    // 월별 활동 일정 불러오기
    const useEventSchedulesQuery = (
        setSchedules: React.Dispatch<
            React.SetStateAction<IEventScheduleValue[]>
        >,
    ) => {
        const { isSuccess, data, isError } = useQuery({
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
    };

    // 동아리 소개글 정보 불러오기
    const useClubDescriptionQuery = (
        setInputValue: React.Dispatch<React.SetStateAction<IClubIntroValue>>,
    ) => {
        const { isSuccess, data, isError } = useQuery({
            queryKey: [clubId, 'clubDescription'],
            queryFn: async () => {
                return await apiRequest({
                    url: `/api/clubs/${clubId}/introduction`,
                    method: 'GET',
                    requireToken: true,
                });
            },
            // 데이터 구조 변경
            select: (data) => ({
                introduction: data.result.introduction || '',
                activity: data.result.activity || '',
                recruitment: data.result.recruitment || '',
            }),
            staleTime: 5 * 60 * 1000, // 5분
        });

        useEffect(() => {
            if (isSuccess && data) {
                setInputValue(data);
            }

            if (isError) {
                console.error('동아리 소개글 불러오기 실패');
            }
        }, [isSuccess, data]);
    };

    // 모집안내 정보 불러오기
    const useRecruitNoticeQuery = (
        setInputValue: React.Dispatch<
            React.SetStateAction<IRecruitNoticeValue>
        >,
    ) => {
        const { isPending, isSuccess, data, isError } = useQuery({
            queryKey: [clubId, 'recruitNotice'],
            queryFn: async () => {
                return await apiRequest({
                    url: `/api/clubs/${clubId}/recruitment`,
                    method: 'GET',
                });
            },
            select: (data) => ({
                due: data.result.due || '',
                notice: data.result.notice || '',
                etc: data.result.etc || '',
            }),
            staleTime: 5 * 60 * 1000,
        });

        // 데이터 불러오기 성공 시, 모집안내 상태 업데이트
        useEffect(() => {
            if (isSuccess && data) {
                setInputValue(data);
            }

            if (isError) {
                console.error('동아리 모집안내 정보 불러오기 실패');
            }
        }, [isSuccess, data]);

        return {
            isPending,
        };
    };

    // 모집안내 저장
    const useSaveRecruitNoticeMutation = (inputValue: IRecruitNoticeValue) =>
        useMutation({
            mutationFn: async () => {
                return await apiRequest({
                    url: `/api/clubs/club-admin/${clubId}/recruitment`,
                    method: 'POST',
                    data: inputValue,
                    requireToken: true,
                });
            },
            onSuccess: (response) => {
                queryClient.invalidateQueries({
                    queryKey: [clubId, 'recruitNotice'],
                });
                navigate(`/admin/club/${clubId}`);
                console.log(response);
            },
            onError: (error) => {
                handleError(error);
            },
        });

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
        const { isPending, isSuccess, data, isError } = useQuery({
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
                    imgUrlList.forEach((imgUrl: string) => {
                        convertImageToFile(imgUrl).then((imageFile) => {
                            if (imageFile) {
                                setPostImg((prev) => [...prev, imageFile]);
                            }
                        });
                    });

                    // Promise.all(
                    //     imgUrlList.map((imgUrl: string) =>
                    //         convertImageToFile(imgUrl),
                    //     ),
                    // ).then((imageFiles) => {
                    //     setPostImg(imageFiles);
                    // });
                }
            }

            if (isError) {
                console.error('어드민 동아리 활동로그 상세조회 실패');
            }
        }, [isSuccess, data]);

        return { isPending, isSuccess };
    };

    // 활동로그 생성
    const useCreateActivityLogMutation = (clubId: ClubIdType) =>
        useMutation({
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

    // 활동로그 수정
    const useUpdateActivityLogMutation = (activityId: ClubIdType) =>
        useMutation({
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

    // 활동로그 삭제
    const useDeleteActivityLogMutation = (activityId: ClubIdType) =>
        useMutation({
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

    return {
        useSummaryInfoQuery,
        useSaveSummaryInfoMutation,
        useSaveClubIntroMutation,
        useEventSchedulesQuery,
        useClubDescriptionQuery,
        useRecruitNoticeQuery,
        useSaveRecruitNoticeMutation,
        useActivitiesLogQuery,
        useDetailActivitiesLogQuery,
        useUpdateActivityLogMutation,
        useCreateActivityLogMutation,
        useDeleteActivityLogMutation,
    };
}

export default useClubAdminQueries;
