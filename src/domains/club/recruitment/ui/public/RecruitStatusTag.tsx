import { RecruitmentStatus } from '@/types/recruitment-status.type';
import { getRecruitmentConfig } from '@/domains/club/recruitment/lib/getRecruitmentConfig';
import ClubTag from '@/domains/shared/components/tag/ClubTag';

export interface RecruitStatusTagProps {
    recruitmentStatus: RecruitmentStatus | undefined;
}

export default function RecruitStatusTag({
    recruitmentStatus,
}: RecruitStatusTagProps) {
    const { label, backgroundColor, textColor } =
        getRecruitmentConfig(recruitmentStatus);

    return (
        <ClubTag
            text={label}
            backgroundColor={backgroundColor}
            textColor={textColor}
        />
    );
}
