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
