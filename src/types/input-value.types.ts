interface IClubRegisterValue {
    clubName: string;
    leaderEmail: string;
    category: string;
    oneLiner: string;
    briefIntroduction?: string | undefined;
}

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
    month: number;
    content: string;
}

interface IRecruitNoticeValue {
    due: string;
    notice: string;
    etc: string;
}

interface IUnionNoticeValue {
    title: string;
    url: string;
}

export type {
    IClubRegisterValue,
    ISummaryInfoValue,
    IClubIntroValue,
    IEventScheduleValue,
    IRecruitNoticeValue,
    IUnionNoticeValue,
};
