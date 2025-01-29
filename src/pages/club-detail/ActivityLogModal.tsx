import { useClickOutside } from '@/hooks/useClickOutside';
import { useRef } from 'react';
import styled from 'styled-components';

interface LogMoadlProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedImageId: string;
    selectedImageUrl: string;
}

// 여기서 동아리 명, 동아리 이미지도 사용되는데 props로 전달해서 사용해야할지?.?
// 이전 이미지 다음 이미지 정보도 API에 담아서 같이 주겠죠?!
const ActivityLogModal = ({
    setModalOpen,
    selectedImageId,
    selectedImageUrl,
}: LogMoadlProps) => {
    console.log(selectedImageId, selectedImageUrl); // 이거로 활동로그 api 호출
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => {
        setModalOpen(false);
    });
    return (
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
                            <span
                                style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    padding: '5px',
                                    width: '10px',
                                    height: '10px',
                                    fontWeight: '2000',
                                    fontSize: '20px',
                                    marginBottom: '9px',
                                }}
                            >
                                x
                            </span>
                        </CloseButton>
                    </Header>
                    <ImageSection>
                        <NavButton>{'<'}</NavButton>
                        <MainImage src={selectedImageUrl} alt="activity log" />
                        <NavButton>{'>'}</NavButton>
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
    font-weight: bold;
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
`;

export { ActivityLogModal };
