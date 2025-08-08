import ContentBlock from '../ContentBlock';
import { useClubIntro } from '@/hooks/club-detail/useClubIntro';

export default function ActivityGuide() {
    const { clubIntroduction } = useClubIntro();

    return (
        <ContentBlock
            title="활동 안내"
            content={clubIntroduction?.activity}
        ></ContentBlock>
    );
}
