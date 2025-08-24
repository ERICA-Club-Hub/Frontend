import {
    RecruitmentStatus,
    getRecruitmentStatusInfo,
} from '@/utils/clubDetail/getRecruitmentStatus';
import ClubTag from '../ClubTag';

interface RecruitStatusTagProps {
    recruitmentStatus: RecruitmentStatus;
}

export default function RecruitStatusTag({
    recruitmentStatus,
}: RecruitStatusTagProps) {
    const { label, backgroundColor, textColor } =
        getRecruitmentStatusInfo(recruitmentStatus);

    return (
        <ClubTag
            text={label}
            backgroundColor={backgroundColor}
            textColor={textColor}
        />
    );
}
