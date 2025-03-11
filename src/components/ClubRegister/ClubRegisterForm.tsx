import { useState } from 'react';
import styled from 'styled-components';
import { InputField } from '@/components/Common';
import Button from '@/components/Common/Button';
import { TextArea } from '@/components/Common/TextArea';
import { IClubRegisterValue } from '@/types';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import { GuideText, InnerWrapper, Label } from '@/styles/admin-club-register';
import useBulletPointConverter from '@/hooks/actions/useBulletPointConverter';
import ClubImageUpload from './ClubImageUpload';
import { ClubCategorySelection } from './ClubCategorySelection';
import useClubRegisterQueries from '@/hooks/queries/useClubRegisterQueries';
import { setDefaultImg } from '@/utils/setDefaultImg';
import LoadingModal from '../Common/Loading/LoadingModal';

function ClubRegisterForm({ editMode }: { editMode: boolean }) {
    const [inputValue, setInputValue] = useState<IClubRegisterValue>({
        clubName: '',
        leaderEmail: '',
        category: '',
        oneLiner: '',
        briefIntroduction: '',
    });
    const [postImg, setPostImg] = useState<File | File[] | null>(null); // 요청 이미지
    const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(
        '/placeholder-image.svg',
    ); // 미리보기 이미지
    setDefaultImg({ postImg, setPostImg });

    const {
        useRegisterInfoQuery,
        useClubRegisterMutation,
        useEditClubRegisterMutation,
    } = useClubRegisterQueries();
    // 수정모드일 때 데이터 fetch
    useRegisterInfoQuery({
        setInputValue,
        setPreviewImg,
        setPostImg,
    });
    // 등록 정보 생성 및 수정 mutation 호출
    const clubRegisterMutation = useClubRegisterMutation();
    const editClubRegisterMutation = useEditClubRegisterMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // FormData 생성
        const formData: FormData = new FormData();
        const requestBody = {
            ...inputValue,
            // 간단한 소개 폼이 등록 정보 수정에는 없는데 API 요청 폼에는 추가해줘야 해서 예외처리
            briefIntroduction: inputValue.briefIntroduction || '',
        };
        formData.append(
            'requestBody',
            new Blob([JSON.stringify(requestBody)], {
                type: 'application/json',
            }),
        );
        if (postImg) {
            if (Array.isArray(postImg)) {
                postImg.forEach((file) => formData.append('image', file));
            } else {
                formData.append('image', postImg);
            }
        }

        // 수정모드일 때
        if (editMode) {
            editClubRegisterMutation.mutate(formData); // 등록 정보 수정하기
        } else if (!editMode) {
            // 등록모드일 때
            clubRegisterMutation.mutate(formData);
        }
    };

    const isValid =
        inputValue.clubName.length > 0 &&
        inputValue.leaderEmail.length > 0 &&
        inputValue.category.length > 0 &&
        postImg &&
        inputValue.oneLiner.length > 0 &&
        // 등록 모드일 때는 간단소개 포함 (예외 처리)
        (editMode ||
            (inputValue.briefIntroduction &&
                inputValue.briefIntroduction.length > 0)) &&
        // 요청 중일 때
        (!clubRegisterMutation.isPending ||
            !editClubRegisterMutation.isPending);

    return (
        <>
            <Container>
                <TitleWrapper $editMode={editMode}>
                    <Title>
                        {editMode
                            ? '동아리 등록 정보 수정하기'
                            : '절차에 따라 동아리를 등록해 주세요.'}
                    </Title>
                </TitleWrapper>

                <FormContainer onSubmit={handleSubmit}>
                    {/* 동아리 이름 */}
                    <InnerWrapper>
                        <Label htmlFor="clubName">동아리 이름</Label>
                        <InputField
                            value={inputValue.clubName}
                            id="clubName"
                            type="text"
                            placeholder="동아리 이름을 정확하게 입력해 주세요."
                            inputSize="large"
                            name="clubName"
                            maxLength={30}
                            onChange={(e) =>
                                inputChangeHandler<IClubRegisterValue>({
                                    e,
                                    setInputValue,
                                })
                            }
                        />
                    </InnerWrapper>

                    {/* 동아리 이메일 */}
                    <InnerWrapper>
                        <Label
                            htmlFor="leaderEmail"
                            style={{ marginBottom: '5px' }}
                        >
                            동아리 이메일
                        </Label>
                        <GuideText>승인 결과가 이메일로 전송됩니다.</GuideText>
                        <InputField
                            value={inputValue.leaderEmail}
                            id="leaderEmail"
                            type="text"
                            placeholder="이메일을 정확하게 입력해 주세요."
                            inputSize="large"
                            name="leaderEmail"
                            maxLength={30}
                            onChange={(e) =>
                                inputChangeHandler<IClubRegisterValue>({
                                    e,
                                    setInputValue,
                                })
                            }
                        />
                    </InnerWrapper>

                    {/* 동아리 카테고리 */}
                    <ClubCategorySelection
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                    />

                    {/* 동아리 사진 업로드 */}
                    <ClubImageUpload
                        setPostImg={setPostImg}
                        previewImg={previewImg}
                        setPreviewImg={setPreviewImg}
                    />

                    {/* 동아리 한 줄 소개 */}
                    <InnerWrapper>
                        <Label htmlFor="oneLiner">동아리 한 줄 소개</Label>
                        <InputField
                            value={inputValue.oneLiner}
                            id="oneLiner"
                            type="text"
                            placeholder="동아리를 한 줄로 소개해 주세요."
                            inputSize="large"
                            name="oneLiner"
                            maxLength={30}
                            onChange={(e) =>
                                inputChangeHandler<IClubRegisterValue>({
                                    e,
                                    setInputValue,
                                })
                            }
                        />
                    </InnerWrapper>

                    {/* 동아리 간단 소개 */}
                    {/* 서비스 관리자가 확인하기 위한 데이터라서 수정모드에서는 불러오지 않음 */}
                    {editMode || (
                        <InnerWrapper>
                            <Label htmlFor="briefIntroduction">
                                동아리 간단 소개
                            </Label>
                            <TextArea
                                id="briefIntroduction"
                                placeholder="동아리에 대해 간단히 소개해 주세요."
                                size="medium"
                                name="briefIntroduction"
                                maxLength={100}
                                value={inputValue.briefIntroduction}
                                onChange={(e) =>
                                    inputChangeHandler<IClubRegisterValue>({
                                        e,
                                        setInputValue,
                                    })
                                }
                                onKeyDown={(e) =>
                                    useBulletPointConverter({
                                        e,
                                        setInputValue,
                                    })
                                }
                            />
                        </InnerWrapper>
                    )}

                    <Button type="submit" size="large" disabled={!isValid}>
                        {editMode
                            ? '동아리 등록 정보 수정하기'
                            : '동아리 등록하기'}
                    </Button>
                </FormContainer>
            </Container>

            <LoadingModal
                isPending={
                    clubRegisterMutation.isPending ||
                    editClubRegisterMutation.isPending
                }
                isSuccess={
                    clubRegisterMutation.isSuccess ||
                    editClubRegisterMutation.isSuccess
                }
            />
        </>
    );
}

export { ClubRegisterForm };

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding-top: 40px;
`;

const TitleWrapper = styled.div<{ $editMode: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 320px;
    margin-bottom: ${({ $editMode }) => ($editMode ? '30px' : '40px')};
`;

const Title = styled.h1`
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainBlack};
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding-bottom: 16px;
`;
