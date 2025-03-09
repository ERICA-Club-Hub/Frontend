import { uploadImageListHandler } from '@/utils/uploadImageListHandler';
import styled from 'styled-components';

interface IImageListUpload {
    currentIdx: number;
    setPostImg: React.Dispatch<React.SetStateAction<File[]>>;
    previewImg: string | string[] | ArrayBuffer;
    setPreviewImg: React.Dispatch<React.SetStateAction<string[] | ArrayBuffer>>;
}

function ImageListUpload({
    previewImg,
    setPostImg,
    setPreviewImg,
    currentIdx,
}: IImageListUpload) {
    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        uploadImageListHandler(e, setPostImg, setPreviewImg, currentIdx);
    };

    return (
        <ImageContainer>
            <label htmlFor="image" className="image-preview-label">
                <ImagePreview
                    src={
                        Array.isArray(previewImg) ? previewImg[currentIdx] : ''
                    }
                    alt="image-preview"
                />
            </label>
            <input
                id="image"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImgUpload}
            />
        </ImageContainer>
    );
}

export { ImageListUpload };

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    .image-preview-label {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.colors.mediumGray};
        cursor: pointer;
    }

    input {
        display: none;
    }
`;

const ImagePreview = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
`;
