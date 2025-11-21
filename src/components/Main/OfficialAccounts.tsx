import styled from 'styled-components';
import OfficialAcountItem from '../Common/OfficialAcountItem';
import { useClubSNS } from '@/hooks/queries/main/useClubSNS';

export default function OfficialAccounts() {
    const { data, isLoading, isError } = useClubSNS();

    if (isLoading) return <div>불러오는 중...</div>;
    if (isError) return <div>오류가 발생했습니다.</div>;

    const accounts = data?.result?.officialAccounts ?? [];

    return (
        <SectionContainer>
            <SectionTitle>공식 계정 바로가기</SectionTitle>
            <OfficialAccountsContainer>
                {accounts.map((account, index) => (
                    <OfficialAcountItem
                        key={index}
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

const SectionTitle = styled.h3`
    font-weight: 500;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const OfficialAccountsContainer = styled.div`
    width: 320px;
    display: flex;
    // TODO gap으로 할지 space between으로 할지 결정되면 수정
    gap: 8px;
    justify-content: space-between;
`;
