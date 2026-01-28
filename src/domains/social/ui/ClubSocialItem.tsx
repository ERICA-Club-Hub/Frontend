import { cn } from '@/utils/cn';

interface OfficialAcountItemProps {
    clubLogoUrl?: string;
    clubName: string;
    clubSNSId: string;
    onClick: () => void;
}

export default function ClubSocialItem({
    clubName,
    clubLogoUrl,
    clubSNSId,
    onClick,
}: OfficialAcountItemProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                'w-[104px] h-[148px] rounded-[8px]',
                'px-0 py-[18px]',
                'flex gap-[8px] justify-center items-center flex-col',
                'bg-neutral-00 border border-neutral-100',
            )}
        >
            <div className="w-[72px] h-[72px]">
                <img src={clubLogoUrl} className="w-full h-full rounded-full" />
            </div>
            <div className="px-[12px] py-0 flex flex-col text-center">
                <p className="font-medium text-caption text-neutral-900">
                    {clubName}
                </p>
                <p className="font-normal text-caption text-neutral-600">
                    {clubSNSId}
                </p>
            </div>
        </div>
    );
}
