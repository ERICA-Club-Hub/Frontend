import { DEFAULT_IMG } from '@/constants/default-image.constant';
import Button from '@/components/Button/Button';
import Skeleton from '@/components/Loading/Skeleton';

import { useClubDetail } from '@/domains/club/profile/model/useClubDetail';

import RecruitStatusTag from '@/domains/club/recruitment/ui/public/RecruitStatusTag';
import ClubTypeTag, {
    ClubCategoryCode,
} from '@/domains/shared/components/tag/ClubTypeTag';
import { useClubOverviewQuery } from '../api/profile.queries';

export default function ClubDetailHeader() {
    const { isPreview, clubId } = useClubDetail();
    const { data, isLoading } = useClubOverviewQuery({ clubId, isPreview });

    if (isLoading) {
        return (
            <div className="mt-[110px] h-[200px] w-full min-h-[104px] flex p-[17px] flex-col justify-center items-center relative">
                <Skeleton className="w-[75px] h-[75px] rounded-[10px] absolute -top-[35px] left-1/2 -translate-x-1/2" />

                <div className="flex flex-col justify-center items-center">
                    <div className="mt-[47px] flex justify-center flex-col items-center text-center gap-[5px] mb-[10px]">
                        <Skeleton className="w-[150px] h-[24px]" />

                        <Skeleton className="w-[200px] h-[18px]" />
                    </div>

                    <div className="flex gap-2 mb-5">
                        <Skeleton className="w-[80px] h-[24px] rounded-[4px]" />
                        <Skeleton className="w-[70px] h-[24px] rounded-[4px]" />
                    </div>
                </div>

                <Skeleton className="w-[320px] h-[45px] rounded-xl" />
            </div>
        );
    }

    return (
        <div className="mt-[110px] h-[200px] w-full min-h-[104px] flex p-[17px] flex-col justify-center items-center relative">
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
                        {data?.oneLiner}
                    </div>
                </div>

                <div className="flex gap-2 mb-5">
                    <ClubTypeTag clubCategory={data?.tag as ClubCategoryCode} />
                    <RecruitStatusTag
                        recruitmentStatus={data?.recruitmentStatus}
                    />
                </div>
            </div>
            <Button
                onClick={() => {
                    if (data?.applicationUrl) {
                        window.open(data.applicationUrl, '_blank');
                    }
                }}
                size="lg"
                disabled={data?.recruitmentStatus !== 'OPEN'}
            >
                가입 신청하기
            </Button>
        </div>
    );
}
