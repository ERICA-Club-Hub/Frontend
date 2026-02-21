import Accordion from '@/components/Accordion/Accordion';
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

export default NoticeItem;
