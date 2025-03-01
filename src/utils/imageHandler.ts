import { IClubRegisterValue, SetPreviewImgType } from '@/types';

const uploadImageWithPreview = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInputValue: React.Dispatch<React.SetStateAction<IClubRegisterValue>>,
    setPreviewImg: SetPreviewImgType,
) => {
    const { files } = e.target;
    const uploadFile = files![0];

    // API로 요청할 이미지 파일
    setInputValue((prev) => ({
        ...prev,
        image: uploadFile,
    }));

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
