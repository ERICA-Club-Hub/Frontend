import styled from 'styled-components';
import { Footer } from '@/components/Common/Footer';
import Survey from '@/components/Main/Survey';
import CategoryCollectSection from '@/components/Main/CategoryCollectSection';
import RecentlyLogSection from '@/components/Main/RecentlyLogSection';
import RecentlyUpdatedClubs from '@/components/Main/RecentlyUpdatedClubs';

export default function MainPage() {
    return (
        <PageContainer>
            <ContentWrapper>
                <CategoryCollectSection />
                <Survey />
                <RecentlyUpdatedClubs />
                <RecentlyLogSection />
            </ContentWrapper>
            <Footer />
        </PageContainer>
    );
}

const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const ContentWrapper = styled.div`
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
