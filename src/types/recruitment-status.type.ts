import { ClubOverviewResponse } from '@/api/data-contracts';

export type RecruitmentStatus = NonNullable<
    ClubOverviewResponse['recruitmentStatus']
>;
