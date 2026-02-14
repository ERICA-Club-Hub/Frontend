interface IClubIntroValue {
    introduction: string;
    activity: string;
    recruitment: string;
}

interface IEventScheduleValue {
    id?: number;
    scheduleId?: number | null;
    isNewSchedule?: boolean;
    month: number | null;
    content: string;
}

interface IActivityLogValue {
    content: string;
    date: string;
}

export type { IClubIntroValue, IEventScheduleValue, IActivityLogValue };
