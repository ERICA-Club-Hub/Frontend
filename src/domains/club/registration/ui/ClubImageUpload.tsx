import { uploadImageWithPreview } from '@/utils/uploadImageWithPreview';

interface IClubImageUpload {
    setPostImg: React.Dispatch<React.SetStateAction<File | File[] | null>>;
    previewImg: string | ArrayBuffer | null;
    setPreviewImg: React.Dispatch<
        React.SetStateAction<string | ArrayBuffer | null>
    >;
}

export default function ClubImageUpload({
    setPostImg,
    previewImg,
    setPreviewImg,
}: IClubImageUpload) {
    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        uploadImageWithPreview(e, setPostImg, setPreviewImg);
    };

    return (
        <div className="flex flex-col">
            <div className="pl-[7px] flex gap-[5px] w-full mb-[10px]">
                <label className="text-body-01 font-semibold text-black">
                    동아리 사진 업로드
                </label>
                <span className="text-body-03 font-normal text-neutral-500">
                    (선택)
                </span>
            </div>
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

                <div className="flex flex-col gap-[7px]">
                    <p className="text-body-03 font-normal text-neutral-500">
                        동아리 대표 사진을 <br />
                        업로드해 주세요.
                    </p>
                    <span className="text-caption font-normal text-neutral-500 underline">
                        500kb까지 업로드 가능합니다.
                    </span>
                </div>
            </div>
        </div>
    );
}
