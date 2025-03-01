import { useState } from 'react';
import { InputField } from '@/components/Common';
import styled from 'styled-components';
import Button from '@/components/Common/Button';
import { TextArea } from '@/components/Common/TextArea';
import { IClubRegisterValue } from '@/types';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import ClubImageUpload from './ClubImageUpload';
import { GuideText, InnerWrapper, Label } from '@/styles/admin-club-register';
import ClubCategorySelection from './ClubCategorySelection';
import useBulletPointConverter from '@/hooks/actions/useBulletPointConverter';
import useAdminClubQueries from '@/hooks/queries/useAdminClubQueries';
import { useRecoilValue } from 'recoil';
import { clubIdselector } from '@/store/clubIdState';

function ClubRegisterForm({ editMode }: { editMode: boolean }) {
    const clubId = useRecoilValue(clubIdselector);
    const [inputValue, setInputValue] = useState<IClubRegisterValue>({
        clubName: '',
        leaderEmail: '',
        category: '',
        oneLiner: '',
        briefIntroduction: '',
        image: null,
    });
    const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(
        '',
    );

    // 데이터 fetch
    const { useRegisterInfoQuery } = useAdminClubQueries();
    useRegisterInfoQuery({
        clubId,
        setInputValue,
        setPreviewImg,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append(
            'requestBody',
            new Blob([JSON.stringify(inputValue)], {
                type: 'application/json',
            }),
        );
        if (inputValue.image) {
            formData.append('image', inputValue.image);
        }

        // try {
        //     await apiRequest({
        //         url: '/api/clubs/registrations',
        //         method: 'POST',
        //         data: formData,
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //         requireToken: true,
        //     });
        // } catch (error) {
        //     console.error('등록 실패', error);
        // }
    };

    const isValid =
        (inputValue.clubName.length > 0 &&
            inputValue.leaderEmail.length > 0 &&
            inputValue.category.length > 0 &&
            inputValue.oneLiner.length > 0) ||
        (editMode &&
            inputValue.briefIntroduction &&
            inputValue.briefIntroduction.length > 0);

    return (
        <Container>
            <TitleWrapper $editMode={editMode}>
                <Title>
                    {editMode
                        ? '동아리 등록 정보 수정하기'
                        : '절차에 따라 동아리를 등록해 주세요.'}
                </Title>
                {editMode && (
                    <GuideText>수정된 정보는 승인 후 반영됩니다.</GuideText>
                )}
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
                        placeholder="동아리 이름을 정확하게 입력해 주세요."
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
                    setInputValue={setInputValue}
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
                    {editMode ? '동아리 등록 정보 수정하기' : '동아리 등록하기'}
                </Button>
            </FormContainer>
        </Container>
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
