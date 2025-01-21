import { InputValue } from '@/types';
type SetInputValueType = React.Dispatch<React.SetStateAction<InputValue>>;
type SetPreviewImgType = React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
declare const uploadImageWithPreview: (e: React.ChangeEvent<HTMLInputElement>, setInputValue: SetInputValueType, setPreviewImg: SetPreviewImgType) => void;
export { uploadImageWithPreview };
