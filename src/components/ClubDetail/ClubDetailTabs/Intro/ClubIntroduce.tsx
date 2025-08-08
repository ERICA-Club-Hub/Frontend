import ContentBlock from '../ContentBlock';
import { useClubIntro } from '@/hooks/club-detail/useClubIntro';

export default function ClubIntroduce() {
    const { clubIntroduction } = useClubIntro();
    return (
        <ContentBlock
            title="동아리 소개"
            content={clubIntroduction?.introduction}
        ></ContentBlock>
    );
}
