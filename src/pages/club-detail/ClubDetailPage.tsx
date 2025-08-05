import { createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TabContents from './TabContents';
import { ClubDetailProvider } from '@/contexts/ClubDetailContext';
import arrow from '../../assets/common/Expand_right.svg';
import ClubDetailHeader from '@/components/ClubDetail/ClubDetailHeader';
import Tab from '@/components/ClubDetail/Tab/Tab';
import { useClubDetail } from '@/hooks/club-detail/useClubDetail';

export interface ClubDetailContextType {
    nowUrl?: string | null;
    clubName?: string | null;
    clubImg?: string;
    clubId?: string;
    // TODO 서버에서 활동로그 단건에 정보 안 담아준다면 set할 수 있는 함수도 전달
}

export type activeTab = 'intro' | 'recruit' | 'log';

const ClubDetailContext = createContext<ClubDetailContextType | null>(null); // 이거로 Provider 생성

const ClubDetailPage = () => {
    const { clubId, activeTab, setActiveTab, isPreview } = useClubDetail();
    const navigate = useNavigate();
    const location = useLocation();
    const nowUrl = location.pathname.split('/')[1];

    return (
        <ClubDetailProvider
            value={{
                nowUrl: nowUrl,
                // clubName: clubDetail?.name || null,
                // clubImg: clubDetail?.profileImageUrl || DEFAULT_IMG,
                // clubId: id,
            }}
        >
            <PageContainer $nowUrl={nowUrl}>
                <PreviewContainer>
                    {isPreview && (
                        <BackButton
                            onClick={() => {
                                navigate(`/admin/club/${clubId}/summary-info`);
                            }}
                        >
                            <img src={arrow} />
                            돌아가기
                        </BackButton>
                    )}
                    <ClubDetailHeader
                        // TODO 임시 더미 데이터 서버 DTO에 따라 여기서 호출할지, Header내부에서 호출할지 결정
                        clubImgUrl={''}
                        clubDescription="동아리 설명"
                        clubName="동아리명"
                        clubTag="연합동아리"
                        recruitState="모집중"
                        applicationUrl="1"
                    />
                    <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabContents activeTab={activeTab} />
                </PreviewContainer>
            </PageContainer>
        </ClubDetailProvider>
    );
};

const PreviewContainer = styled.div``;
const BackButton = styled.div`
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
    align-self: flex-start;
`;

const PageContainer = styled.div<{ $nowUrl: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: ${(props) => (props.$nowUrl === 'club' ? '20px' : '0px')};
`;

export { ClubDetailPage, ClubDetailContext };
