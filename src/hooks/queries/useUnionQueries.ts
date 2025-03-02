import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/config/queryClient';
import { IUnionNoticeValue } from '@/types';
import convertImageToFile from '@/utils/convertImageToFile';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

// 총동연 공지사항 생성
const useCreateUnionNoticeMutation = ({ formData }: { formData: FormData }) =>
    useMutation({
        mutationFn: async () => {
            return await apiRequest({
                url: `/api/announcements/union-admin`,
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
                queryKey: ['union', 'notice'],
            });
        },
        onError: (error) => {
            console.error('총동연 공지사항 생성 실패', error);
        },
    });

// 총동연 특정 공지사항 정보 불러오기
const useUnionNoticeQuery = ({
    announcementId,
    setInputValue,
    setPreviewImg,
    setPostImg,
}: {
    announcementId: number;
    setInputValue: React.Dispatch<React.SetStateAction<IUnionNoticeValue>>;
    setPreviewImg: React.Dispatch<
        React.SetStateAction<string | ArrayBuffer | null>
    >;
    setPostImg: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
    const { isSuccess, data, isError } = useQuery({
        queryKey: ['union', 'notice', announcementId],
        queryFn: async () => {
            return await apiRequest({
                url: `/api/announcements`,
                method: 'GET',
            });
        },
        staleTime: 5 * 60 * 1000,
    });

    // 데이터 불러오기 성공 시, 등록 정보 상태 업데이트
    useEffect(() => {
        if (isSuccess && data) {
            // 특정 공지사항 정보만 필터링
            const noticeData = data.result.announcementDTOList.filter(
                (notice: any) => notice.announcementId === announcementId,
            );
            setInputValue(noticeData[0]);

            // 이미지 미리보기 업데이트
            setPreviewImg(noticeData[0].thumbnailUrl);

            // 이미지 파일로 변환 후 상태 업데이트
            convertImageToFile(data.profileImageUrl).then((imageFile) => {
                setPostImg(imageFile || null);
            });
        }

        if (isError) {
            console.error('동아리 총동연 특정 공지사항 불러오기 실패');
        }
    }, [isSuccess, data]);
};

function useUnionQueries() {
    return {
        useCreateUnionNoticeMutation,
        useUnionNoticeQuery,
    };
}

export default useUnionQueries;
