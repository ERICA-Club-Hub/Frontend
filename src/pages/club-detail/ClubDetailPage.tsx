import styled from 'styled-components';
import TabContents from './TabContents';
import ClubDetailHeader from '@/components/ClubDetail/ClubDetailHeader';

import { useClubDetail } from '@/hooks/club-detail/useClubDetail';
import ClubDetailTab from '@/components/ClubDetail/Tab/ClubDetailTab';

export type activeTab = 'intro' | 'recruit' | 'log';

const ClubDetailPage = () => {
    const { activeTab, setActiveTab } = useClubDetail();

    return (
        <PageContainer>
            <ClubDetailHeader />
            <TabContainer>
                <ClubDetailTab
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                />
            </TabContainer>
            <TabContentsContainer>
                <TabContents activeTab={activeTab} />
            </TabContentsContainer>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
`;

const TabContainer = styled.div`
    width: 100%;
    background: white;
    display: flex;
    justify-content: center;
    height: 47px;
`;

const TabContentsContainer = styled.div`
    margin-top: 15px;
    margin-bottom: 20px;
`;

export { ClubDetailPage };
