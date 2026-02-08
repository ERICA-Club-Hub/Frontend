import { apiRequest } from '@/api/apiRequest';
import { ClubOverviewResponse } from '@/api/data-contracts';
import { useQuery } from '@tanstack/react-query';

/**
 * 동아리 프로필 정보 조회 e.g. 동아리 이름, 모집 상태, 한 줄 소개 등
 */
export const useClubOverviewQuery = ({
    clubId,
    isPreview = false,
}: {
    clubId: string | undefined;
    isPreview: boolean;
}) => {
    return useQuery({
        queryKey: ['clubs', 'profile', clubId],
        queryFn: async (): Promise<ClubOverviewResponse> => {
            const requestUrl = isPreview
                ? `/api/clubs/club-admin/${clubId}/draft`
                : `/api/clubs/${clubId}/overview`;

            const response = await apiRequest({
                url: requestUrl,
                requireToken: isPreview,
            });

            if (response.isSuccess) {
                return response.result;
            }
            throw new Error('동아리 정보를 불러오는데 실패했습니다.');
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: !!clubId && clubId.trim() !== '',
    });
};

// TODO: 수정 필요

// const useRegisterInfoQuery = ({
//     setInputValue,
//     setPreviewImg,
//     setPostImg,
// }: {
//     setInputValue: React.Dispatch<React.SetStateAction<IClubRegisterValue>>;
//     setPreviewImg: React.Dispatch<
//         React.SetStateAction<string | ArrayBuffer | null>
//     >;
//     setPostImg: React.Dispatch<React.SetStateAction<File | File[] | null>>;
// }) => {
//     const { isSuccess, data, isError } = useQuery({
//         queryKey: [clubId, 'registerInfo'],
//         queryFn: async () => {
//             return await apiRequest({
//                 url: `/api/clubs/${clubId}`,
//                 method: 'GET',
//             });
//         },
//         staleTime: 5 * 60 * 1000,
//     });

//     useEffect(() => {
//         if (isSuccess && data) {
//             setInputValue({
//                 clubName: data.result.name,
//                 leaderEmail: data.result.leaderEmail,
//                 category: data.result.category,
//                 oneLiner: data.result.description,
//             });

//             setPreviewImg(data.result.profileImageUrl);

//             if (data.result.profileImageUrl) {
//                 convertURLtoFile(data.result.profileImageUrl).then(
//                     (imageFile) => {
//                         setPostImg(imageFile!);
//                     },
//                 );
//             }
//         }

//         if (isError) {
//             console.error('동아리 등록 정보 불러오기 실패');
//         }
//     }, [isSuccess, data]);
// };
