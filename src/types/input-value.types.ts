interface ISummaryInfoValue {
    recruitmentStatus: string;
    leaderName: string;
    leaderPhone: string;
    activities: string;
    membershipFee: number | null;
    snsUrl: string;
    applicationUrl: string;
}

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

interface IRecruitNoticeValue {
    due: string;
    notice: string;
    etc: string;
}

interface IActivityLogValue {
    content: string;
    date: string;
}

export type {
    ISummaryInfoValue,
    IClubIntroValue,
    IEventScheduleValue,
    IRecruitNoticeValue,
    IActivityLogValue,
};
