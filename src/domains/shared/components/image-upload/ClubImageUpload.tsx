import { cn } from '@/utils/cn';
import { uploadImageWithPreview } from '@/utils/uploadImageWithPreview';

interface IClubImageUpload {
    setPostImg: React.Dispatch<React.SetStateAction<File | File[] | null>>;
    previewImg: string | ArrayBuffer | null;
    setPreviewImg: React.Dispatch<
        React.SetStateAction<string | ArrayBuffer | null>
    >;
    placeholder: string;
}

export default function ClubImageUpload({
    setPostImg,
    previewImg,
    setPreviewImg,
    placeholder,
}: IClubImageUpload) {
    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        uploadImageWithPreview(e, setPostImg, setPreviewImg);
    };

    return (
        <div
            className={cn(
                'flex items-center gap-[24px] w-[320px] h-[96px] pl-[20px] border-solid border-neutral-150 bg-neutral-100 rounded-[10px]',
                'transitoin-all duration-500 ease-in',
                previewImg === '/placeholder-image.svg'
                    ? 'bg-neutral-100'
                    : 'border-[0.6px] border-solid border-neutral-150 bg-neutral-00',
            )}
        >
            <div>
                <label
                    htmlFor="image"
                    className={cn(
                        'flex justify-center items-center w-[64px] h-[64px] rounded-[10px] cursor-pointer',
                        previewImg === '/placeholder-image.svg'
                            ? 'border-[0.6px] border-solid border-neutral-50'
                            : 'border-[0.6px] border-solid border-neutral-150',
                    )}
                >
                    {previewImg && (
                        <img
                            src={
                                typeof previewImg === 'string' ? previewImg : ''
                            }
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
                    className="hidden"
                />
            </div>

            {/* TODO: 현재 이미지 사이즈 표시 기능 추가*/}
            <div className="flex flex-col">
                <p className="text-c2 text-neutral-500">{placeholder}</p>
                <span className="text-c2 text-neutral-400">(최대 500KB)</span>
            </div>
        </div>
    );
}
