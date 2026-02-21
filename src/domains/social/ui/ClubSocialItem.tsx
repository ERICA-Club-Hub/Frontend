import Skeleton from '@/components/Loading/Skeleton';
import { cn } from '@/utils/cn';

interface ClubSocialItemProps {
    clubLogoUrl?: string;
    clubName: string;
    clubSNSId: string;
    onClick: () => void;
    isLoading?: boolean;
}

export default function ClubSocialItem({
    clubName,
    clubLogoUrl,
    clubSNSId,
    onClick,
    isLoading = false,
}: ClubSocialItemProps) {
    if (isLoading) {
        return (
            <div
                className={cn(
                    'w-[104px] h-[148px] rounded-[8px]',
                    'px-0 py-[18px]',
                    'flex gap-[8px] justify-center items-center flex-col',
                    'bg-neutral-00 border border-neutral-100',
                )}
            >
                <Skeleton circle className="w-[72px] h-[72px]" />

                <div className="flex flex-col items-center">
                    <Skeleton className="w-[76px] h-[16px]" />
                    <Skeleton className="w-[76px] h-[16px]" />
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={onClick}
            className={cn(
                'w-[104px] h-[148px] rounded-[8px]',
                'px-0 py-[18px]',
                'flex gap-[8px] justify-center items-center flex-col',
                'bg-neutral-00 border border-neutral-100',
                'cursor-pointer hover:bg-neutral-50 transition-colors',
            )}
        >
            <div className="w-[72px] h-[72px]">
                <img
                    src={clubLogoUrl}
                    className="w-full h-full rounded-full"
                    alt={clubName}
                />
            </div>
            <div className="px-[12px] py-0 flex flex-col text-center w-full">
                <span className="text-c2 text-neutral-900 truncate">
                    {clubName}
                </span>
                <span className="text-c1 text-neutral-600 truncate">
                    @{clubSNSId}
                </span>
            </div>
        </div>
    );
}
