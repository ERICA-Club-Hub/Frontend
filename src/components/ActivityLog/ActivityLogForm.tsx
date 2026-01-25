import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IActivityLogValue } from '@/types';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import { TextArea } from '../Common/TextArea';
import { AdminButtonWrapper } from '@/components/Common';
import Button from '../Common/Button';
import useToggle from '@/hooks/actions/useToggle';
import ActionModal from '../Common/Modal/ActionModal';
import useAdminClubQueries from '@/hooks/queries/useClubAdminQueries';
import { useRecoilValue } from 'recoil';
import { clubIdSelector } from '@/domains/auth/model/clubInfoState';
import useBulletPointConverter from '@/hooks/actions/useBulletPointConverter';
import { dateFormatHandler, handleDateChange } from '@/utils/dateFormatHandler';
import CarouselImage from './CarouselImage';
import { ActivityLogProvider } from '@/contexts/ActivityLogContext';
import LoadingModal from '../Common/Loading/LoadingModal';
import axios from 'axios';
import { useErrorHandler } from '@/hooks/handler/useErrorHandler';

function ActivityLogForm({ mode }: { mode: string }) {
    const location = useLocation();
    const { activityId } = location.state || {}; // 전달된 state에서 id 받아오기 -> id가 있으면 해당 동아리 활동로그 상세(현재 폼)로 이동
    const clubId = useRecoilValue(clubIdSelector);
    const { isOpen, toggle } = useToggle(); // 삭제하기 Modal toggle
    const { handleError } = useErrorHandler();

    // 로컬 상태
    const [inputValue, setInputValue] = useState<IActivityLogValue>({
        content: '',
        date: '',
    });
    const [postImg, setPostImg] = useState<File[]>([]); // 요청 시 보낼 이미지
    const [previewImg, setPreviewImg] = useState<string[]>([]); // 미리보기 이미지
    const [currentIdx, setCurrentIdx] = useState<number>(0);
    const [isEditBtnClicked, setIsEditBtnClicked] = useState<boolean>(false);

    // 활동로그 생성 mutation 호출
    const {
        useDetailActivitiesLogQuery,
        useCreateActivityLogMutation,
        useUpdateActivityLogMutation,
        useDeleteActivityLogMutation,
    } = useAdminClubQueries();
    const createActivityLogMutation = useCreateActivityLogMutation(clubId);
    const deleteActivityLogMutation = useDeleteActivityLogMutation(activityId);
    const updateActivityLogMutation = useUpdateActivityLogMutation(activityId);

    // 활동로그 상세 불러오기 Query 호출
    const { error } = useDetailActivitiesLogQuery({
        activityId: activityId,
        setInputValue,
        setPreviewImg,
        setPostImg,
    });

    // 토큰 만료 처리
    useEffect(() => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            handleError(error);
        }
    }, [error]);

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
            createActivityLogMutation.mutate(formData);
        } else if (mode === 'edit') {
            // 이미지 변경점이 없으면 보내지 않음
            updateActivityLogMutation.mutate(formData);
        }
    };

    // 삭제하기
    const handleDeleteActivityLog = () => {
        toggle();
        deleteActivityLogMutation.mutate();
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
                            size="small"
                            backgroundColor="gray"
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
                    <AdminButtonWrapper>
                        {mode === 'edit' && !isEditBtnClicked ? (
                            <>
                                <Button
                                    type="button"
                                    size="small"
                                    variant="outlined"
                                    outlineColor="#DC5151"
                                    disabled={false}
                                    onClick={toggle}
                                >
                                    삭제하기
                                </Button>
                                <Button
                                    type="button"
                                    size="small"
                                    variant="outlined"
                                    // disabled={!isValid}
                                    onClick={() => setIsEditBtnClicked(true)}
                                >
                                    수정하기
                                </Button>
                            </>
                        ) : (
                            <Button
                                type="button"
                                size="small"
                                disabled={!isValid}
                                onClick={handleSaveActivityLog}
                            >
                                저장하기
                            </Button>
                        )}
                    </AdminButtonWrapper>
                </div>
            </ActivityLogProvider>

            {/* 로딩 Modal */}
            <LoadingModal
                isPending={
                    createActivityLogMutation.isPending ||
                    updateActivityLogMutation.isPending
                }
                isSuccess={
                    createActivityLogMutation.isSuccess ||
                    updateActivityLogMutation.isSuccess
                }
            />

            {/* 삭제하기 Modal */}
            <ActionModal
                isOpen={isOpen}
                toggle={toggle}
                action={handleDeleteActivityLog}
            />
        </>
    );
}

export { ActivityLogForm };
