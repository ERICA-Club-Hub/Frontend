import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/config/queryClient';
import { IClubRegisterValue } from '@/types';
import convertImageToFile from '@/utils/convertImageToFile';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../actions/useToast';
import { useRecoilValue } from 'recoil';
import { clubIdSelector } from '@/store/clubInfoState';
import { MAX_FILE_SIZE } from '@/constants/MAX_FILE_SIZE';
import { calculateFormDataSize } from '@/utils/calculateFileSize';

function useClubRegisterQueries() {
    const clubId = useRecoilValue(clubIdSelector);
    const navigate = useNavigate();
    const { showToast } = useToast();

    // 동아리 등록 정보 불러오기
    const useRegisterInfoQuery = ({
        setInputValue,
        setPreviewImg,
        setPostImg,
    }: {
        setInputValue: React.Dispatch<React.SetStateAction<IClubRegisterValue>>;
        setPreviewImg: React.Dispatch<
            React.SetStateAction<string | ArrayBuffer | null>
        >;
        setPostImg: React.Dispatch<React.SetStateAction<File | File[] | null>>;
    }) => {
        const { isSuccess, data, isError } = useQuery({
            queryKey: [clubId, 'registerInfo'],
            queryFn: async () => {
                return await apiRequest({
                    url: `/api/clubs/${clubId}`,
                    method: 'GET',
                });
            },
            staleTime: 5 * 60 * 1000,
        });

        useEffect(() => {
            if (isSuccess && data) {
                setInputValue({
                    clubName: data.result.name,
                    leaderEmail: data.result.leaderEmail,
                    category: data.result.category,
                    oneLiner: data.result.description,
                });

                setPreviewImg(data.result.profileImageUrl);

                if (data.result.profileImageUrl) {
                    convertImageToFile(data.result.profileImageUrl).then(
                        (imageFile) => {
                            setPostImg(imageFile!);
                        },
                    );
                }
            }

            if (isError) {
                console.error('동아리 등록 정보 불러오기 실패');
            }
        }, [isSuccess, data]);
    };

    // 동아리 등록
    const useClubRegisterMutation = () => {
        const {
            isSuccess,
            isError,
            isPending,
            mutate: originalMutate,
        } = useMutation({
            mutationFn: async (formData: FormData) => {
                return await apiRequest({
                    url: `/api/clubs/registrations`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    requireToken: true,
                });
            },
            onSuccess: () => {
                navigate('/admin/club/register/complete', {
                    replace: true,
                });
            },
            onError: () => {
                showToast('오류가 발생했어요. 다시 시도해주세요.');
            },
        });

        const mutate = (formData: FormData) => {
            const totalSize = calculateFormDataSize(formData);

            if (totalSize > MAX_FILE_SIZE) {
                showToast(
                    `파일 크기가 너무 큽니다. 최대 ${
                        5
                        // MAX_FILE_SIZE / 1024 / 1024
                    }MB까지 가능합니다.`,
                );
                return;
            }

            originalMutate(formData);
        };

        return { isSuccess, isError, isPending, mutate };
    };

    // 동아리 등록 정보 수정
    const useEditClubRegisterMutation = () => {
        const {
            isSuccess,
            isError,
            isPending,
            mutate: originalMutate,
        } = useMutation({
            mutationFn: async (formData: FormData) => {
                return await apiRequest({
                    url: `/api/clubs/${clubId}/update`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/-data',
                    },
                    requireToken: true,
                });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [clubId, 'registerInfo'],
                });
                navigate(`/admin/club/${clubId}`, {
                    replace: true,
                });
            },
            onError: (error) => {
                console.error('동아리 수정 실패', error);
                showToast('오류가 발생했어요. 다시 시도해주세요.');
            },
        });

        const mutate = (formData: FormData) => {
            const totalSize = calculateFormDataSize(formData);

            if (totalSize > MAX_FILE_SIZE) {
                showToast(
                    `파일 크기가 너무 큽니다. 최대 ${
                        5
                        // MAX_FILE_SIZE / 1024 / 1024
                    }MB까지 가능합니다.`,
                );
                return;
            }

            originalMutate(formData);
        };

        return { isSuccess, isError, isPending, mutate };
    };

    return {
        useRegisterInfoQuery,
        useClubRegisterMutation,
        useEditClubRegisterMutation,
    };
}

export default useClubRegisterQueries;
