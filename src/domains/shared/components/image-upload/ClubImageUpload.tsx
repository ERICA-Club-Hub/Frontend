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
        <div className="flex flex-col">
            <div className="w-[320px] h-[100px] bg-white flex items-center gap-5 rounded-[10px] p-[10px]">
                <div>
                    <label
                        htmlFor="image"
                        className="flex justify-center items-center w-20 h-20 rounded-[10px] bg-neutral-200 cursor-pointer"
                    >
                        {previewImg && (
                            <img
                                src={
                                    typeof previewImg === 'string'
                                        ? previewImg
                                        : ''
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

                <span className="text-caption font-normal text-neutral-500 underline">
                    {placeholder}
                </span>
            </div>
        </div>
    );
}
