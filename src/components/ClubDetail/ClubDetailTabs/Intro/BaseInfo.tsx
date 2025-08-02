import sns from '../../../../assets/common/sns.svg';
import jjang from '../../../../assets/common/jjang.svg';
import card from '../../../../assets/common/card.svg';
import phone from '../../../../assets/common/phone.svg';
import label from '../../../../assets/common/label.svg';
import styled from 'styled-components';
import ContentBlock from '../ContentBlock';
import { useState } from 'react';

export default function BaseInfo() {
    const [baseInfo, setBaseInfo] = useState([
        { iconUrl: jjang, label: '대표', value: '대표자 이름이 없습니다.' },
        {
            iconUrl: phone,
            label: '연락처',
            value: ' 않았습니다.',
        },
        {
            iconUrl: label,
            label: '정기모임',
            value: ' 없습니다.',
        },
        {
            iconUrl: card,
            label: '회비',
            value: '되지 않았습니다.',
        },
        { iconUrl: sns, label: 'SNS', value: '' },
    ]);
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
