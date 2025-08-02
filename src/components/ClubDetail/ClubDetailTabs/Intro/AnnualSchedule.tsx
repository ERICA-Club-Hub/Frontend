import styled from 'styled-components';
import ContentBlock from '../ContentBlock';
import { useState } from 'react';

interface Schedule {
    month: string;
    content: string;
}

export default function AnnualSchedule() {
    const [schedules, setSchedules] = useState<Schedule[]>();

    return (
        <ContentBlock title="주요 연간 일정">
            {schedules && schedules.length > 0 ? (
                <ScheduleContents>
                    {schedules.map((schedule) => (
                        <ContentsRow key={schedule.month}>
                            <ContentsLabel>{schedule.month}월</ContentsLabel>
                            <ContentsValue>{schedule.content}</ContentsValue>
                        </ContentsRow>
                    ))}
                </ScheduleContents>
            ) : (
                <SchedulesNull>
                    <XSize>🅧</XSize>
                    <div>주요 연간 일정이 비었어요.</div>
                </SchedulesNull>
            )}
        </ContentBlock>
    );
}

const ScheduleContents = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ContentsRow = styled.div`
    display: flex;
`;

const ContentsLabel = styled.span`
    display: flex;
    background-color: #eef4ff;
    border-radius: 100px;
    width: 35px;
    height: 20px;
    justify-content: center;
    align-items: center;
    color: #33639c;
    font-size: 12px;
    font-weight: 600;
`;

const ContentsValue = styled.span`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    font-weight: 500;
    margin-top: 1px;
    margin-left: 7px;
`;

const SchedulesNull = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 8px;
`;

const XSize = styled.span`
    font-size: 30px;
`;
