import { useState } from 'react';
import Button from '@/components/Common/Button';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../src/assets/react.svg';
import sns from '../../assets/common/sns.svg';
import jjang from '../../assets/common/jjang.svg';
import card from '../../assets/common/card.svg';
import phone from '../../assets/common/phone.svg';
import label from '../../assets/common/label.svg';
import TabContents from './TabContents';

// tab 항목에서 활성화 여부를 판단할 props
interface TabButtonProps {
    isActive?: boolean;
}

// 받을 정보 : id, 이미지, 이름, 태그, 모집상태, 대표, 연락처, 정기모임, 회비, sns, 소개 정보, 모집안내, 활동로그

const ClubDetailPage = () => {
    const params = useParams();
    const [activeTab, setActiveTab] = useState<'intro' | 'recruit' | 'log'>(
        'intro',
    );

    console.log(params.id);
    return (
        <PageContainer>
            <ClubHeader>
                <ClubImage src={logo} alt="Club Logo" />
                <PreviewWrapper>
                    <Preview>대학생 IT 개발 연합동아리</Preview>
                    <ClubTitle>UMC ERICA</ClubTitle>
                    <ClubTags>
                        <Tag>연합동아리</Tag>
                        <RecruitState>모집중</RecruitState>
                    </ClubTags>
                </PreviewWrapper>
            </ClubHeader>

            <ClubInfo>
                <ClubDetails>
                    <h3>동아리 정보 요약</h3>
                    <hr />
                    <DetailRow>
                        <IconImage src={jjang} alt="" />
                        <DetailLabel>대표</DetailLabel>
                        <DetailValue>이름 들어갈 곳</DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <IconImage src={phone} alt="" />
                        <DetailLabel>연락처</DetailLabel>
                        <DetailValue>연락처 들어갈 곳</DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <IconImage src={label} alt="" />
                        <DetailLabel>정기모임</DetailLabel>
                        <DetailValue>어쩌구</DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <IconImage src={card} alt="" />
                        <DetailLabel>회비</DetailLabel>
                        <DetailValue>저쩌구</DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <IconImage src={sns} alt="" />
                        <DetailLabel>SNS</DetailLabel>
                        <DetailValue>@@@</DetailValue>
                    </DetailRow>
                </ClubDetails>
            </ClubInfo>
            <Button size="large">가입 신청하기</Button>
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
                    onClick={() => setActiveTab('log')}
                    $isActive={activeTab === 'log'}
                >
                    활동로그
                </TabButton>
            </TabContainer>

            <TabContents activeTab={activeTab}></TabContents>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 20px;
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
    height: 18px;
    padding: 2px 5px 2px 5px;
    border-radius: 4px;
    font-size: 12px;
    background-color: #eef4ff;
    color: #33639c;
`;

const RecruitState = styled.span`
    width: 42px;
    height: 18px;
    padding: 2px 5px 2px 5px;
    border-radius: 5pc;
    font-size: 12px;
    background-color: #fff4e4;
    color: #f08a00;
`;

const ClubDetails = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
        ${(props) => (props.$isActive ? '#4299e1' : 'transparent')};
    color: ${(props) => (props.$isActive ? '#4299e1' : '#666')};
    font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
    cursor: pointer;
`;

export { ClubDetailPage };
