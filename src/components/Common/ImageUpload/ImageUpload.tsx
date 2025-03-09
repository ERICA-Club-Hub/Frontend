import { uploadImageWithPreview } from '@/utils';
import styled from 'styled-components';

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

function ImageUpload({
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
        <ImageContainer>
            <label htmlFor="image" className="image-preview-label">
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
                disabled={mode === 'edit' && !isEditBtnClicked}
            />
        </ImageContainer>
    );
}

export { ImageUpload };

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
