import { InputField } from '@/components/Common';
import Button from '@/components/Common/Button';
import ThumbnailImageUpload from '@/components/UnionNotice/ThumbnailImageUpload';
import useUnionQueries from '@/hooks/queries/useUnionQueries';
import { IUnionNoticeValue } from '@/types';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AdminUnionNoticeRegisterPage = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        title: '',
        url: '',
    });
    const [postImg, setPostImg] = useState<File | null>(null); // 요청 이미지
    const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(
        '',
    ); // 미리보기 이미지

    // FormData 생성
    const formData: FormData = new FormData();

    formData.append(
        'requestBody',
        new Blob([JSON.stringify(inputValue)], {
            type: 'application/json',
        }),
    );
    if (postImg) {
        formData.append('thumbnail', postImg);
    }

    const { useCreateUnionNoticeMutation } = useUnionQueries();
    const createUnionNoticeMutation = useCreateUnionNoticeMutation({
        formData,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            createUnionNoticeMutation.mutate();
            navigate('/admin/union/notice');
        } catch (error) {
            console.error('총동연 공지사항 생성 실패', error);
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            {/* 공지사항 제목 */}
            <Wrapper>
                <Title>공지사항 제목을 입력해 주세요.</Title>
                <InputField
                    value={inputValue.title}
                    name="title"
                    type="text"
                    inputSize="medium"
                    backgroundColor="gray"
                    placeholder="제목을 입력해 주세요."
                    onChange={(e) =>
                        inputChangeHandler<IUnionNoticeValue>({
                            e,
                            setInputValue,
                        })
                    }
                />
            </Wrapper>

            {/* 썸네일 업로드 */}
            <Wrapper>
                <div className="title-wrapper">
                    <Title>썸네일을 업로드 해주세요.</Title>
                    <span>
                        SNS의 첫 페이지로 들어가는 사진을 업로드해 주세요.
                    </span>
                </div>

                <ThumbnailImageUpload
                    setPostImg={setPostImg}
                    previewImg={previewImg}
                    setPreviewImg={setPreviewImg}
                />
            </Wrapper>

            {/* SNS 링크 입력 */}
            <Wrapper>
                <div className="title-wrapper">
                    <Title>SNS 링크를 입력해 주세요.</Title>
                    <span>공지사항 클릭 시, 해당 SNS 게시물로 이동합니다.</span>
                </div>
                <InputField
                    value={inputValue.url}
                    name="url"
                    type="text"
                    inputSize="medium"
                    backgroundColor="gray"
                    placeholder="SNS 링크를 정확히 입력해 주세요."
                    onChange={(e) =>
                        inputChangeHandler<IUnionNoticeValue>({
                            e,
                            setInputValue,
                        })
                    }
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

export { AdminUnionNoticeRegisterPage };

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

const Title = styled.h2`
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainBlack};
`;

const ButtonWrapper = styled.div`
    width: 320px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
