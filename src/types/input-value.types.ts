interface IClubRegisterValue {
    clubName: string;
    leaderEmail: string;
    category: string;
    oneLiner: string;
    briefIntroduction: string;
}

interface ISummaryInfoValue {
    recruitmentStatus: string;
    leaderName: string;
    leaderPhone: string;
    activities: string;
    membershipFee: string;
    snsUrl: string;
    applicationUrl: string;
}

export type { IClubRegisterValue, ISummaryInfoValue };
