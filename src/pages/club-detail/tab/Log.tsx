import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ActivityLogModal } from '../ActivityLogModal';
import { apiRequest } from '@/api/apiRequest';
import { useLocation } from 'react-router-dom';

interface LogProps {
    clubName?: string | null;
    clubImg?: string | null;
    clubId: string;
}

interface ActivityThumbnailList {
    activityId: number;
    thumbnailUrl: string;
}

export default function Log({ clubId, clubImg, clubName }: LogProps) {
    const [activityThumbnailList, setActivityThumbnailList] = useState<
        ActivityThumbnailList[]
    >([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedImageId, setSelectedImageId] = useState<number>(0);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
    const nowUrl = useLocation().pathname.split('/')[1];

    useEffect(() => {
        const getActivityThumbnailList = async (clubId: string) => {
            const requestUrl =
                nowUrl === 'club-detail-preview'
                    ? `/api/activities/club/${clubId}`
                    : `/api/activities/club/${clubId}`;
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
            <XSize>🅧</XSize>
            <span>활동로그가 비었어요.</span>
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
const LogImg = styled.img`
    width: 92px;
    height: 92px;
    border-radius: 5px;
`;
const NullContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 81px;
    gap: 10px;
    align-items: center;
`;
const XSize = styled.span`
    font-size: 30px;
`;
