import useActivityLogContext from '@/hooks/contexts/useClubIntroContext';
import { uploadImageListHandler } from '@/utils/uploadImageListHandler';
import styled from 'styled-components';

function ImageListUpload() {
    const {
        setPostImg,
        previewImg,
        setPreviewImg,
        currentIdx,
        mode,
        isEditBtnClicked,
    } = useActivityLogContext();

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
                disabled={mode === 'edit' && !isEditBtnClicked}
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
