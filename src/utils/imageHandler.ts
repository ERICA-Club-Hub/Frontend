import { InputValue } from '@/types';

type SetInputValueType = React.Dispatch<React.SetStateAction<InputValue>>;
type SetPreviewImgType = React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
>;

const uploadImageWithPreview = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInputValue: SetInputValueType,
    setPreviewImg: SetPreviewImgType,
) => {
    let fileArr = e.target.files;
    if (fileArr) {
        setInputValue((prev) => ({ ...prev, image: Array.from(fileArr) }));
    }

    let fileRead = new FileReader();

    fileRead.onload = () => {
        setPreviewImg(fileRead.result);
    };

    fileRead.onerror = () => {
        console.log('이미지 읽기 중 오류 발생');
    };

    if (fileArr!.length > 0) {
        fileRead.readAsDataURL(fileArr![0]);
    }
};

export { uploadImageWithPreview };
