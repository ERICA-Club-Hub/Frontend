import styled from 'styled-components';

interface OfficialAcountItemProps {
    clubLogoUrl?: string;
    clubName: string;
    clubSNSId: string;
}

export default function OfficialAcountItem({
    clubName,
    clubLogoUrl,
    clubSNSId,
}: OfficialAcountItemProps) {
    return (
        <ItemContainer>
            <ClubLogoContainr>
                <ClubLogo src={clubLogoUrl} />
            </ClubLogoContainr>
            <ClubInfo>
                <ClubName>{clubName}</ClubName>
                <ClubSNSId>{clubSNSId}</ClubSNSId>
            </ClubInfo>
        </ItemContainer>
    );
}

const ItemContainer = styled.div`
    width: 104px;
    height: 148px;
    border-radius: 8px;
    padding: 18px 0 18px 0;
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-direction: column;
`;

const ClubLogoContainr = styled.div`
    width: 72px;
    height: 72px;
    padding: 0 16px 0 16px;
`;

const ClubLogo = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`;

const ClubInfo = styled.div`
    padding: 0 12px 0 12px;
`;

const ClubName = styled.p`
    font-weight: 500;
    font-size: 12px;
    color: '#1C232C';
`;

const ClubSNSId = styled.p`
    font-weight: 400;
    font-size: 12px;
    color: '#587189';
`;
