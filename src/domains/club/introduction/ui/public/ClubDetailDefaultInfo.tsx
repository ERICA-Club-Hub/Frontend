import { ClubDetailResponse } from '@/api/data-contracts';
import { formatClubInfo } from '@/domains/shared/utils/formatClubInfo';
import {
    CLUB_INFO_META,
    DISPLAY_ORDER,
} from '../../constants/club-info.constants';
import Skeleton from '@/components/Loading/Skeleton';

interface ClubDetailDefaultInfoProps {
    data?: ClubDetailResponse;
    isLoading?: boolean;
}

export default function ClubDetailDefaultInfo({
    data,
    isLoading = false,
}: ClubDetailDefaultInfoProps) {
    if (isLoading) {
        return (
            <div className="flex flex-col gap-1.5">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                        <Skeleton className="w-19 h-4" />
                        <Skeleton className="h-4 flex-1 max-w-30" />
                    </div>
                ))}
            </div>
        );
    }

    if (!data) {
        return null;
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
