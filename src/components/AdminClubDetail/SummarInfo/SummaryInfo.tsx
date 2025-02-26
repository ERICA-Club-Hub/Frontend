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
import {
    SectionWrapper,
    Label,
    ButtonGroupWrapper,
} from '@/styles/admin-club-detail/style';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import { ISummaryInfoValue } from '@/types';
import { useRecoilValue } from 'recoil';
import { clubIdselector } from '@/store/clubIdState';
import { apiRequest } from '@/api/apiRequest';

function SummaryInfo() {
    const clubId = useRecoilValue(clubIdselector);
    const { isOpen, setIsOpen, toggle } = useToggle();
    const [inputValue, setInputValue] = useState<ISummaryInfoValue>({
        recruitmentStatus: '',
        leaderName: '',
        leaderPhone: '',
        activities: '',
        membershipFee: '',
        snsUrl: '',
        applicationUrl: '',
    });
    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await apiRequest({
                method: 'post',
                url: `/api/clubs/club-admin/${clubId}`,
                data: inputValue,
                requireToken: true,
            });
            console.log(res);
        } catch (err) {
            console.error('저장 실패', err);
        }
    };

    const handleRecruitmentStatus = (item: {
        label: string;
        value: string;
    }) => {
        setSelectedValue(item.label);
        setInputValue({
            ...inputValue,
            recruitmentStatus: item.value,
        });
        toggle();
    };

    const isValid =
        inputValue.recruitmentStatus.length > 0 &&
        inputValue.leaderName.length > 0 &&
        inputValue.leaderPhone.length > 0 &&
        inputValue.activities.length > 0 &&
        inputValue.membershipFee.length > 0 &&
        inputValue.applicationUrl.length > 0;

    return (
        <FormContainer onSubmit={handleSubmit}>
            {/* 동아리 모집 여부 */}
            <RecruitmentStatus>
                <Label>동아리 모집 여부</Label>
                <Dropdown setIsOpen={setIsOpen}>
                    <Dropdown.Header onClick={toggle}>
                        <DropdownHeaderWrapper $selectedValue={selectedValue}>
                            <h4>{selectedValue || '모집기준 선택'}</h4>
                            <IconWrapper $isOpen={isOpen}>
                                <DropdownArrow />
                            </IconWrapper>
                        </DropdownHeaderWrapper>
                    </Dropdown.Header>
                    <Dropdown.Menu isOpen={isOpen}>
                        <DropdownItemList>
                            {recruitStatus.map((item, index) => (
                                <DropdownItem
                                    key={`recruit-status-${index}`}
                                    onClick={() =>
                                        handleRecruitmentStatus(item)
                                    }
                                    $isSelected={selectedValue === item.label}
                                >
                                    {item.label}
                                </DropdownItem>
                            ))}
                        </DropdownItemList>
                    </Dropdown.Menu>
                </Dropdown>
            </RecruitmentStatus>

            {/* 동아리 요약 정보 */}
            <ClubSummaryInfo>
                <h2>동아리 요약 정보</h2>

                <SummaryInfoList>
                    {summaryInfoList.map((summaryInfo, index) => (
                        <SummaryInfoItem key={`summary-info-${index}`}>
                            <LabelContainer>
                                <Label
                                    style={
                                        // SNS 한정 width 조정 (100% -> auto)
                                        summaryInfo.label === 'SNS'
                                            ? { width: 'auto' }
                                            : {}
                                    }
                                >
                                    {summaryInfo.label}
                                </Label>
                                {summaryInfo.label === 'SNS' && (
                                    <SNSLabel>(선택)</SNSLabel>
                                )}
                            </LabelContainer>
                            <InputField
                                name={summaryInfo.name}
                                inputSize={'medium'}
                                backgroundColor={'gray'}
                                placeholder={summaryInfo.placeholder}
                                onChange={(e) =>
                                    inputChangeHandler<ISummaryInfoValue>({
                                        e,
                                        setInputValue,
                                    })
                                }
                                maxLength={20}
                            />
                        </SummaryInfoItem>
                    ))}
                </SummaryInfoList>
            </ClubSummaryInfo>

            {/* 동아리 신청 폼 링크 */}
            <ApplyLink>
                <Label>동아리 신청 폼 링크</Label>
                <InputField
                    name="applicationUrl"
                    inputSize={'medium'}
                    backgroundColor={'gray'}
                    placeholder="신청 폼 링크를 정확하게 입력해 주세요."
                    onChange={(e) =>
                        inputChangeHandler<ISummaryInfoValue>({
                            e,
                            setInputValue,
                        })
                    }
                />
            </ApplyLink>

            <ButtonGroupWrapper>
                <Button
                    type="button"
                    size="small"
                    variant="outlined"
                    isDisabled={() => false}
                >
                    미리보기
                </Button>
                <Button type="submit" size="small" disabled={!isValid}>
                    저장하기
                </Button>
            </ButtonGroupWrapper>
        </FormContainer>
    );
}

export { SummaryInfo };

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
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

const IconWrapper = styled.div<{ $isOpen?: boolean }>`
    transform: ${({ $isOpen }) =>
        $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.4s ease;
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

const LabelContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
`;

const SNSLabel = styled.span`
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.subGray};
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
