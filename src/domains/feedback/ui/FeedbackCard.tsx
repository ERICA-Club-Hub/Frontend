import { FeedbackDTO } from '@/api/data-contracts';

/**
 * 유저 피드백 카드 컴포넌트
 * @usage - 서비스 어드민 페이지 (유저 피드백 모음)
 */ export default function FeedbackCard({ data }: { data: FeedbackDTO }) {
    return (
        <div className="flex flex-col gap-[6px]">
            <p className="w-[320px] h-fit p-[12px] rounded-[8px] bg-neutral-00 border-[0.6px] border-solid border-neutral-150 text-b4 text-neutral-900">
                {data.content}
            </p>
            {/* TODO: api Date 필드 추가 시 반영 */}
            <span className="text-c1 text-neutral-400">0000.0000.00:00</span>
        </div>
    );
}
