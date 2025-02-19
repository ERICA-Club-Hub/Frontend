import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ActivityLogModal } from '../ActivityLogModal';
import { apiRequest } from '@/api/axios';

interface LogProps {
    clubId: string;
}

interface ActivityThumbnailList {
    activityId: number;
    thumbnailUrl: string;
}

export default function Log({ clubId }: LogProps) {
    const [activityThumbnailList, setActivityThumbnailList] = useState<
        ActivityThumbnailList[]
    >([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedImageId, setSelectedImageId] = useState<number>(0);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

    useEffect(() => {
        const getActivityThumbnailList = async (clubId: string) => {
            const response = await apiRequest({
                url: `/api/activities/club/${clubId}`,
            });
            setActivityThumbnailList(response.result);
        };
        getActivityThumbnailList(clubId);
    }, [clubId]);

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
                    setModalOpen={setModalOpen}
                    selectedImageId={selectedImageId}
                    selectedImageUrl={selectedImageUrl}
                />
            )}
        </Container>
    ) : (
        <div>없음</div>
    );
}
const LogGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
`;
const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 328px;
    margin-bottom: 7px;
`;
const LogImg = styled.img`
    width: 95px;
    height: 95px;
    border-radius: 5px;
`;
