import Card from '../../components/Common/Card';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import downloadIcon from '../../assets/common/card_download.svg';
import { apiRequest } from '@/api/apiRequest';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const ContentWrapper = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    color: #232323;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 20px 0px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(35, 35, 35, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    width: 320px;
    min-height: 64px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid var(--Gray-4, #f7f7f7);
    background: #fff;
    z-index: 1001;
    position: relative;
    top: -10vh;
    padding: 20px;
    box-sizing: border-box;
`;

const DownloadButton = styled.button<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 5px 0;
    border: none;
    background: none;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? 0.7 : 1};
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

interface Document {
    id: number;
    title: string;
    date: string;
}

interface FileDTO {
    fileName: string;
    downloadUrl: string;
}

const ResourcesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<FileDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadFile = async (url: string, fileName: string) => {
        try {
            setIsDownloading(true);
            // fetch를 사용하여 파일 데이터를 가져옵니다
            const response = await fetch(url);
            
            // 응답이 성공적이지 않으면 에러를 던집니다
            if (!response.ok) {
                throw new Error('파일 다운로드에 실패했습니다');
            }
            
            // 응답으로부터 Blob 객체를 생성합니다
            const blob = await response.blob();
            
            // Blob URL을 생성합니다
            const blobUrl = window.URL.createObjectURL(blob);
            
            // 다운로드 링크를 생성하고 클릭합니다
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            
            // 사용 후 리소스를 정리합니다
            window.URL.revokeObjectURL(blobUrl);
            document.body.removeChild(link);
        } catch (error) {
            console.error('파일 다운로드 중 오류가 발생했습니다:', error);
            alert('파일 다운로드에 실패했습니다. 다시 시도해 주세요.');
        } finally {
            setIsDownloading(false);
        }
    };

    useEffect(() => {
        const fetchDocuments = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiRequest({
                    url: '/api/documents',
                    method: 'GET',
                });

                const documentList = response?.result?.documentDTOList || [];
                setDocuments(documentList);
            } catch (error) {
                console.error('문서 목록을 불러오는데 실패했습니다:', error);
                setError('자료를 불러오는데 실패했습니다. 다시 시도해 주세요.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const handleCardClick = async (documentId: number) => {
        try {
            const response = await apiRequest({
                url: `/api/documents/${documentId}`,
                method: 'GET',
            });

            const files = response?.result?.fileDTOList || [];
            setSelectedFiles(files);
            setIsModalOpen(true);
        } catch (error) {
            console.error('파일 목록을 불러오는데 실패했습니다:', error);
            setSelectedFiles([]);
        }
    };

    return (
        <PageContainer>
            <ContentWrapper>
                <Title>자료실</Title>
                <Body>
                    {isLoading ? (
                    <div>로딩 중...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : documents.length > 0 ? (
                    documents.map((document) => (
                        <Card
                            key={document.id}
                            $variant="resources"
                            title={document.title}
                            date={document.date}
                            onClick={() => handleCardClick(document.id)}
                        />
                    ))
                ) : (
                    <div>등록된 자료가 없습니다.</div>
                )}
            </Body>
            {isModalOpen && (
                <ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        {selectedFiles.map((file, index) => (
                            <DownloadButton
                                key={index}
                                onClick={() => downloadFile(file.downloadUrl, file.fileName)}
                                disabled={isDownloading}
                            >
                                <ModalText>{isDownloading ? '다운로드 중...' : file.fileName}</ModalText>
                                <DownloadIcon
                                    src={downloadIcon}
                                    alt="download"
                                />
                            </DownloadButton>
                        ))}
                    </ModalContent>
                    </ModalOverlay>
                )}
            </ContentWrapper>
        </PageContainer>
    );
};

export { ResourcesPage };
