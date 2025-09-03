import styled from 'styled-components';
import MainThumbnail from '@/assets/common/MainThumbnail.svg?react';
import { Footer } from '@/components/Common/Footer';
import Survey from '@/components/Main/Survey';

const ClubListPage = () => {
    return (
        <PageContainer>
            <ContentWrapper>
                <AnnouncementContainer>
                    <MainButton
                        onClick={() =>
                            window.open(
                                'https://snowy-middle-3a3.notion.site/hanjari',
                                '_blank',
                            )
                        }
                    >
                        <MainThumbnail />
                    </MainButton>
                </AnnouncementContainer>
                <Survey />

                <ClubSearchContainer></ClubSearchContainer>
            </ContentWrapper>
            <Footer />
        </PageContainer>
    );
};

export { ClubListPage };

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

const AnnouncementContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    overflow: hidden;
    position: relative;
`;

const MainButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
`;

const ClubSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
`;
