import ClubSocialItem from '@/domains/social/ui/ClubSocialItem';
import { useClubSNS } from '@/domains/social/api/useClubSNS';
import ExpandArrow from '@/assets/common/expand-arrow.svg?react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

export default function ClubSocialPreview() {
    const { data, isLoading, isError } = useClubSNS();
    const navigate = useNavigate();

    if (isLoading) return <div>불러오는 중...</div>;
    if (isError) return <div>오류가 발생했습니다.</div>;

    const accounts = data?.result?.officialAccounts ?? [];

    return (
        <section className="flex flex-col">
            <div className="mt-[30px] mb-5 flex justify-between">
                <h3 className="font-medium text-subtitle-01">
                    공식 계정 바로가기
                </h3>
                <button
                    onClick={() => {
                        navigate(PATHS.CLUB_SOCIAL);
                        window.scrollTo(0, 0);
                    }}
                    className="flex items-center"
                >
                    <p className="font-normal text-body-03 text-neutral-600">
                        더보기
                    </p>
                    <ExpandArrow />
                </button>
            </div>
            <div className="w-[320px] flex justify-between">
                {accounts.map((account) => (
                    <ClubSocialItem
                        key={`${account.clubName}-${account.accountName}`}
                        clubName={account.clubName ?? ''}
                        clubLogoUrl={account.profileImage}
                        clubSNSId={account.accountName ?? ''}
                        onClick={() =>
                            window.open(account.instagramProfileUrl, '_blank')
                        }
                    />
                ))}
            </div>
        </section>
    );
}
