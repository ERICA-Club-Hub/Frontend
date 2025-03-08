import styled from 'styled-components';
import { useState } from 'react';
import { IActivityLogValue } from '@/types';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import PlusIcon from '@/assets/common/plus-icon.svg?react';
import ArrowIcon from '@/assets/common/Expand_right.svg?react';
import { TextArea } from '../Common/TextArea';
import useBulletPointConverter from '@/hooks/actions/useBulletPointConverter';
import { ButtonWrapper } from '@/styles/button';
import Button from '../Common/Button';
import useToggle from '@/hooks/actions/useToggle';
import ActionModal from '../Common/Modal/ActionModal';
import { dateFormatHandler } from '@/utils/dateFormatHandler';
import useAdminClubQueries from '@/hooks/queries/useClubAdminQueries';
import { useRecoilValue } from 'recoil';
import { clubIdSelector } from '@/store/clubInfoState';
import { ImageUpload } from '../UnionNotice';

function ActivityLogForm({ mode }: { mode: string }) {
    const clubId = useRecoilValue(clubIdSelector);
    const [inputValue, setInputValue] = useState<IActivityLogValue>({
        content: '',
        date: '',
    });
    const [postImg, setPostImg] = useState<File | File[] | null>([]); // 요청 이미지
    const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>( // 미리보기 이미지
        '',
    );
    const [isEditBtnClicked, setIsEditBtnClicked] = useState<boolean>(false);
    const { isOpen, toggle } = useToggle(); // 삭제하기 Modal toggle

    // 활동로그 생성 mutation 호출
    const { useCreateActivityLogMutation } = useAdminClubQueries();
    const createActivityLogMutation = useCreateActivityLogMutation(clubId);

    console.log(postImg);

    // 저장하기
    const handleSubmit = () => {
        // 날짜 형식을 YYYY-MM-DD로 변환
        const formattedDate = inputValue.date.replace(/\./g, '-');
        const updatedInputValue = { ...inputValue, date: formattedDate };

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

        createActivityLogMutation.mutate(formData);
    };

    const isValid =
        postImg &&
        inputValue.date.length === 10 &&
        inputValue.content.length > 0;

    return (
        <>
            <Container>
                <ActivityLogFormWrapper>
                    {/* 썸네일 이미지 */}
                    <ImageCarouselWrapper>
                        <PrevArrow>
                            <ArrowIcon width={24} height={24} />
                        </PrevArrow>
                        <ThumbnailImageWrapper>
                            <ImageUpload
                                setPostImg={setPostImg}
                                previewImg={previewImg}
                                setPreviewImg={setPreviewImg}
                                mode={mode}
                                isEditBtnClicked={isEditBtnClicked}
                                isImgList={true}
                            />
                            {Array.isArray(postImg) &&
                            postImg.length > 0 ? null : (
                                <IconWrapper>
                                    <PlusIcon
                                        width={24}
                                        height={24}
                                        strokeWidth={2}
                                    />
                                </IconWrapper>
                            )}
                        </ThumbnailImageWrapper>
                        <NextArrow>
                            <ArrowIcon width={24} height={24} strokeWidth={2} />
                        </NextArrow>
                    </ImageCarouselWrapper>

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
                            onClick={handleSubmit}
                        >
                            저장하기
                        </Button>
                    )}
                </ButtonWrapper>
            </Container>

            {/* 삭제하기 Modal */}
            <ActionModal isOpen={isOpen} toggle={toggle} action={() => {}} />
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

const ImageCarouselWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 278px;
    margin-bottom: 10px;
`;

const ThumbnailImageWrapper = styled.div`
    position: relative;
    width: 210px;
    height: 210px;
    cursor: pointer;
    border-radius: 5px;
`;

const PrevArrow = styled.div``;
const NextArrow = styled.div`
    transform: rotate(180deg);
`;

const IconWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
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
