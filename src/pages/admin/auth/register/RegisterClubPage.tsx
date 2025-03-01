import { useState } from 'react';
import { Dropdown, InputField } from '@/components/Common';
import styled from 'styled-components';
import ExpandArrowIcon from '@/assets/common/expand-arrow.svg?react';
import Button from '@/components/Common/Button';
import { uploadImageWithPreview } from '@/utils';
import useToggle from '@/hooks/actions/useToggle';
import { clubCategory } from '@/constants';
import { TextArea } from '@/components/Common/TextArea';
import { apiRequest } from '@/api/apiRequest';
import { IClubRegisterValue } from '@/types';
import { inputChangeHandler } from '@/utils/inputChangeHandler';

const RegisterClubPage = () => {
    const { isOpen, setIsOpen, toggle } = useToggle();
    const [inputValue, setInputValue] = useState<IClubRegisterValue>({
        clubName: '',
        leaderEmail: '',
        category: '',
        oneLiner: '',
        briefIntroduction: '',
    });
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [postImg, setPostImg] = useState<File | null>(null);
    const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(
        '',
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append(
            'requestBody',
            new Blob([JSON.stringify(inputValue)], {
                type: 'application/json',
            }),
        );
        if (postImg) {
            formData.append('image', postImg);
        }

        try {
            const res = await apiRequest({
                url: '/api/clubs/registrations',
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                requireToken: true,
            });
            console.log(res);
        } catch (error) {
            console.error('등록 실패', error);
        }
    };

    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        uploadImageWithPreview(e, setPostImg, setPreviewImg);
    };

    const isValid =
        inputValue.clubName.length > 0 &&
        inputValue.leaderEmail.length > 0 &&
        inputValue.category.length > 0 &&
        inputValue.oneLiner.length > 0 &&
        inputValue.briefIntroduction.length > 0;

    return (
        <Container>
            <h1>절차에 따라 동아리를 등록해 주세요.</h1>
            <FormContainer onSubmit={handleSubmit}>
                {/* 동아리 이름 */}
                <InnerWrapper>
                    <Label htmlFor="clubName">동아리 이름</Label>
                    <InputField
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
                    <span>승인 결과가 이메일로 전송됩니다.</span>
                    <InputField
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
                <InnerWrapper>
                    <Label>동아리 카테고리</Label>
                    <Dropdown setIsOpen={setIsOpen}>
                        <Dropdown.Header onClick={toggle}>
                            <DropdownHeaderWrapper
                                $selectedValue={selectedValue}
                            >
                                <h4>{selectedValue || '카테고리 선택'}</h4>
                                <IconWrapper $isOpen={isOpen}>
                                    <ExpandArrowIcon />
                                </IconWrapper>
                            </DropdownHeaderWrapper>
                        </Dropdown.Header>
                        <Dropdown.Menu isOpen={isOpen}>
                            <DropdownItemList>
                                {clubCategory.map((item, index) => (
                                    <DropdownItem
                                        key={`club-category-${index}`}
                                        onClick={() => {
                                            setSelectedValue(item.label);
                                            setInputValue({
                                                ...inputValue,
                                                category: item.name,
                                            });
                                            toggle();
                                        }}
                                        $isSelected={
                                            selectedValue === item.label
                                        }
                                    >
                                        {item.label}
                                    </DropdownItem>
                                ))}
                            </DropdownItemList>
                        </Dropdown.Menu>
                    </Dropdown>
                </InnerWrapper>

                {/* 동아리 사진 업로드 */}
                <ImageUploadWrapper>
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
                                // onChange={handleFileChange}
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
                </ImageUploadWrapper>

                {/* 동아리 한 줄 소개 */}
                <InnerWrapper>
                    <Label htmlFor="oneLiner">동아리 한 줄 소개</Label>
                    <InputField
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
                <InnerWrapper>
                    <Label htmlFor="briefIntroduction">동아리 간단 소개</Label>
                    <TextArea
                        id="briefIntroduction"
                        placeholder="동아리에 대해 간단히 소개해 주세요."
                        size="medium"
                        name="briefIntroduction"
                        maxLength={100}
                        onChange={(e) =>
                            inputChangeHandler<IClubRegisterValue>({
                                e,
                                setInputValue,
                            })
                        }
                    />
                </InnerWrapper>

                <Button type="submit" size="large" disabled={!isValid}>
                    동아리 등록하기
                </Button>
            </FormContainer>
        </Container>
    );
};

export { RegisterClubPage };

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 40px;

    h1 {
        margin-bottom: 40px;
        font-size: 16px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.mainBlack};
    }
`;

const Label = styled.label``;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding-bottom: 16px;

    ${Label} {
        width: 100%;
        padding-left: 7px;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.mainBlack};
    }
`;

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        width: 100%;
        padding-left: 7px;
        margin-bottom: 10px;
        font-size: 12px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.subGray};
    }
`;

const DropdownHeaderWrapper = styled.strong<{ $selectedValue: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 320px;
    height: 45px;
    padding: 14px 17px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.subGray};
    background-color: ${({ theme }) => theme.colors.white};

    h4 {
        font-size: 14px;
        font-weight: ${({ $selectedValue }) =>
            $selectedValue ? '500' : '400'};
        color: ${({ $selectedValue, theme }) =>
            $selectedValue ? theme.colors.mainBlack : theme.colors.subGray};
    }
`;

const IconWrapper = styled.div<{ $isOpen: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
    transition: transform 0.3s ease;
`;

const DropdownItemList = styled.ul`
    position: absolute;
    top: 5px;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;
    width: 320px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li<{ $isSelected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 145px;
    height: 36px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '400')};
    color: ${({ $isSelected, theme }) =>
        $isSelected ? theme.colors.white : theme.colors.mainBlack};
    background-color: ${({ $isSelected, theme }) =>
        $isSelected ? theme.colors.mainBlue : theme.colors.lightGray};
    cursor: pointer;
`;

const ImageUploadWrapper = styled.div`
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
