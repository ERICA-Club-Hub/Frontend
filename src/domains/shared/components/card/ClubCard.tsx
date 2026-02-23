import { Link, LinkProps } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { RecruitmentStatus } from '@/types/recruitment-status.type';
import ClubTypeTag, { ClubCategoryCode } from '../tag/ClubTypeTag';
import RecruitStatusTag from '@/domains/club/recruitment/ui/public/RecruitStatusTag';
import Skeleton from '@/components/Loading/Skeleton';

interface ClubCardProps extends LinkProps {
    title?: string;
    subTitle?: string;
    categoryName?: string;
    recruitmentStatus?: string;
    to: string;
    tags?: string[];
    profileImageUrl?: string;
    isLoading?: boolean;
}

export default function ClubCard({
    title,
    subTitle,
    categoryName,
    recruitmentStatus,
    to,
    profileImageUrl,
    isLoading = false,
    ...props
}: ClubCardProps) {
    if (isLoading) {
        return (
            <div
                className={cn(
                    'flex w-[320px] h-[95px] p-[12px]',
                    'justify-start items-center gap-[20px]',
                    'rounded-[10px] bg-white',
                )}
            >
                <Skeleton className="w-[75px] h-[75px] rounded-[5px]" />

                <div className="flex flex-col w-[204px] justify-start items-start gap-[8px]">
                    <Skeleton className="w-full h-4.5" />
                    <Skeleton className="w-full h-[45px]" />
                </div>
            </div>
        );
    }

    return (
        <Link
            to={to}
            {...props}
            className={cn(
                'flex w-[320px] h-[95px] p-[12px]',
                'justify-start items-center gap-[20px]',
                'rounded-[10px] bg-white',
                'cursor-pointer',
            )}
        >
            <img
                src={profileImageUrl}
                className="w-[75px] h-[75px] rounded-[5px]"
            />

            <div className="flex flex-col w-[204px] justify-start items-start">
                <div className="flex gap-[8px] mb-[5px]">
                    <ClubTypeTag
                        clubCategory={categoryName as ClubCategoryCode}
                    />
                    {recruitmentStatus && (
                        <RecruitStatusTag
                            recruitmentStatus={
                                recruitmentStatus as RecruitmentStatus
                            }
                        />
                    )}
                </div>

                <div className="flex flex-col w-full overflow-hidden">
                    <span className="text-gray-900 text-b2 font-semibold leading-normal m-0 whitespace-nowrap overflow-hidden text-ellipsis">
                        {title}
                    </span>

                    <span className="text-neutral-600 text-b4 w-full m-0 whitespace-nowrap overflow-hidden text-ellipsis text-left">
                        {subTitle}
                    </span>
                </div>
            </div>
        </Link>
    );
}
