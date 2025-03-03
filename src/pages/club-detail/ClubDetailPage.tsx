import { createContext, useEffect, useState } from 'react';
import Button from '@/components/Common/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import sns from '../../assets/common/sns.svg';
import jjang from '../../assets/common/jjang.svg';
import card from '../../assets/common/card.svg';
import phone from '../../assets/common/phone.svg';
import label from '../../assets/common/label.svg';
import TabContents from './TabContents';
import { apiRequest } from '@/api/apiRequest';
import { ClubDetailProvider } from '@/contexts/ClubDetailContext';
import { DEFAULT_CLUB_IMAGE } from '@/utils/getDefaultImg';
import { getCategoryEmoji, getCategoryMapping } from '@/utils/getCategoryEmoji';

// tab 항목에서 활성화 여부를 판단할 props
interface TabButtonProps {
    $isActive?: boolean;
}

interface RecruitStateProps {
    $state?: '모집중' | '모집 예정' | '모집 마감';
}

type activeTab = 'intro' | 'recruit' | 'log';

type recuirementStatus = 'RECRUITING' | 'UPCOMING' | 'CLOSE';

interface clubInfoSummation {
    name: string | null;
    description: string | null;
    category: string | '';
    leaderName: string | null;
    leaderPhone: string | null;
    activities: string | null;
    membershipFee: string | null;
    snsUrl: string | null;
    recruitmentStatus: recuirementStatus | null;
    applicationUrl?: string | null;
    profileImageUrl?: string | null;
}

export interface ClubDetailContextType {
    nowUrl: string | null;
    clubName: string | null;
    clubImg: string;
    clubId: string;
}

const ClubDetailContext = createContext<ClubDetailContextType | null>(null); // 이거로 Provider 생성

