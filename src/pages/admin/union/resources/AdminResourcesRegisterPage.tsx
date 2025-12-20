import { apiRequest } from '@/api/apiRequest';
import Button from '@/components/Common/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type mode = 'edit' | 'manage';

interface AdminResourcesRegisterPageProps {
    mode: mode;
}

const AdminResourcesRegisterPage = ({
    mode = 'manage',
}: AdminResourcesRegisterPageProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const navigate = useNavigate();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
        }
    };
    const removeItem = (index: number) => {
        setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    };

    const postResources = async () => {
        console.log(inputValue, selectedFiles);

        const formData = new FormData();

        // requestBody를 application/json 타입의 Blob으로 추가
        const requestBodyBlob = new Blob(
            [JSON.stringify({ title: inputValue })],
            { type: 'application/json' },
        );
        formData.append('requestBody', requestBodyBlob);

        // 파일 추가
        if (selectedFiles && selectedFiles.length > 0) {
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('files', selectedFiles[i]);
            }
        }

        try {
            const response = await apiRequest({
                url: `/api/documents`,
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                requireToken: true,
            });
            navigate('/resources');

            return response;
        } catch (error) {
            console.error('에러 응답:', error);
            throw error;
        }
    };
    return (
        <div className="pt-[15px] px-5 flex flex-col gap-[10px]">
            <div className="flex flex-col gap-[10px]">
                <div className="p-5 flex flex-col gap-[10px] bg-white rounded-[10px]">
                    <span className="text-black font-semibold text-body-03">
                        자료 제목을 입력해 주세요.
                    </span>
                    <input
                        onChange={handleInputChange}
                        placeholder="자료 제목을 정확히 입력해 주세요."
                        className="bg-neutral-100 h-[40px] rounded-[10px] text-left pl-[15px] text-body-03 font-normal text-black placeholder:text-neutral-600"
                    />
                </div>
                <div className="p-5 flex flex-col gap-[10px] bg-white rounded-[10px]">
                    <span className="text-black font-semibold text-body-03">
                        자료를 업로드 해주세요.
                    </span>
                    {selectedFiles.length === 0 ? (
                        <div className="relative">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="opacity-0 absolute w-full h-full cursor-pointer"
                            />
                            <div className="bg-neutral-100 h-[40px] rounded-[10px] flex items-center justify-center text-body-03 text-neutral-600">
                                📂 버튼을 클릭해 업로드 해주세요.
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-[10px]">
                            {selectedFiles.map((file, index) => (
                                <div
                                    key={`file-${index}`}
                                    className="flex flex-col gap-[10px]"
                                >
                                    <div className="bg-neutral-100 h-[40px] rounded-[10px] flex items-center text-body-03 text-neutral-600 relative justify-between px-[15px]">
                                        <span className="font-medium text-caption text-black">
                                            📂 {file.name}
                                        </span>
                                        <button
                                            onClick={() => removeItem(index)}
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="relative">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="opacity-0 absolute w-full h-full cursor-pointer"
                                />
                                <div className="bg-neutral-100 h-[40px] rounded-[10px] flex items-center justify-center text-body-03 text-neutral-600">
                                    + 자료 추가하기
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-end gap-[5px]">
                {mode === 'manage' ? (
                    <div className="flex justify-end gap-[5px]">
                        <Button
                            size="small"
                            variant="filled"
                            isDisabled={() => false}
                            onClick={postResources}
                        >
                            저장하기
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-end gap-[5px]">
                        <Button
                            size="small"
                            variant="outlined"
                            isDisabled={() => false}
                            outlineColor="red"
                        >
                            삭제하기
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            isDisabled={() => false}
                        >
                            수정하기
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export { AdminResourcesRegisterPage };
