import { SetPreviewImgType } from '@/types';

const uploadImageWithPreview = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPostImg: React.Dispatch<React.SetStateAction<File | File[] | null>>,
    setPreviewImg: SetPreviewImgType,
    isImgList: boolean = false,
) => {
    const { files } = e.target;
    const uploadFile = files![0];

    if (isImgList) {
        setPostImg([...files!]);
    } else {
        setPostImg(uploadFile);
    }

    // 미리보기 이미지 설정

    let fileRead = new FileReader();
    fileRead.readAsDataURL(uploadFile); // url로 변환

    fileRead.onload = () => {
        // 이미지 미리보기
        setPreviewImg(fileRead.result);
    };

    fileRead.onerror = () => {
        console.log('이미지 읽기 중 오류 발생');
    };
};

export { uploadImageWithPreview };
