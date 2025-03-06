import { IClubIntroValue, IEventScheduleValue } from './input-value.types';

// 월별 일정 입력 컴포넌트 props 타입
interface IMonthlyEventSchedule {
    schedules: IEventScheduleValue[];
    setSchedules: React.Dispatch<React.SetStateAction<IEventScheduleValue[]>>;
    postSchedules: IEventScheduleValue[];
    setPostSchedules: React.Dispatch<
        React.SetStateAction<IEventScheduleValue[]>
    >;
}

// 동아리 소개글 작성 컴포넌트 props 타입
interface IClubDescription {
    inputValue: IClubIntroValue;
    setInputValue: React.Dispatch<React.SetStateAction<IClubIntroValue>>;
}

export type { IMonthlyEventSchedule, IClubDescription };
