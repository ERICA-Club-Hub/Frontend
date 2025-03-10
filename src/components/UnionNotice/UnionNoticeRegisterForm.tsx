import styled from 'styled-components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputField } from '@/components/Common';
import Button from '@/components/Common/Button';
import useUnionQueries from '@/hooks/queries/useUnionQueries';
import { IUnionNoticeValue } from '@/types';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import useToggle from '@/hooks/actions/useToggle';
import ActionModal from '../Common/Modal/ActionModal';
import { ImageUpload } from '../Common/ImageUpload/ImageUpload';

function UnionNoticeRegisterForm({ mode }: { mode: string }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { announcementId } = location.state || {}; // 전달된 state에서 announcementId 받아오기
    const { isOpen, toggle } = useToggle();

    const [inputValue, setInputValue] = useState({
        title: '',
        url: '',
    });
    const [postImg, setPostImg] = useState<File | File[] | null>(null); // 요청 이미지
    const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>( // 미리보기 이미지
        '',
    );
    const [isEditBtnClicked, setIsEditBtnClicked] = useState<boolean>(false);

    // 총동연 특정 공지사항 정보 불러오기 Query 호출
    if (mode === 'edit' && announcementId) {
        const { useUnionNoticeQuery } = useUnionQueries();
        useUnionNoticeQuery({
            announcementId,
            setInputValue,
            setPreviewImg,
            setPostImg,
        });
    }

    // FormData 생성
    const formData: FormData = new FormData();

    formData.append(
        'requestBody',
        new Blob([JSON.stringify(inputValue)], {
            type: 'application/json',
        }),
    );
    if (postImg) {
        if (Array.isArray(postImg)) {
            formData.append('thumbnail', postImg[0]);
        } else {
            formData.append('thumbnail', postImg);
        }
    }

    // 총동연 공지사항 CRUD Mutation 호출
    const {
        useCreateUnionNoticeMutation,
        useUpdateUnionNoticeMutation,
        useDeleteUnionNoticeMutation,
    } = useUnionQueries();
    const createUnionNoticeMutation = useCreateUnionNoticeMutation({
        formData,
    });
    const updateUnionNoticeMutation = useUpdateUnionNoticeMutation({
        announcementId,
        formData,
    });
    const deleteUnionNoticeMutation = useDeleteUnionNoticeMutation({
        announcementId,
    });

    // 공지사항 저장하기
    const handleSaveUnionNotice = () => {
        // 등록 모드일 때 공지사항 생성
        if (mode === 'register') {
            createUnionNoticeMutation.mutate();
        }
        // 수정 모드일 때 공지사항 수정
        else if (mode === 'edit') {
            updateUnionNoticeMutation.mutate();
        }
        navigate('/admin/union/notice');
    };

    // 공지사항 삭제하기
    const handleDeleteUnionNotice = () => {
        deleteUnionNoticeMutation.mutate();
        navigate('/admin/union/notice');
    };

    // 공지사항 저장하기 버튼 활성화 여부
    const isValid =
        inputValue.title.length > 0 &&
        inputValue.url.length > 0 &&
        postImg !== null;

    return (
        <>
            <FormContainer>
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
                        disabled={mode === 'edit' && !isEditBtnClicked}
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

                    <ImageUpload
                        setPostImg={setPostImg}
                        previewImg={previewImg}
                        setPreviewImg={setPreviewImg}
                        mode={mode}
                        isEditBtnClicked={isEditBtnClicked}
                    />
                </Wrapper>

                {/* SNS 링크 입력 */}
                <Wrapper>
                    <div className="title-wrapper">
                        <Title>SNS 링크를 입력해 주세요.</Title>
                        <span>
                            공지사항 클릭 시, 해당 SNS 게시물로 이동합니다.
                        </span>
                    </div>
                    <InputField
                        value={inputValue.url}
                        name="url"
                        type="text"
                        inputSize="medium"
                        backgroundColor="gray"
                        placeholder="SNS 링크를 정확히 입력해 주세요."
                        disabled={mode === 'edit' && !isEditBtnClicked}
                        onChange={(e) =>
                            inputChangeHandler<IUnionNoticeValue>({
                                e,
                                setInputValue,
                            })
                        }
                    />
                </Wrapper>

                <ButtonWrapper>
                    {mode === 'edit' && !isEditBtnClicked ? (
                        <>
                            <Button
                                type="button"
                                size="small"
                                variant="outlined"
                                outlineColor="#DC5151"
                                disabled={false}
                                onClick={toggle}
                            >
                                삭제하기
                            </Button>
                            <Button
                                type="button"
                                size="small"
                                variant="outlined"
                                disabled={!isValid}
                                onClick={() => setIsEditBtnClicked(true)}
                            >
                                수정하기
                            </Button>
                        </>
                    ) : (
                        <Button
                            type="button"
                            size="small"
                            disabled={!isValid}
                            onClick={handleSaveUnionNotice}
                        >
                            저장하기
                        </Button>
                    )}
                </ButtonWrapper>
            </FormContainer>

            {/* 삭제하기 Modal */}
            <ActionModal
                isOpen={isOpen}
                toggle={toggle}
                action={handleDeleteUnionNotice}
            />
        </>
    );
}

export { UnionNoticeRegisterForm };

const FormContainer = styled.div`
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
    gap: 5px;
`;
