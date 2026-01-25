import {
    useClubInfo,
    useIsPreview,
} from '@/hooks/queries/club-detail/useClubIntro';
import { formatBaseInfo } from '@/domains/club/introduction/lib/getBaseInfoFormat';

export const useBaseInfo = () => {
    const { id, isPreview } = useIsPreview();
    const { data, isLoading, isError } = useClubInfo(id || '', isPreview);

    const handleSnsClick = () => {
        if (data?.snsUrl) {
            const username = data.snsUrl.replace('@', '');
            window.open(`https://www.instagram.com/${username}`, '_blank');
        }
    };

    const items = formatBaseInfo(data, handleSnsClick);

    return {
        items,
        isLoading,
        isError,
    };
};
