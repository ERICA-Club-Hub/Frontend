import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/config/queryClient';
import { ClubIdType, IClubRegisterValue } from '@/types';
import convertImageToFile from '@/utils/convertImageToFile';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

// 동아리 등록 정보 불러오기
const useRegisterInfoQuery = ({
    clubId,
    setInputValue,
    setPreviewImg,
    setPostImg,
}: {
    clubId: number | null;
    setInputValue: React.Dispatch<React.SetStateAction<IClubRegisterValue>>;
    setPreviewImg: React.Dispatch<
        React.SetStateAction<string | ArrayBuffer | null>
    >;
    setPostImg: React.Dispatch<React.SetStateAction<File | null>>;
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

    // 데이터 불러오기 성공 시, 등록 정보 상태 업데이트
    useEffect(() => {
        if (isSuccess && data) {
            setInputValue({
                clubName: data.result.name,
                leaderEmail: data.result.leaderEmail,
                category: data.result.category,
                oneLiner: data.result.description,
            });

            console.log(data);

            // 이미지 미리보기 업데이트
            setPreviewImg(data.result.profileImageUrl);

            // 이미지 파일로 변환 후 상태 업데이트
            convertImageToFile(data.profileImageUrl).then((imageFile) => {
                setPostImg(imageFile || null);
            });
        }

        if (isError) {
            console.error('동아리 요약 정보 불러오기 실패');
        }
    }, [isSuccess, data]);
};

// 동아리 등록
const useClubRegisterMutation = ({ formData }: { formData: FormData }) =>
    useMutation({
        mutationFn: async () => {
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
        onError: (error) => {
            console.error('동아리 등록 요청 실패', error);
        },
    });

// 동아리 등록 정보 수정
const useEditClubRegisterMutation = ({
    clubId,
    formData,
}: {
    clubId: ClubIdType;
    formData: FormData;
}) =>
    useMutation({
        mutationFn: async () => {
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
        },
        onError: (error) => {
            console.error('동아리 등록정보 저장 실패', error);
        },
    });

function useClubRegisterQueries() {
    return {
        useRegisterInfoQuery,
        useClubRegisterMutation,
        useEditClubRegisterMutation,
    };
}

export default useClubRegisterQueries;
