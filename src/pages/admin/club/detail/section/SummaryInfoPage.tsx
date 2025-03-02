import styled from 'styled-components';
import { InputField } from '@/components/Common';
import { useState } from 'react';
import { summaryInfoList } from '@/constants/club-detail-register';
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
import useClubDetailQueries from '@/hooks/queries/useAdminClubQueries';
import useAdminClubMutation from '@/hooks/queries/useAdminClubMutation';
import { RecruitmentStatus } from '@/components/AdminClubDetail';

function SummaryInfoPage() {
    const clubId = useRecoilValue(clubIdselector);
    const [inputValue, setInputValue] = useState<ISummaryInfoValue>({
        recruitmentStatus: '',
        leaderName: '',
        leaderPhone: '',
        activities: '',
        membershipFee: null,
        snsUrl: '',
        applicationUrl: '',
    });

    // 데이터 fetch
    const { useSummaryInfoQuery } = useClubDetailQueries();
    const { isPending } = useSummaryInfoQuery({ clubId, setInputValue });

    // 데이터 저장 mutation 호출
    const { useSaveSummaryInfoMutation } = useAdminClubMutation();
    const saveSummaryInfoMutation = useSaveSummaryInfoMutation({
        clubId,
        inputValue,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            saveSummaryInfoMutation.mutate(); // 데이터 저장
        } catch (err) {
            console.error('저장 실패', err);
        }
    };

    const isValid =
        inputValue.recruitmentStatus.length > 0 &&
        inputValue.leaderName.length > 0 &&
        inputValue.leaderPhone.length > 0 &&
        inputValue.activities.length > 0 &&
        inputValue.membershipFee &&
        inputValue.applicationUrl.length > 0;

    return (
        <FormContainer onSubmit={handleSubmit}>
            {/* 동아리 모집 여부 */}
            <RecruitmentStatus
                inputValue={inputValue}
                setInputValue={setInputValue}
            />

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
                                value={
                                    inputValue[
                                        summaryInfo.name as keyof ISummaryInfoValue
                                    ] ?? ''
                                }
                                type={
                                    summaryInfo.name === 'membershipFee'
                                        ? 'number'
                                        : 'text'
                                }
                                name={summaryInfo.name}
                                inputSize={'medium'}
                                backgroundColor={'gray'}
                                placeholder={
                                    isPending ? '' : summaryInfo.placeholder
                                }
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
                    value={inputValue.applicationUrl}
                    name="applicationUrl"
                    inputSize={'medium'}
                    backgroundColor={'gray'}
                    placeholder={
                        isPending
                            ? ''
                            : '신청 폼 링크를 정확하게 입력해 주세요.'
                    }
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

export { SummaryInfoPage };

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
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
