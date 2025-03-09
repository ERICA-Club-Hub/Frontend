import { IActivitiesLog } from '@/types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function FeedThumbnailImage({ activityLog }: { activityLog: IActivitiesLog }) {
    const navigate = useNavigate();

    const handleRouting = () => {
        navigate(`/admin/club/${activityLog.activityId}/activities/edit`, {
            // id를 state로 넘겨주어 해당 활동로그 상세로 이동 (id가 없으면 활동로그 생성 페이지로 이동)
            state: { id: activityLog.activityId },
        });
    };

    return (
        <Container key={activityLog.activityId} onClick={handleRouting}>
            <ThumbnailImage
                key={activityLog.activityId}
                src={activityLog.thumbnailUrl}
            />
        </Container>
    );
}

export { FeedThumbnailImage };

const Container = styled.div``;

const ThumbnailImage = styled.img`
    width: 95px;
    height: 95px;
    border-radius: 5px;
    object-fit: cover;
`;
