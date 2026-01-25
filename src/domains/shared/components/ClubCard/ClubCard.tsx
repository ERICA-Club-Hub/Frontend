import { Link, LinkProps } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { RecruitmentStatus } from '@/types/recruitment-status.type';
import RecruitStatusTag from '../Tag/RecruitStatusTag';
import ClubTypeTag, { ClubCategoryCode } from '../Tag/ClubTypeTag';

interface ClubCardProps extends LinkProps {
    title?: string; // 동아리 이름
    subTitle?: string; // 한 줄 소개
    categoryName?: string; // 동아리 카테고리 이름 (타입화 필요)
    recruitmentStatus?: string; // 모집 상태 (타입화 필요)
    to: string; // 이동할 라우팅 주소
    tags?: string[]; // tag 타입화 필요
    profileImageUrl?: string;
}

// TODO: 어떤 페이지에서 사용되는지 JSDoc 주석 추가 필요
export default function ClubCard({
    title,
    subTitle,
    categoryName,
    recruitmentStatus,
    to,
    profileImageUrl,
    ...props
}: ClubCardProps) {
    const isAdminRoute = to.startsWith('/admin/service');

    return (
        <Link
            to={to}
            {...props}
            className={cn(
                'flex w-[320px] h-[95px] p-[10px]',
                'justify-start items-center gap-[15px]',
                'rounded-[10px] border border-[#eaeaea] bg-white',
                'cursor-pointer',
            )}
        >
            {/* 어드민 페이지에서는 프로필 이미지 미표시 */}
            {!isAdminRoute && (
                <img
                    src={profileImageUrl}
                    className="w-[75px] h-[75px] rounded-[5px]"
                />
            )}

            <div className="flex flex-col w-[204px] h-[65px] justify-start items-start">
                <div className="flex gap-[6px] mb-[7px]">
                    <div className="flex gap-[6px]">
                        {/* API 응답 형태가 string으로 되어있어서 as로 대체 */}
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
                </div>

                <p className="text-[#232323] text-body-01 font-semibold leading-normal m-0 mb-[5px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {title}
                </p>

                <p className="text-neutral-600 text-small font-medium leading-normal w-full m-0 whitespace-nowrap overflow-hidden text-ellipsis text-left">
                    {subTitle}
                </p>
            </div>
        </Link>
    );
}
