import {
    useClubIntroduction,
    useIsPreview,
} from '@/hooks/queries/club-detail/useClubIntro';
import ContentBlock from '../ContentBlock';

export default function ClubIntroduce() {
    const { id, isPreview } = useIsPreview();
    const { data } = useClubIntroduction(id || '', isPreview);
    return (
        <ContentBlock
            title="동아리 소개"
            content={data?.introduction}
        ></ContentBlock>
    );
}
