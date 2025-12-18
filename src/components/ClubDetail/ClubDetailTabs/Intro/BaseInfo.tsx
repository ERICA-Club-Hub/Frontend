import { useBaseInfo } from '@/hooks/club-detail/useBaseInfo';
import ContentBlock from '../ContentBlock';
import styled from 'styled-components';

export default function BaseInfo() {
    const { items, isLoading } = useBaseInfo();

    if (isLoading) return null;

    return (
        <ContentBlock title="동아리 기본 정보">
            <ClubDetails>
                {items.map((info) => (
                    <DetailRow key={info.key}>
                        <IconImage src={info.iconUrl} alt={info.label} />
                        <DetailLabel>{info.label}</DetailLabel>
                        <DetailValue
                            $clickable={info.clickable}
                            onClick={
                                info.clickable && 'onClick' in info
                                    ? info.onClick
                                    : undefined
                            }
                        >
                            {info.value}
                        </DetailValue>
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

const DetailValue = styled.span<{ $clickable?: boolean }>`
    color: #333;
    cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
    text-decoration: ${({ $clickable }) => ($clickable ? 'underline' : 'none')};
`;
