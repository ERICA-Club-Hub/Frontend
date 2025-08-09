import ContentBlock from '../ContentBlock';
import {
    useClubIntroduction,
    useIsPreview,
} from '@/hooks/club-detail/useClubIntro';

export default function ActivityGuide() {
    const { id, isPreview } = useIsPreview();
    const { data } = useClubIntroduction(id || '', isPreview); // TODO isLoading, isError로 분기처리

    return (
        <ContentBlock title="활동 안내" content={data?.activity}></ContentBlock>
    );
}
