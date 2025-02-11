import styled from 'styled-components';
import EventSchedule from '@/components/EventSchedule/EventSchedule';
import { Label, SectionWrapper } from '@/styles/admin-club-detail/style';
import PlusIcon from '@/assets/common/plus-icon.svg?react';
import { useState } from 'react';
import { clubIntroList } from '@/constants/club-detail-register';
import { TextArea } from '@/components/Common/TextArea';
import Button from '@/components/Common/Button';

export default function ClubIntro() {
    const [schedules, setSchedules] = useState([
        <EventSchedule key={`event-schedule-1`} />,
    ]);

    const handleAddEventSchedule = () => {
        setSchedules([
            ...schedules,
            <EventSchedule key={`event-schedule-${schedules.length}`} />,
        ]);
    };

    return (
        <Container>
            <EventScheduleWrapper>
                <EventScheduleLabel>주요 활동 일정 입력</EventScheduleLabel>

                <EventScheduleForm>
                    {/* 일정 컴포넌트 리스트 */}
                    {schedules}

                    {/* 일정 추가하기 버튼 */}
                    <AddScheduleButton onClick={handleAddEventSchedule}>
                        <IconWrapper>
                            <PlusIcon />
                        </IconWrapper>
                        일정 추가하기
                    </AddScheduleButton>
                </EventScheduleForm>
            </EventScheduleWrapper>

            {/* 동아리 소개글 */}
            <ClubIntroFormContainer>
                <h2>동아리 소개글 작성</h2>

                <ClubIntroFormList>
                    {clubIntroList.map((summaryInfo, index) => (
                        <ClubIntroForm key={`club-intro-${index}`}>
                            <Label>{summaryInfo.label}</Label>
                            <TextArea
                                size="large"
                                backgroundColor="gray"
                                placeholder={summaryInfo.placeholder}
                            />
                        </ClubIntroForm>
                    ))}
                </ClubIntroFormList>
            </ClubIntroFormContainer>

            <ButtonContainer>
                <Button
                    size="small"
                    varaint="outlined"
                    isDisabled={() => false}
                >
                    미리보기
                </Button>
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
    gap: 10px;
`;

const EventScheduleWrapper = styled(SectionWrapper)`
    min-height: 169px;
    padding: 20px;
`;

const EventScheduleLabel = styled(Label)`
    margin-bottom: 20px;
`;

const EventScheduleForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const AddScheduleButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 280px;
    height: 40px;
    border-radius: 10px;

    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.subGray};
    background-color: ${({ theme }) => theme.colors.lightGray};
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ClubIntroFormContainer = styled(SectionWrapper)`
    min-height: 719px;
    margin-bottom: 5px;

    h2 {
        width: 100%;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.mainBlack};
    }
`;

const ClubIntroFormList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ClubIntroForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    margin-bottom: 26px;
`;
