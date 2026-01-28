import {
    useClubIntroduction,
    useIsPreview,
} from '@/domains/club/introduction/api/useClubIntro';
import ContentBlock from '@/domains/shared/components/card/ContentBlock';

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
