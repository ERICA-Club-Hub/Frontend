import sns from '../../../../assets/common/sns.svg';
import jjang from '../../../../assets/common/jjang.svg';
import card from '../../../../assets/common/card.svg';
import phone from '../../../../assets/common/phone.svg';
import label from '../../../../assets/common/label.svg';
import styled from 'styled-components';
import ContentBlock from '../ContentBlock';
import { useClubInfo, useIsPreview } from '@/hooks/club-detail/useClubIntro';

export default function BaseInfo() {
    const { id, isPreview } = useIsPreview();
    const { data } = useClubInfo(id || '', isPreview);
    const baseInfo = [
        {
            key: 'leader',
            iconUrl: jjang,
            label: '대표',
            value: data?.leaderName || '대표자 이름이 없습니다.',
        },
        {
            key: 'contact',
            iconUrl: phone,
            label: '연락처',
            value: data?.leaderPhone || '연락처 정보가 제공되지 않았습니다.',
        },
        {
            key: 'meeting',
            iconUrl: label,
            label: '정기모임',
            value: data?.activities || '정해진 정기모임이 없습니다.',
        },
        {
            key: 'fee',
            iconUrl: card,
            label: '회비',
            value: data?.membershipFee
                ? `${data.membershipFee}원`
                : '회비 정보가 제공되지 않았습니다.',
        },
        {
            key: 'sns',
            iconUrl: sns,
            label: 'SNS',
            value: data?.snsUrl ? `@${data.snsUrl}` : 'SNS 정보가 없습니다.',
        },
    ];
    return (
        <ContentBlock title="동아리 기본 정보">
            <ClubDetails>
                {baseInfo.map((info) => (
                    <DetailRow>
                        <IconImage src={info.iconUrl} alt={info.label} />
                        <DetailLabel>{info.label}</DetailLabel>
                        <DetailValue>{info.value}</DetailValue>
                    </DetailRow>
                ))}
            </ClubDetails>
        </ContentBlock>
    );
}

const ClubDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 11.5px;
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
