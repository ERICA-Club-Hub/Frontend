import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OptimizedImage from '../Image';

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
            <LogoItemImg src={imgUrl} width={155} height={155} />
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

const LogoItemImg = styled(OptimizedImage)`
    position: absolute;
    width: 155px;
    height: 155px;
    border-radius: 10px;
`;

const LogoItemClubInfo = styled.div`
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    gap: 5px;
    align-items: center;
`;

const LogoItemClubLogo = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 1.33px;
`;

const LogoItemClubName = styled.span`
    font-weight: 500;
    font-size: 13px;
    color: white;
`;
