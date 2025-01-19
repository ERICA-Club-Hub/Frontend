import Card from "../../components/Common/Card"
import styled from 'styled-components';
import { useState } from 'react';
import downloadIcon from '../../assets/common/card_download.svg';

const Title = styled.div`
    color: #232323;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 20px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 20px;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(35, 35, 35, 0.40);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    width: 320px;
    height: 108px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid var(--Gray-4, #F7F7F7);
    background: #FFF;
    z-index: 1001;
    position: relative;
    top: -10vh;
    padding: 20px;
    box-sizing: border-box;
`;

const DownloadButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 5px 0;
    border: none;
    background: none;
    cursor: pointer;
`;

const ModalText = styled.div`
    display: -webkit-box;
    width: 240px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: left;
`;

const DownloadIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-left: auto;
`;

const ResourcesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return <div>
        <Title>자료실 페이지</Title>
        <Body>
            <Card 
                variant="type3" 
                title="총동아리연합회 예외 사업 신청서"
                date="2024.03.23"
                onClick={handleCardClick}
            />
            <Card 
                variant="type3" 
                title="금지물품 반입 허가서"
                date="2024.03.23"
                onClick={handleCardClick}
            />
            <Card 
                variant="type3" 
                title="동아리 재등록 서류 서식"
                date="2024.03.23"
                onClick={handleCardClick}
            />
        </Body>
        {isModalOpen && (
            <ModalOverlay onClick={handleModalClose}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <DownloadButton>
                        <ModalText>
                            제2대 총동아리연합회 UP 2학기 동아리 재등록 서류 서식
                        </ModalText>
                        <DownloadIcon src={downloadIcon} alt="download" />
                    </DownloadButton>
                    <DownloadButton>
                        <ModalText>
                            제2대 UP 동아리재등록서류에 관한 개인정보수집이용 동의서(학생용)
                        </ModalText>
                        <DownloadIcon src={downloadIcon} alt="download" />
                    </DownloadButton>
                </ModalContent>
            </ModalOverlay>
        )}
    </div>;
};

export { ResourcesPage };
