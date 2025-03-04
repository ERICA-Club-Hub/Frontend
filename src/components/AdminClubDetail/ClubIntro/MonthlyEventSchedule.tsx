import { Label, SectionWrapper } from '@/styles/admin-club-detail/style';
import styled from 'styled-components';
import PlusIcon from '@/assets/common/plus-icon.svg?react';
import { EventSchedule } from './EventSchedule';
import useClubIntroContext from '@/hooks/contexts/useClubIntroContext';
import { useRecoilValue } from 'recoil';
import { clubIdSelector } from '@/store/clubInfoState';
import useAdminClubQueries from '@/hooks/queries/useAdminClubQueries';

function MonthlyEventSchedule() {
    const clubId = useRecoilValue(clubIdSelector);
    const { schedules, setSchedules } = useClubIntroContext();

    // 월별 활동 일정 불러오기
    const { useEventSchedulesQuery } = useAdminClubQueries();
    useEventSchedulesQuery({ clubId, setSchedules });

    // 월별 일정 추가
    const handleAddEventSchedule = () => {
        setSchedules([...schedules, { month: 1, content: '' }]);
    };

    return (
        <Container>
            <EventScheduleLabel>주요 활동 일정 입력</EventScheduleLabel>

            <EventScheduleForm>
                {/* 일정 컴포넌트 리스트 */}
                {schedules.map((schedule, index) => (
                    <EventSchedule
                        key={`event-schedule-${index}`}
                        schedule={schedule}
                        index={index}
                    />
                ))}

                {/* 일정 추가하기 버튼 */}
                <AddScheduleButton onClick={handleAddEventSchedule}>
                    <IconWrapper>
                        <PlusIcon />
                    </IconWrapper>
                    일정 추가하기
                </AddScheduleButton>
            </EventScheduleForm>
        </Container>
    );
}

export { MonthlyEventSchedule };

const Container = styled(SectionWrapper)`
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
