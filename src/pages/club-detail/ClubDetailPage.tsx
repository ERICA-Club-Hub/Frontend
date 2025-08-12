import styled from 'styled-components';
import TabContents from './TabContents';
import ClubDetailHeader from '@/components/ClubDetail/ClubDetailHeader';
import Tab from '@/components/ClubDetail/Tab/Tab';
import { useClubDetail } from '@/hooks/club-detail/useClubDetail';

export type activeTab = 'intro' | 'recruit' | 'log';

const ClubDetailPage = () => {
    const { activeTab, setActiveTab } = useClubDetail();

    return (
        <PageContainer>
            <ClubDetailHeader />
            <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabContents activeTab={activeTab} />
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
`;

export { ClubDetailPage };
