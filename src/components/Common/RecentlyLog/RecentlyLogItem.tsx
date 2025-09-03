import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface RecentlyLogItemProps {
    clubId: number;
    imgUrl: string;
    clubLogoImgUrl: string;
    clubName: string;
}

export default function RecentlyLogItem({
    clubId,
    imgUrl,
    clubLogoImgUrl,
    clubName,
}: RecentlyLogItemProps) {
    const navigate = useNavigate();
    return (
        <LogItemStandard onClick={() => navigate(`/club/${clubId}`)}>
            <LogoItemImg src={imgUrl} />
            <LogoItemClubInfo>
                <LogoItemClubLogo src={clubLogoImgUrl} />
                <LogoItemClubName>{clubName}</LogoItemClubName>
            </LogoItemClubInfo>
        </LogItemStandard>
    );
}

const LogItemStandard = styled.div`
    width: 155px;
    height: 155px;
    border-radius: 10px;
    position: relative;
`;

const LogoItemImg = styled.img`
    position: absolute;
    width: 155px;
    height: 155px;
    border-radius: 10px;
`;

const LogoItemClubInfo = styled.div`
    bottom: 10px;
    left: 10px;
`;

const LogoItemClubLogo = styled.img``;

const LogoItemClubName = styled.span``;
