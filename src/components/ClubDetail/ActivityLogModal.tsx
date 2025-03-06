import { apiRequest } from '@/api/apiRequest';
import { useClickOutside } from '@/hooks/actions/useClickOutside';
import { DEFAULT_CLUB_IMAGE } from '@/utils/getDefaultImg';
import { useEffect, useRef, useState } from 'react';
import closeIcon from '../../assets/common/closed-btn.svg';
import left from '../../assets/common/Expand_right.svg';
import right from '../../assets/common/card_right_arrow.svg';
import styled from 'styled-components';

interface LogMoadlProps {
    clubName?: string | null;
    clubImg?: string | null;
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
    clubName,
    clubImg,
    setModalOpen,
    selectedImageId,
}: LogMoadlProps) => {
    const [modalContent, setModalContent] = useState<string>('');
    const [modalDate, setModalDate] = useState<string>('');
    const [activityList, setActivityList] = useState<ActivityDTO[]>();
    const [currentIdx, setCurrentIdx] = useState<number>(0);

    useEffect(() => {
        const getActivities = async (activityId: number) => {
            const response = await apiRequest({
                url: `/api/activities/${activityId}`,
            });
            setActivityList(response.result.activityImageDTOList);
            setModalContent(response.result.content);
            setModalDate(response.result.date);
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
        <ModalWrapper>
            <ModalOverlay>
                <Modal ref={ref}>
                    {activityList && (
                        <>
                            <Header>
                                <ProfileSection>
                                    <ProfileImage
                                        src={clubImg || DEFAULT_CLUB_IMAGE}
                                        alt="club logo"
                                    />
                                    <ClubName>{clubName}</ClubName>
                                </ProfileSection>
                                <CloseButton
                                    onClick={() => setModalOpen(false)}
                                >
                                    <img src={closeIcon} />
                                </CloseButton>
                            </Header>
                            <ImageSection>
                                <NavButton onClick={handlePrevImage}>
                                    <img src={left} />
                                </NavButton>
                                <MainImage
                                    src={activityList[currentIdx].imageUrl}
                                    alt="activity log"
                                />
                                <NavButton onClick={handleNextImage}>
                                    <img src={right} />
                                </NavButton>
                            </ImageSection>
                            <ContentSection>
                                <Date>{modalDate}</Date>
                                <Divider />
                                <Description>{modalContent}</Description>
                            </ContentSection>
                        </>
                    )}
                </Modal>
            </ModalOverlay>
        </ModalWrapper>
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

export { ActivityLogModal };
