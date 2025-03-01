import { uploadImageWithPreview } from '@/utils';
import { useState } from 'react';
import styled from 'styled-components';

export default function ClubImageUpload({
    setPostImg,
}: {
    setPostImg: React.Dispatch<React.SetStateAction<File | null>>;
}) {
    const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(
        '',
    );

    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        uploadImageWithPreview(e, setPostImg, setPreviewImg);
    };

    return (
        <Container>
            <Label>동아리 사진 업로드</Label>
            <ImageContainer>
                <div className="image-upload-container">
                    <label htmlFor="image" className="image-preview">
                        {previewImg && (
                            <ImagePreview
                                src={
                                    typeof previewImg === 'string'
                                        ? previewImg
                                        : ''
                                }
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
                </div>

                <div className="upload-guide">
                    <p>
                        동아리 대표 사진을 <br />
                        업로드해 주세요.
                    </p>
                    <span>500kb까지 업로드 가능합니다.</span>
                </div>
            </ImageContainer>
        </Container>
    );
}

const Label = styled.label`
    width: 100%;
    padding-left: 7px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainBlack};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const ImageContainer = styled.div`
    width: 320px;
    height: 100px;
    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    gap: 20px;
    border-radius: 10px;
    padding: 10px;

    .image-preview {
        display: flex;
        justify-content: center;
        align-item: center;
        width: 80px;
        height: 80px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.colors.mediumGray};
        cursor: pointer;
    }

    input {
        display: none;
    }

    .upload-guide {
        display: flex;
        flex-direction: column;
        gap: 7px;

        p {
            font-size: 14px;
            font-weight: 400;
            color: ${({ theme }) => theme.colors.subGray};
        }

        span {
            font-size: 12px;
            font-weight: 400;
            color: ${({ theme }) => theme.colors.subGray};
            text-decoration: underline;
        }
    }
`;

const ImagePreview = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
`;
