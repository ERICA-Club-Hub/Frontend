import { Dropdown, InputField } from '@/components/Common';
import styled from 'styled-components';
import ExpandArrowIcon from '@/assets/common/expand-arrow.svg?react';
import { useState } from 'react';

const RegisterClubPage = () => {
    const [inputValue, setInputValue] = useState({
        name: '',
        email: '',
        category: '',
    });
    const [selectedValue, setSelectedValue] = useState<string>('');

    console.log(inputValue);

    return (
        <Container>
            <h1>절차에 따라 동아리를 등록해 주세요.</h1>

            <FormContainer>
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
                    <Label htmlFor="category">동아리 카테고리</Label>
                    <Dropdown
                        size="large"
                        icon={<ExpandArrowIcon />}
                        selectedValue={selectedValue}
                    >
                        <DropdownList>
                            {[
                                '봉사분과',
                                '예술분과',
                                '종교분과',
                                '체육분과',
                                '학술교양분과',
                                '연합동아리',
                            ].map((item, index) => (
                                <DropdownItem
                                    key={index}
                                    onClick={() => setSelectedValue(item)}
                                    $isSelected={selectedValue === item}
                                >
                                    {item}
                                </DropdownItem>
                            ))}
                        </DropdownList>
                    </Dropdown>
                </InnerWrapper>
            </FormContainer>
        </Container>
    );
};

export { RegisterClubPage };

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;

    h1 {
        margin-bottom: 40px;
        font-size: 16px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.mainBlack};
    }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
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

const Label = styled.label`
    width: 100%;
    padding-left: 7px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainBlack};
`;

const DropdownList = styled.ul`
    flex-wrap: wrap;
    padding: 10px;
    gap: 10px;
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
`;
