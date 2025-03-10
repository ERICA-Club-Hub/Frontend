import styled from 'styled-components';
import { ButtonGroupWrapper } from '@/styles/admin-club-detail/style';
import { useState } from 'react';
import Button from '@/components/Common/Button';
import { IClubIntroValue, IEventScheduleValue } from '@/types';
import { ClubIntroProvider } from '@/contexts/ClubIntroContext';
import {
    ClubDescription,
    MonthlyEventSchedule,
} from '@/components/AdminClubDetail';
import useClubAdminQueries from '@/hooks/queries/useClubAdminQueries';

function ClubIntroPage() {
    // 서버에서 받아와서 렌더링 시에 필요한 상태
    const [schedules, setSchedules] = useState<IEventScheduleValue[]>([
        { month: 1, content: '' },
    ]);
    // 일정 생성 및 수정 시 API 호출 시 보낼 데이터 별도로 관리
    const [postSchedules, setPostSchedules] = useState<IEventScheduleValue[]>(
        [],
    );
    // 삭제할 일정 id 리스트 별도로 관리
    const [deleteScheduleIdList, setDeleteScheduleIdList] = useState<number[]>(
        [],
    );
    const [inputValue, setInputValue] = useState<IClubIntroValue>({
        introduction: '',
        activity: '',
        recruitment: '',
    });

    // 동아리 소개글 저장하기, 삭제하기 mutation 호출
    const { useSaveClubIntroMutation, useDeleteEventScheduleMutation } =
        useClubAdminQueries();
    const saveClubIntroMutation = useSaveClubIntroMutation({
        postSchedules,
        inputValue,
    });
    const deleteEventScheduleMutation = useDeleteEventScheduleMutation();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;

        // 저장하기
        if (target.name === 'save') {
            saveClubIntroMutation.mutate();

            deleteScheduleIdList.forEach((id) => {
                deleteEventScheduleMutation.mutate(id);
            });
        }

        // // 미리보기
        // if (target.name === 'preview') {
        //     // 미리보기 API 호출 및 페이지 이동 로직 추가
        // }
    };

    return (
        <ClubIntroProvider
            value={{
                schedules,
                setSchedules,
                postSchedules,
                setPostSchedules,
                inputValue,
                setInputValue,
                deleteScheduleIdList,
                setDeleteScheduleIdList,
            }}
        >
            <Container>
                {/* 주요 활동 일정 입력 */}
                <MonthlyEventSchedule />

                {/* 동아리 소개글 */}
                <ClubDescription />

                <ButtonGroupWrapper>
                    {/* <Button
                        name="preview"
                        type="button"
                        size="small"
                        variant="outlined"
                        isDisabled={() => false}
                        onClick={handleSubmit}
                    >
                        미리보기
                    </Button> */}
                    <Button
                        name="save"
                        type="button"
                        size="small"
                        isDisabled={() => false}
                        onClick={handleSubmit}
                    >
                        저장하기
                    </Button>
                </ButtonGroupWrapper>
            </Container>
        </ClubIntroProvider>
    );
}

export { ClubIntroPage };

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
