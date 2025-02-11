import styled from 'styled-components';
import { Dropdown, InputField } from '@/components/Common';
import useToggle from '@/hooks/useToggle';
import { useState } from 'react';
import DropdownArrow from '@/assets/common/dropdown_arrow.svg?react';
import {
    recruitStatus,
    summaryInfoList,
} from '@/constants/club-detail-register';
import Button from '@/components/Common/Button';
import { SectionWrapper, Label } from '@/styles/admin-club-detail/style';

export default function SummaryInfo() {
    const { isOpen, setIsOpen, toggle } = useToggle();
    const [selectedValue, setSelectedValue] = useState<string>('');

    return (
        <Container>
            <RecruitmentStatus>
                <Label>동아리 모집 여부</Label>
                <Dropdown setIsOpen={setIsOpen}>
                    <Dropdown.Header onClick={toggle}>
                        <DropdownHeaderWrapper $selectedValue={selectedValue}>
                            <h4>{selectedValue || '모집기준 선택'}</h4>
                            <div>
                                <DropdownArrow />
                            </div>
                        </DropdownHeaderWrapper>
                    </Dropdown.Header>
                    <Dropdown.Menu isOpen={isOpen}>
                        <DropdownItemList>
                            {recruitStatus.map((item, index) => (
                                <DropdownItem
                                    key={`recruit-status-${index}`}
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
            </RecruitmentStatus>

            <ClubSummaryInfo>
                <h2>동아리 요약 정보</h2>

                <SummaryInfoList>
                    {summaryInfoList.map((summaryInfo, index) => (
                        <SummaryInfoItem key={`summary-info-${index}`}>
                            <Label>{summaryInfo.label}</Label>
                            <InputField
                                inputSize={'medium'}
                                backgroundColor={'gray'}
                                placeholder={summaryInfo.placeholder}
                            />
                        </SummaryInfoItem>
                    ))}
                </SummaryInfoList>
            </ClubSummaryInfo>

            <ApplyLink>
                <Label>동아리 신청 폼 링크</Label>
                <InputField
                    inputSize={'medium'}
                    backgroundColor={'gray'}
                    placeholder="신청 폼 링크를 정확하게 입력해 주세요."
                />
            </ApplyLink>

            <ButtonContainer>
                <Button size="small">미리보기</Button>
                <Button size="small" isDisabled={() => false}>
                    저장하기
                </Button>
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 815px;
    gap: 10px;
`;

const RecruitmentStatus = styled(SectionWrapper)`
    height: 101px;
    gap: 8px;
`;

const DropdownHeaderWrapper = styled.div<{ $selectedValue: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 280px;
    height: 40px;
    padding: 0 15px;
    border-radius: 10px;
    h4 {
        font-size: 14px;
        font-weight: ${({ $selectedValue }) =>
            $selectedValue ? '500' : '400'};
        color: ${({ $selectedValue, theme }) =>
            $selectedValue ? theme.colors.mainBlack : theme.colors.subGray};
    }
    background-color: ${({ theme }) => theme.colors.lightGray};
`;

const DropdownItemList = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    position: absolute;
    top: 11px;
    left: 0;
    width: 280px;
    height: 138px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li<{ $isSelected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260px;
    height: 36px;
    border-radius: 5px;

    font-size: 14px;
    color: ${({ $isSelected, theme }) =>
        $isSelected ? theme.colors.white : theme.colors.mainBlack};
    background-color: ${({ $isSelected, theme }) =>
        $isSelected ? theme.colors.mainBlue : theme.colors.lightGray};
    cursor: pointer;
`;

const ClubSummaryInfo = styled(SectionWrapper)`
    height: 472px;

    h2 {
        width: 100%;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.mainBlack};
    }
`;

const SummaryInfoList = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
`;

const SummaryInfoItem = styled.li`
    display: flex;
    flex-direction: column;
    item-align: center;
    gap: 10px;
`;

const ApplyLink = styled(SectionWrapper)`
    height: 101px;
    gap: 8px;
    margin-bottom: 45px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
`;
