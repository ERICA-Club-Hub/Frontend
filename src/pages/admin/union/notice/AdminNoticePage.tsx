import { InputField } from '@/components/Common';
import Button from '@/components/Common/Button';
import { useState } from 'react';
import styled from 'styled-components';

const AdminNoticePage = () => {
    const [inputValue, setInputValue] = useState<{
        name: string;
        email: string;
        category: string;
        image: File[];
    }>({
        name: '',
        email: '',
        category: '',
        image: [],
    });
    const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(
        null,
    );

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        let fileArr = e.target.files;
        if (fileArr) {
            setInputValue((prev) => ({ ...prev, image: Array.from(fileArr) }));
        }

        let fileRead = new FileReader();

        fileRead.onload = () => {
            setPreviewImg(fileRead.result);
        };

        fileRead.onerror = () => {
            console.log('이미지 읽기 중 오류 발생');
        };

        if (fileArr!.length > 0) {
            fileRead.readAsDataURL(fileArr![0]);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(inputValue);
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Wrapper>
                <Title>공지사항 제목을 입력해 주세요.</Title>
                <InputField
                    type="text"
                    inputSize="medium"
                    backgroundColor="gray"
                    placeholder="제목을 입력해 주세요."
                />
            </Wrapper>

            <Wrapper>
                <div className="title-wrapper">
                    <Title>썸네일을 업로드 해주세요.</Title>
                    <span>
                        SNS의 첫 페이지로 들어가는 사진을 업로드해 주세요.
                    </span>
                </div>

                <ImageContainer>
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
                        onChange={handleImageUpload}
                    />
                </ImageContainer>
            </Wrapper>

            <Wrapper>
                <div className="title-wrapper">
                    <Title>SNS 링크를 입력해 주세요.</Title>
                    <span>공지사항 클릭 시, 해당 SNS 게시물로 이동합니다.</span>
                </div>
                <InputField
                    type="text"
                    inputSize="medium"
                    backgroundColor="gray"
                    placeholder="SNS 링크를 정확히 입력해 주세요."
                />
            </Wrapper>

            <ButtonWrapper>
                <Button type="submit" size="small" disabled={false}>
                    저장하기
                </Button>
            </ButtonWrapper>
        </FormContainer>
    );
};

export { AdminNoticePage };

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding-top: 15px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 320px;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 10px;

    .title-wrapper {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;

        span {
            font-size: 12px;
            font-weight: 400;
            color: ${({ theme }) => theme.colors.subGray};
    }
`;

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

const Title = styled.h2`
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainBlack};
`;

const ImagePreview = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
`;

const ButtonWrapper = styled.div`
    width: 320px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
