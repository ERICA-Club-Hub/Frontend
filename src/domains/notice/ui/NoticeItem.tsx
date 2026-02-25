import Accordion from '@/components/Accordion/Accordion';
import Skeleton from '@/components/Loading/Skeleton';
import { ServiceAnnouncementDetailDTO } from '@/api/data-contracts';
import { formatNoticeDate } from '@/domains/notice/utils/formatNoticeDate';

interface NoticeItemProps {
    notice: ServiceAnnouncementDetailDTO;
}

const NoticeItem = ({ notice }: NoticeItemProps) => {
    return (
        <Accordion
            title={notice.title ?? ''}
            date={notice.createdAt ? formatNoticeDate(notice.createdAt) : undefined}
            content={
                <span className="whitespace-pre-line">{notice.content}</span>
            }
        />
    );
};

export function NoticeItemSkeleton() {
    return (
        <div className="flex items-center justify-between w-[320px] bg-neutral-00 rounded-lg p-3">
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <Skeleton className="h-[14px] w-[160px]" />
                <Skeleton className="h-[12px] w-[80px]" />
            </div>
            <Skeleton className="shrink-0 ml-2 w-4 h-4" />
        </div>
    );
}

export default NoticeItem;
