import { getRecruitmentStatusInfo } from '@/utils/clubDetail/getRecruitmentStatus';
import ClubTag from '../ClubTag';

interface RecruitStatusTagProps {
    recruitmentStatus: string;
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
