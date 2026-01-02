import RecentlyLogItem from '../Common/RecentlyLog/RecentlyLogItem';
import { useRecentlyLog } from '@/hooks/queries/main/useRecentlyLogs';

export default function RecentlyLogSection() {
    const { recentlyLogs } = useRecentlyLog();
    return (
        <section className="flex flex-col">
            <h3 className="font-medium text-subtitle-01 mt-[30px] mb-5">
                최근 업로드 된 활동로그
            </h3>
            <div className="w-[320px] h-[320px] grid grid-rows-2 grid-cols-2 gap-[10px]">
                {recentlyLogs &&
                    recentlyLogs.map((recentlyLog) => (
                        <RecentlyLogItem
                            clubId={recentlyLog.clubId}
                            imgUrl={recentlyLog.imageUrl}
                            clubLogoImgUrl={recentlyLog.clubProfileImageUrl}
                            clubName={recentlyLog.clubName}
                        />
                    ))}
            </div>
        </section>
    );
}