const ClubDetailPage = () => {
    const navigate = useNavigate();
    const [clubDetail, setClubDetail] = useState<clubInfoSummation>({
        name: '없음',
        description: '없음',
        category: '없음',
        leaderName: '없음',
        leaderPhone: '없음',
        activities: '없음',
        membershipFee: '없음',
        snsUrl: '없음',
        recruitmentStatus: 'CLOSE',
        applicationUrl: '없음',
        profileImageUrl: null,
    });
    const params = useParams();
    const id = params.id?.toString() || '';
    const nowUrl = useLocation().pathname.split('/')[1];
    const [activeTab, setActiveTab] = useState<activeTab>('intro');
    useEffect(() => {
        const getClubDetail = async (id: string) => {
            const requestUrl =
                nowUrl === 'club'
                    ? `/api/clubs/${id}`
                    : `/api/clubs/${id}/draft`;
            const response = await apiRequest({
                url: requestUrl,
                requireToken: nowUrl === 'club-detail-preview',
            });
            if (
                nowUrl === 'club-detail-preview' &&
                response.isSuccess === false
            ) {
                const reResponse = await apiRequest({
                    url: `/api/clubs/${id}`,
                });
                setClubDetail({
                    name: reResponse.result.name || '없음',
                    description: reResponse.result.description || '없음',
                    category: reResponse.result.category || '없음',
                    leaderName: reResponse.result.leaderName || '없음',
                    leaderPhone: reResponse.result.leaderPhone || '없음',
                    activities: reResponse.result.activities || '없음',
                    membershipFee: reResponse.result.membershipFee || '없음',
                    snsUrl: reResponse.result.snsUrl || '없음',
                    recruitmentStatus:
                        reResponse.result.recruitmentStatus || '없음',
                    applicationUrl: reResponse.result.applicationUrl || '없음',
                    profileImageUrl:
                        reResponse.result.profileImageUrl || '없음',
                });
            } else {
                if (response) {
                    setClubDetail({
                        name: response.result.name || '없음',
                        description: response.result.description || '없음',
                        category: response.result.category || '없음',
                        leaderName: response.result.leaderName || '없음',
                        leaderPhone: response.result.leaderPhone || '없음',
                        activities: response.result.activities || '없음',
                        membershipFee: response.result.membershipFee || '없음',
                        snsUrl: response.result.snsUrl || '없음',
                        recruitmentStatus:
                            response.result.recruitmentStatus || '없음',
                        applicationUrl:
                            response.result.applicationUrl || '없음',
                        profileImageUrl:
                            response.result.profileImageUrl || '없음',
                    });
                }
            }
        };
        if (id) {
            getClubDetail(id);
        }
    }, [id, nowUrl]);
    const getRecruitState = () => {
        switch (clubDetail?.recruitmentStatus) {
            case 'RECRUITING':
                return '모집중';
            case 'UPCOMING':
                return '모집 예정';
            case 'CLOSE':
                return '모집 마감';
            default:
                return '모집 마감'; // clubDetail이 아직 없을 때의 기본값
        }
    };

    return (
        <ClubDetailProvider
            value={{
                nowUrl: nowUrl,
                clubName: clubDetail?.name || null,
                clubImg: clubDetail?.profileImageUrl || DEFAULT_CLUB_IMAGE,
                clubId: id,
            }}
        >
            <PageContainer $nowUrl={nowUrl}>
                <PreviewContainer>
                    {nowUrl === 'club-detail-preview' && (
                        <BackButton
                            onClick={() => {
                                navigate(`/admin/club/${id}/summary-info`);
                            }}
                        >
                            ＜ 돌아가기
                        </BackButton>
                    )}
                    <ClubHeader>
                        <ClubImage
                            src={
                                clubDetail?.profileImageUrl ||
                                DEFAULT_CLUB_IMAGE
                            }
                            alt="Club Logo"
                        />
                        <PreviewWrapper>
                            <Preview>{clubDetail?.description}</Preview>
                            <ClubTitle>{clubDetail?.name}</ClubTitle>
                            <ClubTags>
                                <Tag>
                                    {`${getCategoryEmoji(
                                        getCategoryMapping(
                                            clubDetail?.category,
                                        ),
                                    )}\u00A0\u00A0${getCategoryMapping(
                                        clubDetail?.category,
                                    )}`}
                                </Tag>
                                {clubDetail && (
                                    <RecruitState $state={getRecruitState()}>
                                        {getRecruitState()}
                                    </RecruitState>
                                )}
                            </ClubTags>
                        </PreviewWrapper>
                    </ClubHeader>
                    <ClubInfo>
                        <ClubDetails>
                            <h3>동아리 정보 요약</h3>
                            <DividHr />
                            <DetailRow>
                                <IconImage src={jjang} alt="" />
                                <DetailLabel>대표</DetailLabel>
                                <DetailValue>
                                    {clubDetail?.leaderName}
                                </DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <IconImage src={phone} alt="" />
                                <DetailLabel>연락처</DetailLabel>
                                <DetailValue>
                                    {clubDetail?.leaderPhone}
                                </DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <IconImage src={label} alt="" />
                                <DetailLabel>정기모임</DetailLabel>
                                <DetailValue>
                                    {clubDetail?.activities}
                                </DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <IconImage src={card} alt="" />
                                <DetailLabel>회비</DetailLabel>
                                <DetailValue>
                                    {clubDetail?.membershipFee === '없음'
                                        ? '없음'
                                        : `${clubDetail?.membershipFee}원`}
                                </DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <IconImage src={sns} alt="" />
                                <DetailLabel>SNS</DetailLabel>
                                <DetailValue>
                                    {clubDetail?.snsUrl === '없음'
                                        ? '없음'
                                        : `@${clubDetail?.snsUrl}`}
                                </DetailValue>
                            </DetailRow>
                        </ClubDetails>
                    </ClubInfo>
                    {nowUrl === 'club' && (
                        <Button
                            disabled={
                                clubDetail?.recruitmentStatus !== 'RECRUITING'
                            }
                            onClick={() => {
                                if (clubDetail?.applicationUrl) {
                                    window.open(
                                        clubDetail.applicationUrl,
                                        '_blank',
                                    ); // url로 이동
                                }
                            }}
                            size="large"
                        >
                            {clubDetail?.recruitmentStatus !== 'RECRUITING'
                                ? '모집이 마감되었어요.'
                                : '가입 신청하기'}
                        </Button>
                    )}
                    {/* 동아리 소개 / 모집안내 / 활동로그 탭 모음 */}
                    <TabContainer>
                        <TabButton
                            onClick={() => setActiveTab('intro')}
                            $isActive={activeTab === 'intro'}
                        >
                            동아리 소개
                        </TabButton>
                        <TabButton
                            onClick={() => setActiveTab('recruit')}
                            $isActive={activeTab === 'recruit'}
                        >
                            모집안내
                        </TabButton>
                        <TabButton
                            disabled={nowUrl === 'club-detail-preview'}
                            onClick={() => setActiveTab('log')}
                            $isActive={activeTab === 'log'}
                        >
                            활동로그
                        </TabButton>
                    </TabContainer>
                    {/* 탭에서 고른 내용들 보여주는 곳 */}
                    <TabContents activeTab={activeTab} />
                </PreviewContainer>
            </PageContainer>
        </ClubDetailProvider>
    );
};

