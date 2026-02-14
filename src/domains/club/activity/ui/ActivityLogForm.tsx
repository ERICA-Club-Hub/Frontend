import { useState } from 'react';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import useBulletPointConverter from '@/hooks/useBulletPointConverter';
import { dateFormatHandler, handleDateChange } from '@/utils/dateFormatHandler';
import CarouselImage from './CarouselImage';
import { ActivityLogProvider } from '@/domains/club/activity/contexts/ActivityLogContext';
import TextArea from '@/components/InputField/TextArea';
import Button from '@/components/Button/Button';

type IActivityLogValue = {
    content: string;
    date: string;
};

function ActivityLogForm({ mode }: { mode: string }) {
    // 로컬 상태
    const [inputValue, setInputValue] = useState<IActivityLogValue>({
        content: '',
        date: '',
    });
    const [postImg, setPostImg] = useState<File[]>([]); // 요청 시 보낼 이미지
    const [previewImg, setPreviewImg] = useState<string[]>([]); // 미리보기 이미지
    const [currentIdx, setCurrentIdx] = useState<number>(0);
    const [isEditBtnClicked, setIsEditBtnClicked] = useState<boolean>(false);

    // 저장하기 or 수정하기
    const handleSaveActivityLog = () => {
        // 날짜 형식을 YYYY-MM-DD로 변환
        const formattedDate = inputValue.date.replace(/\./g, '-');
        const updatedInputValue = {
            ...inputValue,
            date: formattedDate,
        };

        // FormData 생성
        const formData: FormData = new FormData();
        formData.append(
            'requestBody',
            new Blob([JSON.stringify(updatedInputValue)], {
                type: 'application/json',
            }),
        );

        if (Array.isArray(postImg)) {
            postImg.forEach((img) => {
                formData.append('images', img);
            });
        }

        if (mode === 'register') {
            // 활동로그 생성 API 호출
        } else if (mode === 'edit') {
            // 활동로그 수정 API 호출
        }
    };

    const isValid =
        postImg &&
        inputValue.date.length === 10 &&
        inputValue.content.length > 0;

    return (
        <>
            <ActivityLogProvider
                value={{
                    postImg,
                    setPostImg,
                    previewImg,
                    setPreviewImg,
                    currentIdx,
                    setCurrentIdx,
                    mode,
                    isEditBtnClicked,
                }}
            >
                <div className="flex flex-col items-center pt-5">
                    <div className="flex flex-col items-center justify-center w-[320px] h-[413px] rounded-[10px] bg-white mb-[15px]">
                        {/* 이미지 캐러셀 */}
                        <CarouselImage />

                        {/* 날짜 입력 폼 */}
                        <div className="w-[230px]">
                            <input
                                value={inputValue.date}
                                name="date"
                                type="text"
                                placeholder="YYYY.MM.DD"
                                disabled={mode === 'edit' && !isEditBtnClicked}
                                maxLength={10}
                                onChange={(e) =>
                                    dateFormatHandler<IActivityLogValue>({
                                        e,
                                        setInputValue,
                                    })
                                }
                                onKeyDown={(e) =>
                                    handleDateChange<IActivityLogValue>({
                                        e,
                                        setInputValue,
                                    })
                                }
                                className="w-[95px] h-[22px] rounded-[5px] text-caption font-medium px-[10px] py-1 bg-neutral-100 text-neutral-500 placeholder:text-caption placeholder:font-medium placeholder:text-neutral-500"
                            />
                        </div>

                        <div className="w-[210px] h-px my-[5px] bg-neutral-200" />

                        {/* 내용 입력 폼 */}
                        <TextArea
                            maxLength={100}
                            placeholder="사진에 대한 설명을 입력해 주세요."
                            name="content"
                            value={inputValue.content}
                            disabled={mode === 'edit' && !isEditBtnClicked}
                            onChange={(e) =>
                                inputChangeHandler<IActivityLogValue>({
                                    e,
                                    setInputValue,
                                })
                            }
                            onKeyDown={(e) =>
                                useBulletPointConverter<IActivityLogValue>({
                                    e,
                                    setInputValue,
                                })
                            }
                        />
                    </div>
                    <div className="w-[320px] flex justify-end items-center gap-[5px]">
                        {mode === 'edit' && !isEditBtnClicked ? (
                            <>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="negative"
                                >
                                    삭제하기
                                </Button>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="neutral"
                                    onClick={() => setIsEditBtnClicked(true)}
                                >
                                    수정하기
                                </Button>
                            </>
                        ) : (
                            <Button
                                type="button"
                                size="sm"
                                disabled={!isValid}
                                onClick={handleSaveActivityLog}
                            >
                                저장하기
                            </Button>
                        )}
                    </div>
                </div>
            </ActivityLogProvider>
        </>
    );
}

export { ActivityLogForm };
