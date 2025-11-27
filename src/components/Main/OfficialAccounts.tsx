import styled from 'styled-components';
import OfficialAcountItem from '../Common/OfficialAcountItem';
import { useClubSNS } from '@/hooks/queries/main/useClubSNS';
import ExpandArrow from '@/assets/common/expand-arrow.svg?react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

export default function OfficialAccounts() {
    const { data, isLoading, isError } = useClubSNS();
    const navigate = useNavigate();

    if (isLoading) return <div>불러오는 중...</div>;
    if (isError) return <div>오류가 발생했습니다.</div>;

    const accounts = data?.result?.officialAccounts ?? [];

    return (
        <SectionContainer>
            <SectionTitleContainer>
                <SectionTitle>공식 계정 바로가기</SectionTitle>
                <OfficialAccountSeeMoreContainer
                    onClick={() => {
                        navigate(PATHS.CLUB_OFFICIAL_ACOUNTS_LIST());
                        window.scrollTo(0, 0);
                    }}
                >
                    <OfficialAccountSeeMore>더보기</OfficialAccountSeeMore>
                    <ExpandArrow />
                </OfficialAccountSeeMoreContainer>
            </SectionTitleContainer>
            <OfficialAccountsContainer>
                {accounts.map((account) => (
                    <OfficialAcountItem
                        key={`${account.clubName}-${account.accountName}`}
                        clubName={account.clubName ?? ''}
                        clubLogoUrl={account.profileImage}
                        clubSNSId={account.accountName ?? ''}
                        onClick={() =>
                            window.open(account.instagramProfileUrl, '_blank')
                        }
                    />
                ))}
            </OfficialAccountsContainer>
        </SectionContainer>
    );
}

const SectionContainer = styled.section`
    display: flex;
    flex-direction: column;
`;

const SectionTitleContainer = styled.div`
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
`;

const SectionTitle = styled.h3`
    font-weight: 500;
    font-size: 20px;
`;

const OfficialAccountSeeMoreContainer = styled.button`
    display: flex;
    align-items: center;
`;

const OfficialAccountSeeMore = styled.p`
    font-weight: 400;
    font-size: 14px;
    color: #587189;
`;

const OfficialAccountsContainer = styled.div`
    width: 320px;
    display: flex;
    justify-content: space-between;
`;
