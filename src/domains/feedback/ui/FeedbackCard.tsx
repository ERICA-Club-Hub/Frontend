import { FeedbackDTO } from '@/api/data-contracts';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 유저 피드백 카드 컴포넌트
 * @usage - 서비스 어드민 페이지 (유저 피드백 모음)
 */
export default function FeedbackCard({ data }: { data: FeedbackDTO }) {
    const formattedDate = data.dateTime
        ? dayjs.utc(data.dateTime).tz('Asia/Seoul').format('YYYY.MM.DD HH:mm')
        : '';

    return (
        <div className="flex flex-col gap-[6px]">
            <p className="w-[320px] h-fit p-[12px] rounded-[8px] bg-neutral-00 border-[0.6px] border-solid border-neutral-150 text-b4 text-neutral-900">
                {data.content}
            </p>
            <span className="text-c1 text-neutral-400">{formattedDate}</span>
        </div>
    );
}
