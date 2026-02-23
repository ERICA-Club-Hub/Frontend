import ClubSocialItem from '@/domains/social/ui/ClubSocialItem';
import { useClubSNS } from '@/domains/social/api/useClubSNS';
import ExpandArrow from '@/assets/common/expand-arrow.svg?react';
import { PATHS } from '@/routes/paths';
import { Link } from 'react-router-dom';

export default function ClubSocialPreview() {
    const { data, isLoading, isError } = useClubSNS();

    const accounts = data?.result?.officialAccounts ?? [];

    if (isLoading) {
        return (
            <section className="flex flex-col">
                <div className="mt-[30px] mb-5 flex justify-between">
                    <h3 className="text-s1">공식 계정 바로가기</h3>
                    <Link
                        to={PATHS.CLUB_SOCIAL('central')}
                        className="flex items-center"
                    >
                        <p className="font-normal text-body-03 text-neutral-600">
                            더보기
                        </p>
                        <ExpandArrow width="16" height="16" stroke="#587189" />
                    </Link>
                </div>
                <div className="w-[320px] flex justify-between">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <ClubSocialItem
                            key={index}
                            clubName=""
                            clubSNSId=""
                            onClick={() => {}}
                            isLoading
                        />
                    ))}
                </div>
            </section>
        );
    }

    if (isError) return <div>오류가 발생했습니다.</div>;

    return (
        <section className="flex flex-col">
            <div className="mt-[30px] mb-5 flex justify-between">
                <h3 className="text-s1">공식 계정 바로가기</h3>
                <Link
                    to={PATHS.CLUB_SOCIAL('central')}
                    className="flex items-center"
                >
                    <p className="font-normal text-body-03 text-neutral-600">
                        더보기
                    </p>
                    <ExpandArrow width="16" height="16" stroke="#587189" />
                </Link>
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
