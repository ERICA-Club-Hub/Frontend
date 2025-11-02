import styled from 'styled-components';
import { useActivityLogList } from '@/hooks/queries/club-detail/useClubLog';
import { useClubIdByParams } from '@/hooks/useClubIdByParams';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

export default function ClubActivityLog() {
    const clubId = useClubIdByParams();
    const navigate = useNavigate();
    const { data: activityLogResponse, isLoading } = useActivityLogList(clubId);

    const handleClickImg = (activityId?: number) => {
        if (!activityId) {
            alert('잘못된 활동 로그에 대한 접근입니다.');
            return;
        }
        navigate(PATHS.CLUB_ACTIVITY_DETAIL(clubId, activityId));
    };

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    const activityLogList =
        activityLogResponse?.result?.activityThumbnailDTOList || [];

    return activityLogList.length > 0 ? (
        <Container>
            <LogGrid>
                {activityLogList.map((activity) => (
                    <LogImg
                        onClick={() => handleClickImg(activity.activityId)}
                        key={activity.activityId}
                        src={activity.thumbnailUrl}
                        alt="activity log"
                    />
                ))}
            </LogGrid>
        </Container>
    ) : (
        <NullContainer>
            <ContainerV>
                <XSize>🅧</XSize>
                <span>활동로그가 비었어요.</span>
            </ContainerV>
        </NullContainer>
    );
}

const LogGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
`;

const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 328px;
    margin-bottom: 7px;
`;

const ContainerV = styled.div`
    background-color: none;
    border-radius: 10px;
    padding: 20px;
    width: 328px;
    margin-bottom: 7px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const LogImg = styled.img`
    width: 92px;
    height: 92px;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

const NullContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const XSize = styled.span`
    font-size: 30px;
`;
