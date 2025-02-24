import { useState } from 'react';
import { Dropdown, InputField } from '@/components/Common';
import styled from 'styled-components';
import ExpandArrowIcon from '@/assets/common/expand-arrow.svg?react';
import Button from '@/components/Common/Button';
import { uploadImageWithPreview } from '@/utils';
import { InputValue } from '@/types';
import useToggle from '@/hooks/useToggle';
import { clubCategory } from '@/constants';
import { TextArea } from '@/components/Common/TextArea';

const RegisterClubPage = () => {
    const { isOpen, setIsOpen, toggle } = useToggle();
    const [inputValue, setInputValue] = useState<InputValue>({
        name: '',
        email: '',
        category: '',
        image: [],
    });
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(
        null,
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(inputValue);
    };

    return (
        <Container>
            <h1>절차에 따라 동아리를 등록해 주세요.</h1>
            <FormContainer onSubmit={handleSubmit}>
                <InnerWrapper>
                    <Label htmlFor="name">동아리 이름</Label>
                    <InputField
                        id="name"
                        type="text"
                        // value={'df'}
                        placeholder="동아리 이름을 정확하게 입력해 주세요."
                        inputSize="large"
                    />
                </InnerWrapper>

                <InnerWrapper>
                    <Label htmlFor="email" style={{ marginBottom: '5px' }}>
                        동아리 이메일
                    </Label>
                    <span>승인 결과가 이메일로 전송됩니다.</span>
                    <InputField
                        id="email"
                        type="text"
                        // value={'df'}
                        placeholder="동아리 이름을 정확하게 입력해 주세요."
                        inputSize="large"
                    />
                </InnerWrapper>

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
                                            setSelectedValue(item);
                                            toggle();
                                        }}
                                        $isSelected={selectedValue === item}
                                    >
                                        {item}
                                    </DropdownItem>
                                ))}
                            </DropdownItemList>
                        </Dropdown.Menu>
                    </Dropdown>
                </InnerWrapper>

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
                                onChange={(e) =>
                                    uploadImageWithPreview(
                                        e,
                                        setInputValue,
                                        setPreviewImg,
                                    )
                                }
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

                <InnerWrapper>
                    <Label htmlFor="club-introduction">동아리 한 줄 소개</Label>
                    <InputField
                        id="club-introduction"
                        type="text"
                        placeholder="동아리를 한 줄로 소개해 주세요."
                        inputSize="large"
                    />
                </InnerWrapper>

                <InnerWrapper>
                    <Label htmlFor="club-description">동아리 간단 소개</Label>
                    <TextArea
                        id="club-description"
                        placeholder="동아리에 대해 간단히 소개해 주세요."
                        size="medium"
                    />
                </InnerWrapper>

                <Button type="submit" size="large" disabled={false}>
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