const PreviewContainer = styled.div``;
const BackButton = styled.div`
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

const ClubHeader = styled.div`
    width: 320px;
    height: 104px;
    background: white;
    display: flex;
    padding: 17px;
    margin-bottom: 8px;
    border-radius: 10px;
`;

const ClubImage = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 10px;
    margin-right: 21px;
`;

const PreviewWrapper = styled.div``;

const ClubInfo = styled.div`
    width: 320px;
    height: 201px;
    border-radius: 10px;
    background-color: white;
    flex: 1;
    margin-bottom: 8px;
`;

const Preview = styled.div``;

const ClubTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
`;

const ClubTags = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
`;

const Tag = styled.span`
    border-radius: 4px;
    padding: 2px 5px 2px 5px;
    padding: 2p;
    font-size: 12px;
    background-color: #eef4ff;
    color: #33639c;
`;

const RecruitState = styled.span<RecruitStateProps>`
    display: flex;
    min-width: 42px;
    padding: 2px 5px 2px 5px;
    border-radius: 5px;
    font-size: 12px;
    align-items: center;

    background-color: ${(props) => {
        if (props.$state === '모집중') {
            return '#fff4e4';
        } else if (props.$state === '모집 예정') {
            return '#F1F9DC';
        } else {
            return '#F7F7F7';
        }
    }};
    color: ${(props) => {
        if (props.$state === '모집중') {
            return '#F08A00';
        } else if (props.$state === '모집 예정') {
            return '#8BB421';
        } else {
            return '#606060';
        }
    }};
`;

const ClubDetails = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 11.5px;
`;

const DividHr = styled.hr`
    border: none;
    height: 0.5px;
    background-color: rgba(234, 234, 234, 1);
`;

const IconImage = styled.img`
    width: 15px;
    height: 15px;
`;

const DetailRow = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const DetailLabel = styled.span`
    color: #666;
    min-width: 80px;
`;

const DetailValue = styled.span`
    color: #333;
`;

const TabContainer = styled.div`
    width: 320px;
    display: flex;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 9px;
    justify-content: center;
`;

const TabButton = styled.button<TabButtonProps>`
    flex: 1;
    width: auto;
    padding-top: 24px;
    padding-bottom: 7px;
    background: none;
    border: none;
    border-bottom: 2px solid
        ${(props) => (props.$isActive ? '#33639C' : 'transparent')};
    color: #000000;
    font-weight: 500;
    cursor: pointer;
    &:disabled {
        color: #cccccc;
        cursor: not-allowed;
    }
`;

export { ClubDetailPage, ClubDetailContext };
