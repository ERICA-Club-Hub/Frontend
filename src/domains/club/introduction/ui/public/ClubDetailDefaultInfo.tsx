import { ClubDetailResponse } from '@/api/data-contracts';
import { formatClubInfo } from '@/domains/shared/utils/formatClubInfo';
import {
    CLUB_INFO_META,
    DISPLAY_ORDER,
} from '../../constants/club-info.constants';
import Skeleton from '@/components/Loading/Skeleton';

export default function ClubDetailDefaultInfo({
    data,
}: {
    data?: ClubDetailResponse;
}) {
    if (!data) {
        return (
            <div className="flex flex-col gap-1.5">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                        <div className="w-18 flex gap-1 items-center shrink-0">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="h-4 w-10" />
                        </div>
                        <Skeleton className="h-4 flex-1 max-w-30" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1.5">
            {DISPLAY_ORDER.map((key) => {
                const rawValue = data[key];
                if (!rawValue) return null;

                const { icon, label } = CLUB_INFO_META[key];

                return (
                    <div key={key} className="flex gap-2.5 items-start">
                        <div className="w-18 flex gap-1 items-center shrink-0">
                            <div className="w-4 h-4">{icon}</div>
                            <span className="text-b3 text-neutral-400">
                                {label}
                            </span>
                        </div>
                        <span className="text-b4 text-neutral-600 break-all">
                            {formatClubInfo(key, rawValue)}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
