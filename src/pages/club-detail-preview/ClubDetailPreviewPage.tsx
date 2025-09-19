import ClubDetailHeader from '@/components/ClubDetail/ClubDetailHeader';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TabContentsSwitch from '../club-detail/TabContents';
import arrow from '../../assets/common/Expand_right.svg';
import { useClubDetail } from '@/hooks/club-detail/useClubDetail';

import ClubDetailTab from '@/components/ClubDetail/Tab/ClubDetailTab';

export default function ClubDetailPreviewPage() {
    const navigate = useNavigate();
    const { clubId, activeTab, setActiveTab } = useClubDetail();

    return (
        <PageContainer>
            <PreviewContainer>
                <BackButton
                    onClick={() => {
                        navigate(`/admin/club/${clubId}/summary-info`);
                    }}
                >
                    <img src={arrow} />
                    돌아가기
                </BackButton>

                <ClubDetailHeader />
                <ClubDetailTab
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabContentsSwitch activeTab={activeTab} />
            </PreviewContainer>
        </PageContainer>
    );
}

const PreviewContainer = styled.div``;
const BackButton = styled.div`
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
    align-self: flex-start;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
