import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { IActivityLogValue } from '@/types';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import { TextArea } from '../Common/TextArea';
import { ButtonWrapper } from '@/styles/button';
import Button from '../Common/Button';
import useToggle from '@/hooks/actions/useToggle';
import ActionModal from '../Common/Modal/ActionModal';
import useAdminClubQueries from '@/hooks/queries/useClubAdminQueries';
import { useRecoilValue } from 'recoil';
import { clubIdSelector } from '@/store/clubInfoState';
import useBulletPointConverter from '@/hooks/actions/useBulletPointConverter';
import { dateFormatHandler, handleDateChange } from '@/utils/dateFormatHandler';
import CarouselImage from './CarouselImage';
import { ActivityLogProvider } from '@/contexts/ActivityLogContext';
import { IupdateImageOrderIdxList } from '@/types/activity-log.types';

function ActivityLogForm({ mode }: { mode: string }) {
    const location = useLocation();
    const { activityId } = location.state || {}; // 전달된 state에서 id 받아오기 -> id가 있으면 해당 동아리 활동로그 상세(현재 폼)로 이동
    const clubId = useRecoilValue(clubIdSelector);
    const { isOpen, toggle } = useToggle(); // 삭제하기 Modal toggle

    // 로컬 상태
    const [inputValue, setInputValue] = useState<IActivityLogValue>({
        content: '',
        date: '',
    });
    const [postImg, setPostImg] = useState<File[]>([]); // 요청 시 보낼 이미지
    const [previewImg, setPreviewImg] = useState<string[]>([]); // 미리보기 이미지
    const [updateImageOrderIdxList, setUpdateImageOrderIdxList] = useState<
        IupdateImageOrderIdxList[] // 이미지 변경 시 인덱스 리스트와의 매핑을 위한 상태
    >([]); // 이미지 순서 변경 시 인덱스 저장
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
    if (mode === 'edit' && activityId) {
        useDetailActivitiesLogQuery({
            activityId: activityId,
            setInputValue,
            setPreviewImg,
            setPostImg,
        });
    }

    console.log(postImg);

    // 저장하기 or 수정하기
    const handleSaveActivityLog = () => {
        // 날짜 형식을 YYYY-MM-DD로 변환
        const formattedDate = inputValue.date.replace(/\./g, '-');
        const updatedInputValue = {
            ...inputValue,
            date: formattedDate,
            // 수정모드일 때만 이미지 순서 인덱스 리스트 추가
            ...(mode === 'edit' && {
                changedActivityImageOrderIndexList: updateImageOrderIdxList.map(
                    (item) => item.currentIdx,
                ),
            }),
        };

        console.log('updatedInputValue', updatedInputValue);

        // FormData 생성
        const formData: FormData = new FormData();
        formData.append(
            'requestBody',
            new Blob([JSON.stringify(updatedInputValue)], {
                type: 'application/json',
            }),
        );

        if (mode === 'register') {
            if (Array.isArray(postImg)) {
                postImg.forEach((img) => {
                    formData.append('images', img);
                });
            }
            createActivityLogMutation.mutate(formData);
        } else if (mode === 'edit') {
            if (updateImageOrderIdxList) {
                const changedImgList = updateImageOrderIdxList.map(
                    (item) => item.image,
                );
                if (Array.isArray(changedImgList)) {
                    changedImgList.forEach((img) => {
                        formData.append('images', img);
                    });
                }
                updateActivityLogMutation.mutate(formData);
            }
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
                    updateImageOrderIdxList,
                    setUpdateImageOrderIdxList,
                    currentIdx,
                    setCurrentIdx,
                    mode,
                    isEditBtnClicked,
                }}
            >
                <Container>
                    <ActivityLogFormWrapper>
                        {/* 이미지 캐러셀 */}
                        <CarouselImage />

                        {/* 날짜 입력 폼 */}
                        <DateInputWrapper>
                            <DateInput
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
                            />
                        </DateInputWrapper>

                        <Line />

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
                    </ActivityLogFormWrapper>
                    <ButtonWrapper>
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
                    </ButtonWrapper>
                </Container>
            </ActivityLogProvider>

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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
`;

const ActivityLogFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 320px;
    height: 413px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    margin-bottom: 15px;
`;

const DateInputWrapper = styled.div`
    width: 230px;
`;

const DateInput = styled.input`
    width: 95px;
    height: 22px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px;
    background-color: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.subGray};

    &::placeholder {
        font-size: 12px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.subGray};
    }
`;

const Line = styled.div`
    width: 210px;
    height: 1px;
    margin: 5px;
    background-color: ${({ theme }) => theme.colors.mediumGray};
`;
