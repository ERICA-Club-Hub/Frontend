import { apiRequest } from '@/api/axios';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface LogMoadlProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedImageId: number;
    selectedImageUrl: string;
}

interface ActivityDTO {
    orderIndex: number;
    imageUrl: string;
}

// 여기서 동아리 명, 동아리 이미지도 사용되는데 props로 전달해서 사용해야할지?.?
// 이전 이미지 다음 이미지 정보도 API에 담아서 같이 주겠죠?!
const ActivityLogModal = ({
    setModalOpen,
    selectedImageId,
    selectedImageUrl,
}: LogMoadlProps) => {
    const [activityList, setActivityList] = useState<ActivityDTO[]>();
    const [currentIdx, setCurrentIdx] = useState<number>(0);

    useEffect(() => {
        const getActivities = async (activityId: number) => {
            const response = await apiRequest({
                url: `/api/activities/${activityId}`,
            });
            setActivityList(response.result.activityImageDTOList);
        };
        getActivities(selectedImageId);
    }, [selectedImageId]);

    const handlePrevImage = () => {
        if (activityList && currentIdx > 0) {
            setCurrentIdx(currentIdx - 1);
        }
    };

    const handleNextImage = () => {
        if (activityList && currentIdx < activityList.length - 1) {
            setCurrentIdx(currentIdx + 1);
        }
    };

    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => {
        setModalOpen(false);
    });
    return (
        activityList && (
            <ModalWrapper>
                <ModalOverlay>
                    <Modal ref={ref}>
                        <Header>
                            <ProfileSection>
                                <ProfileImage
                                    src={selectedImageUrl}
                                    alt="club logo"
                                />
                                <ClubName>UMC ERICA</ClubName>
                            </ProfileSection>
                            <CloseButton onClick={() => setModalOpen(false)}>
                                <ModalX>X</ModalX>
                            </CloseButton>
                        </Header>
                        <ImageSection>
                            <NavButton onClick={handlePrevImage}>＜</NavButton>
                            <MainImage
                                src={activityList[currentIdx].imageUrl}
                                alt="activity log"
                            />
                            <NavButton onClick={handleNextImage}>＞</NavButton>
                        </ImageSection>
                        <ContentSection>
                            <Date>2024.11.10</Date>
                            <Divider />
                            <Description>
                                {`UMC에서 GEMINI 지부 MT를 다녀왔어요! 
                                사진은 김치를 썰고 있는 회장님의 사진이랍니다 ^_^`}
                            </Description>
                        </ContentSection>
                    </Modal>
                </ModalOverlay>
            </ModalWrapper>
        )
    );
};

const ModalWrapper = styled.div`
    z-index: 1500;
    position: absolute;
`;

const ModalOverlay = styled.div`
    background-color: rgb(0 0 0 /71%);
    position: fixed;
    justify-content: center;
    inset: 0px;
    display: flex;
    align-items: center;
`;

const Modal = styled.div`
    min-height: 350px;
    max-height: 422px;
    width: 320px;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
`;

const ProfileSection = styled.div`
    display: flex;
    align-items: center;
`;

const ProfileImage = styled.img`
    margin-right: 10px;
    width: 29px;
    height: 29px;
    border-radius: 50%;
`;

const ClubName = styled.span`
    font-weight: 500;
    font-size: 14px;
    line-height: 16.8px;
`;

const CloseButton = styled.button`
    align-items: center;
    display: flex;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const ImageSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const NavButton = styled.button`
    width: 24px;
    height: 24px;
    background: none;
    border: none;
    cursor: pointer;
    padding-left: 9px;
    padding-right: 9px;
    padding-top: 6px;
    padding-bottom: 6px;
    font-weight: 800;
`;

const MainImage = styled.img`
    width: 210px;
    height: 210px;
    object-fit: cover;
    border-radius: 5px;
`;

const ContentSection = styled.div``;

const Date = styled.div`
    color: rgba(152, 152, 152, 1);
    margin-bottom: 7px;
`;

const Divider = styled.hr`
    border: none;
    border-top: 1px solid rgba(234, 234, 234, 1);
    margin: 7px 0;
`;

const Description = styled.p`
    white-space: pre-line;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
`;

const ModalX = styled.span`
    align-items: center;
    display: flex;
    padding: 5px;
    width: 10px;
    height: 10px;
    font-weight: 2000;
    font-size: 20px;
    margin-bottom: 9px;
`;

export { ActivityLogModal };
