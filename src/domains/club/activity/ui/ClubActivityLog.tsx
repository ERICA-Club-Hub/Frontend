import { useActivityLogList } from '@/domains/club/activity/api/useClubLog';
import { useClubIdByParams } from '@/hooks/useClubIdByParams';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

export default function ClubActivityLog() {
    const clubId = useClubIdByParams();
    const navigate = useNavigate();
    const { data: activityLogResponse, isLoading } = useActivityLogList(clubId);

    const handleClickImg = (activityId?: number) => {
        if (!activityId) {
            alert('잘못된 활동 로그에 대한 접근입니다.');
            return;
        }
        navigate(PATHS.CLUB_ACTIVITY_DETAIL(clubId, activityId));
    };

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    const activityLogList =
        activityLogResponse?.result?.activityThumbnailDTOList || [];

    return activityLogList.length > 0 ? (
        <div className="bg-white rounded-[10px] p-5 w-[328px] mb-[7px]">
            <div className="grid grid-cols-3 gap-[6px]">
                {activityLogList.map((activity) => (
                    <img
                        onClick={() => handleClickImg(activity.activityId)}
                        key={activity.activityId}
                        src={activity.thumbnailUrl}
                        alt="activity log"
                        className="w-[92px] h-[92px] rounded-[5px] cursor-pointer transition-transform hover:scale-105"
                    />
                ))}
            </div>
        </div>
    ) : (
        <div className="flex flex-col justify-center text-center">
            <div className="rounded-[10px] p-5 w-[328px] mb-[7px] flex flex-col gap-[10px]">
                <span className="text-emoji-large">🅧</span>
                <span>활동로그가 비었어요.</span>
            </div>
        </div>
    );
}
