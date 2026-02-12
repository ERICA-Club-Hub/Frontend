import convertURLtoFile from '@/utils/convertURLtoFile';
import { useEffect } from 'react';

/**
 * 동아리 프로필 이미지 설정 커스텀 훅
 * @param fetchImgUrl - api 호출을 통해 받아온 이미지 URL
 * @param setPostImg - 이미지 파일을 설정하는 상태 업데이트 함수 (api 전송용)
 */
const useProfileImage = ({
    fetchImgUrl,
    setPostImg,
}: {
    fetchImgUrl: string | undefined;
    setPostImg: React.Dispatch<React.SetStateAction<File | File[] | null>>;
}) => {
    useEffect(() => {
        const imgUrl = fetchImgUrl || '/placeholder-image.svg';

        const file = convertURLtoFile(imgUrl);

        file.then((res) => {
            if (res) {
                setPostImg(res);
            }
        });
    }, [fetchImgUrl, setPostImg]);
};

export default useProfileImage;
