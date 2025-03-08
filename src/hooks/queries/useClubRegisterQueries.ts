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
            // staleTime: 5 * 60 * 1000,
        });

        // 데이터 불러오기 성공 시, 등록 정보 상태 업데이트
        useEffect(() => {
            if (isSuccess && data) {
                setInputValue({
                    clubName: data.result.name,
                    leaderEmail: data.result.leaderEmail,
                    category: data.result.category,
                    oneLiner: data.result.description,
                });

                // 이미지 미리보기 업데이트
                setPreviewImg(data.result.profileImageUrl);

                if (data.result.profileImageUrl) {
                    // 이미지 파일로 변환 후 상태 업데이트
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
        const { isSuccess, isError, isPending, mutate } = useMutation({
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
        return { isSuccess, isError, isPending, mutate };
    };

    // 동아리 등록 정보 수정
    const useEditClubRegisterMutation = () => {
        const { isSuccess, isError, isPending, mutate } = useMutation({
            mutationFn: async (formData: FormData) => {
                return await apiRequest({
                    url: `/api/clubs/${clubId}/update`,
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
                    queryKey: [clubId, 'registerInfo'],
                });
                navigate(`/admin/club/${clubId}`, {
                    replace: true,
                });
            },
            onError: () => {
                showToast('오류가 발생했어요. 다시 시도해주세요.');
            },
        });
        return { isSuccess, isError, isPending, mutate };
    };

    return {
        useRegisterInfoQuery,
        useClubRegisterMutation,
        useEditClubRegisterMutation,
    };
}

export default useClubRegisterQueries;
