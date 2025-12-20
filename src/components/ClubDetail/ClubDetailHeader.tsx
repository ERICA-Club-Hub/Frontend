import { DEFAULT_IMG } from '@/constants/DEFAULT_IMG';
import Button from '../Common/Button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

import { useClubDetail } from '@/hooks/club-detail/useClubDetail';
import { useClubDetailHeader } from '@/hooks/queries/club-detail/useClubDetailHeader';
import { getRecruitmentStatusLabel } from '@/utils/clubDetail/getRecruitmentStatus';
import { getCentralCategoryDisplayByKoreanName } from '@/utils/search/searchKeywordMapping';

const recruitStateVariants = cva(
    'flex min-w-[42px] px-[5px] py-[2px] rounded-[5px] text-caption items-center',
    {
        variants: {
            status: {
                recruiting: 'bg-badge-orange-bg text-sub-orange',
                scheduled: 'bg-badge-green-bg text-badge-green-text',
                closed: 'bg-badge-gray-bg text-neutral-700',
            },
        },
        defaultVariants: {
            status: 'closed',
        },
    },
);

type RecruitStateVariant = VariantProps<typeof recruitStateVariants>['status'];

const getRecruitStateVariant = (label: string): RecruitStateVariant => {
    if (label === '모집 중') return 'recruiting';
    if (label === '모집 예정') return 'scheduled';
    return 'closed';
};

export default function ClubDetailHeader() {
    const { isPreview, clubId } = useClubDetail();
    const { data, isLoading } = useClubDetailHeader(clubId || '', isPreview);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    const recruitmentLabel = data?.recruitmentStatus
        ? getRecruitmentStatusLabel(data.recruitmentStatus)
        : '';

    const recruitStateVariant = getRecruitStateVariant(recruitmentLabel);

    return (
        <div className="mt-[110px] h-[200px] w-full min-h-[104px] bg-white flex p-[17px] flex-col justify-center items-center relative">
            <img
                src={data?.profileImageUrl || DEFAULT_IMG}
                alt="Club Logo"
                className="w-[75px] h-[75px] rounded-[10px] mr-[21px] object-cover absolute bg-black -top-[35px] left-1/2 -translate-x-1/2"
            />
            <div className="flex flex-col justify-center items-center">
                <div className="mt-[47px] flex justify-center flex-col items-center text-center gap-[5px] mb-[10px]">
                    <h1 className="text-subtitle-02 font-semibold">
                        {data?.name}
                    </h1>
                    <div className="text-neutral-300 font-regular text-body-03">
                        {data?.description}
                    </div>
                </div>

                <div className="flex gap-2 mb-5">
                    <span className="rounded-[4px] px-[5px] py-[2px] text-caption bg-badge-blue-bg text-badge-blue-text">
                        {data?.category?.clubCategoryName &&
                            getCentralCategoryDisplayByKoreanName(
                                data.category.clubCategoryName,
                            )}
                    </span>
                    <span
                        className={cn(
                            recruitStateVariants({
                                status: recruitStateVariant,
                            }),
                        )}
                    >
                        {recruitmentLabel}
                    </span>
                </div>
            </div>
            <Button
                onClick={() => {
                    if (data?.applicationUrl) {
                        window.open(data.applicationUrl, '_blank');
                    }
                }}
                size="large"
            >
                {data?.recruitmentStatus !== 'OPEN'
                    ? '모집이 마감되었어요.'
                    : '가입 신청하기'}
            </Button>
        </div>
    );
}
