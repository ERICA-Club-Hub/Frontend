import { cn } from '@/utils/cn';
import { uploadImageWithPreview } from '@/utils/uploadImageWithPreview';

interface IImageUpload {
    setPostImg: React.Dispatch<React.SetStateAction<File | File[] | null>>;
    previewImg: string | ArrayBuffer | null;
    setPreviewImg: React.Dispatch<
        React.SetStateAction<string | ArrayBuffer | null>
    >;
    mode: string;
    isEditBtnClicked: boolean;
    isImgList?: boolean;
}

export default function ImageUpload({
    setPostImg,
    previewImg,
    setPreviewImg,
    mode,
    isEditBtnClicked,
    isImgList,
}: IImageUpload) {
    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        uploadImageWithPreview(e, setPostImg, setPreviewImg, isImgList);
    };

    return (
        <div className="w-full h-full flex">
            <label
                htmlFor="image"
                className={cn(
                    'w-full h-full rounded-[10px]',
                    'bg-neutral-200 cursor-pointer',
                )}
            >
                {previewImg && (
                    <img
                        src={typeof previewImg === 'string' ? previewImg : ''}
                        alt="image-preview"
                        className="w-full h-full rounded-[10px] object-cover"
                    />
                )}
            </label>
            <input
                id="image"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImgUpload}
                disabled={mode === 'edit' && !isEditBtnClicked}
                className="hidden"
            />
        </div>
    );
}
