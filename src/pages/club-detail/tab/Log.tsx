import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { ActivityLogModal } from '../../../components/ClubDetail/ActivityLogModal';
import { apiRequest } from '@/api/apiRequest';
import { ClubDetailContext } from '../ClubDetailPage';

interface ActivityThumbnailList {
    activityId: number;
    thumbnailUrl: string;
}

export default function Log() {
    const [activityThumbnailList, setActivityThumbnailList] = useState<
        ActivityThumbnailList[]
    >([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedImageId, setSelectedImageId] = useState<number>(0);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
    const context = useContext(ClubDetailContext);
    const nowUrl = context?.nowUrl;
    const clubId = context?.clubId;
    const clubName = context?.clubName;
    const clubImg = context?.clubImg;

    useEffect(() => {
        const getActivityThumbnailList = async (clubId?: string) => {
            const requestUrl =
                nowUrl === 'club-detail-preview'
                    ? `/api/activities/club/${clubId}`
                    : `/api/activities/club/${clubId}`; // api 개발되면 수정
            const response = await apiRequest({
                url: requestUrl,
                requireToken: nowUrl === 'club-detail-preview',
            });
            setActivityThumbnailList(response.result.activityThumbnailDTOList);
        };
        getActivityThumbnailList(clubId);
    }, [clubId, nowUrl]);

    const handlClickImg = (id: number, url: string) => {
        setSelectedImageUrl(url);
        setSelectedImageId(id);
        setModalOpen(true);
    };
    return activityThumbnailList?.length > 0 ? (
        <Container>
            <LogGrid>
                {activityThumbnailList.map((activity) => (
                    <LogImg
                        onClick={() => {
                            handlClickImg(
                                activity.activityId,
                                activity.thumbnailUrl,
                            );
                        }}
                        key={activity.activityId}
                        src={activity.thumbnailUrl}
                    ></LogImg>
                ))}
            </LogGrid>
            {modalOpen && (
                <ActivityLogModal
                    clubName={clubName}
                    clubImg={clubImg}
                    setModalOpen={setModalOpen}
                    selectedImageId={selectedImageId}
                    selectedImageUrl={selectedImageUrl}
                />
            )}
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
    background-color: white;
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
