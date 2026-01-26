import { useNavigate } from 'react-router-dom';
import { IActivitiesLog } from '../activity-log.types';

function FeedThumbnailImage({ activityLog }: { activityLog: IActivitiesLog }) {
    const navigate = useNavigate();

    const handleRouting = () => {
        navigate(`/admin/club/${activityLog.activityId}/activities/edit`, {
            // id를 state로 넘겨주어 해당 활동로그 상세로 이동 (id가 없으면 활동로그 생성 페이지로 이동)
            state: { activityId: activityLog.activityId },
        });
    };

    return (
        <div key={activityLog.activityId} onClick={handleRouting}>
            <img
                key={activityLog.activityId}
                src={activityLog.thumbnailUrl}
                className="w-[95px] h-[95px] rounded-[5px] object-cover"
            />
        </div>
    );
}

export { FeedThumbnailImage };
