import { RecruitmentStatus } from '@/types/recruitment-status.type';
import ClubTag from '../ClubTag';
import { getRecruitmentConfig } from '@/utils/displayHelper';

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
