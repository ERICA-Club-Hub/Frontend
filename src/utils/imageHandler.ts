import { SetUploadImgUrlType } from '@/types/club-register.types';

const uploadImageWithPreview = (
    e: React.ChangeEvent<HTMLInputElement>,
    setUploadImgUrl: SetUploadImgUrlType,
) => {
    const { files } = e.target;
    const uploadFile = files![0];

    let fileRead = new FileReader();
    fileRead.readAsDataURL(uploadFile); // url로 변환

    fileRead.onload = () => {
        setUploadImgUrl(fileRead.result);
    };

    fileRead.onerror = () => {
        console.log('이미지 읽기 중 오류 발생');
    };
};

export { uploadImageWithPreview };
