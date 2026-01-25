import Button from '@/components/Common/Button';
import { useRecoilValue } from 'recoil';
import { clubIdSelector } from '@/domains/auth/model/clubInfoState';
import { Link } from 'react-router-dom';
import { Feed } from '@/domains/club/activity/ui/Feed';

function AdminActivitiesFeedPage() {
    const clubId = useRecoilValue(clubIdSelector);

    return (
        <>
            <div className="flex flex-col items-center gap-[15px] pt-5">
                <div className="flex justify-between w-[320px]">
                    <div className="text-body-01 font-semibold text-black">
                        활동로그
                    </div>
                    <Link to={`/admin/club/${clubId}/activities/register`}>
                        <Button>활동로그 작성하기</Button>
                    </Link>
                </div>

                {/* 활동 피드 */}
                <Feed />
            </div>
        </>
    );
}

export { AdminActivitiesFeedPage };
