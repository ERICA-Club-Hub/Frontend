import { useState } from 'react';
import { IActivitiesLog } from '@/types';
import ErrorIcon from '@/assets/common/error-icon.svg?react';
import useClubAdminQueries from '@/hooks/queries/useClubAdminQueries';
import { FeedThumbnailImage } from './FeedThumbnailImage';
import Skeleton from '@/components/Common/Loading/Skeleton';

function Feed() {
    const [activitiesLog, setActivitiesLog] = useState<IActivitiesLog[]>([]);

    // 활동로그 피드 데이터 fetch
    const { useActivitiesLogQuery } = useClubAdminQueries();
    const { isPending, isSuccess } = useActivitiesLogQuery(setActivitiesLog);

    return (
        <div className="flex justify-center items-center w-[318px]">
            {isPending ? (
                <div className="flex flex-wrap gap-x-[6px] gap-y-[7px] w-[318px] h-auto p-[10px] rounded-[10px] bg-white">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <Skeleton key={index} width={95} height={95} />
                    ))}
                </div>
            ) : isSuccess && activitiesLog.length > 0 ? (
                <div className="flex flex-wrap gap-x-[6px] gap-y-[7px] w-[318px] h-auto p-[10px] rounded-[10px] bg-white">
                    {activitiesLog.map((activityLog) => (
                        <FeedThumbnailImage
                            key={activityLog.activityId}
                            activityLog={activityLog}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center gap-[10px] w-[318px] h-[115px] rounded-[10px] bg-white">
                    <ErrorIcon width={30} height={30} />
                    <div className="text-body-03 font-medium text-black">
                        활동로그가 비어있어요.
                    </div>
                </div>
            )}
        </div>
    );
}

export { Feed };
