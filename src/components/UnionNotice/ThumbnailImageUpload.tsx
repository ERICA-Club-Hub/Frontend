import { uploadImageWithPreview } from '@/utils';
import styled from 'styled-components';

interface IThumbnailImageUpload {
    setPostImg: React.Dispatch<React.SetStateAction<File | null>>;
    previewImg: string | ArrayBuffer | null;
    setPreviewImg: React.Dispatch<
        React.SetStateAction<string | ArrayBuffer | null>
    >;
}

export default function ThumbnailImageUpload({
    setPostImg,
    previewImg,
    setPreviewImg,
}: IThumbnailImageUpload) {
    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        uploadImageWithPreview(e, setPostImg, setPreviewImg);
    };

    return (
        <ImageContainer>
            <label htmlFor="image" className="image-preview">
                {previewImg && (
                    <ImagePreview
                        src={typeof previewImg === 'string' ? previewImg : ''}
                        alt="image-preview"
                    />
                )}
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

const ImageContainer = styled.div`
    width: 140px;
    height: 140px;
    display: flex;

    .image-preview {
        width: 140px;
        height: 140px;
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
