import styled from 'styled-components';

interface OfficialAcountItemProps {
    clubLogoUrl?: string;
    clubName: string;
    clubSNSId: string;
    onClick: () => void;
}

export default function OfficialAcountItem({
    clubName,
    clubLogoUrl,
    clubSNSId,
    onClick,
}: OfficialAcountItemProps) {
    return (
        <ItemContainer onClick={onClick}>
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
    align-items: center;
    flex-direction: column;
    background-color: #fdfdfd;
    border: 1px solid #eceff3;
`;

const ClubLogoContainr = styled.div`
    width: 72px;
    height: 72px;
`;

const ClubLogo = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`;

const ClubInfo = styled.div`
    padding: 0 12px 0 12px;
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const ClubName = styled.p`
    font-weight: 500;
    font-size: 12px;
    color: #1c232c;
`;

const ClubSNSId = styled.p`
    font-weight: 400;
    font-size: 12px;
    color: #587189;
`;
