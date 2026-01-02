import Card from '@/components/Common/Card';
import { useState, useEffect } from 'react';
import downloadIcon from '@/assets/common/card_download.svg';
import { apiRequest } from '@/api/apiRequest';
import { cn } from '@/utils/cn';

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
        <div className="flex flex-col items-center w-full">
            <div className="w-[320px] flex flex-col">
                <div className="text-body-01 font-semibold text-black my-5">
                    자료실
                </div>
                <div className="flex flex-col gap-2 w-full">
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
                </div>
                {isModalOpen && (
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-[rgba(35,35,35,0.4)] flex justify-center items-center z-[1000]"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <div
                            className="w-[320px] min-h-16 flex-shrink-0 rounded-[10px] border border-[#f7f7f7] bg-white z-[1001] relative -top-[10vh] p-5 box-border"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedFiles.map((file, index) => (
                                <button
                                    key={index}
                                    className={cn(
                                        'flex items-center justify-between w-full py-[5px] px-0',
                                        isDownloading
                                            ? 'cursor-not-allowed opacity-70'
                                            : 'cursor-pointer opacity-100',
                                    )}
                                    onClick={() =>
                                        downloadFile(
                                            file.downloadUrl,
                                            file.fileName,
                                        )
                                    }
                                    disabled={isDownloading}
                                >
                                    <div className="line-clamp-1 w-[240px] overflow-hidden text-black text-ellipsis text-caption font-medium text-left">
                                        {isDownloading
                                            ? '다운로드 중...'
                                            : file.fileName}
                                    </div>
                                    <img
                                        src={downloadIcon}
                                        alt="download"
                                        className="w-6 h-6 ml-auto"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export { ResourcesPage };
