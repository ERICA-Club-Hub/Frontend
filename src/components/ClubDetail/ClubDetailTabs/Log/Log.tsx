import { useState } from 'react';
import styled from 'styled-components';
import { ActivityLogModal } from '../../ActivityLogModal';
import { useActivityLogList } from '@/hooks/queries/club-detail/useClubLog';
import { useClubIdByParams } from '@/hooks/useClubIdByParams';

export default function Log() {
    const clubId = useClubIdByParams();
    const { data: activityLogResponse, isLoading } = useActivityLogList(clubId);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedImageId, setSelectedImageId] = useState<number | undefined>(
        0,
    );
    const [selectedImageUrl, setSelectedImageUrl] = useState<
        string | undefined
    >('');

    const handleClickImg = (id?: number, url?: string) => {
        if (!id || !url) alert('잘못된 활동 로그에 대한 접근입니다.');
        setSelectedImageUrl(url);
        setSelectedImageId(id);
        setModalOpen(true);
    };

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    const activityLogList =
        activityLogResponse?.result?.activityThumbnailDTOList || [];

    return activityLogList.length > 0 ? (
        <Container>
            <LogGrid>
                <LogImg
                    onClick={() => {
                        handleClickImg(0, '');
                    }}
                    src={'asdf'}
                />
                {activityLogList.map((activity) => (
                    <LogImg
                        onClick={() => {
                            handleClickImg(
                                activity.activityId,
                                activity.thumbnailUrl,
                            );
                        }}
                        key={activity.activityId}
                        src={activity.thumbnailUrl}
                    />
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
