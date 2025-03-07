import styled from 'styled-components';
import { ButtonGroupWrapper } from '@/styles/admin-club-detail/style';
import { useState } from 'react';
import Button from '@/components/Common/Button';
import { IClubIntroValue, IEventScheduleValue } from '@/types';
import { useRecoilValue } from 'recoil';
import { clubIdSelector } from '@/store/clubInfoState';
import { ClubIntroProvider } from '@/contexts/ClubIntroContext';
import {
    ClubDescription,
    MonthlyEventSchedule,
} from '@/components/AdminClubDetail';
import useClubAdminQueries from '@/hooks/queries/useClubAdminQueries';

function ClubIntroPage() {
    const clubId = useRecoilValue(clubIdSelector);

    // 서버에서 받아와서 렌더링 시에 필요한 상태
    const [schedules, setSchedules] = useState<IEventScheduleValue[]>([
        { month: 1, content: '', id: 0 },
    ]);
    // 일정 생성 및 수정 시 API 호출 시 보낼 데이터 별도로 관리
    const [postSchedules, setPostSchedules] = useState<IEventScheduleValue[]>(
        [],
    );
    const [inputValue, setInputValue] = useState<IClubIntroValue>({
        introduction: '',
        activity: '',
        recruitment: '',
    });

    // 동아리 소개글 저장하기 mutation 호출
    const { useSaveClubIntroMutation } = useClubAdminQueries();
    const saveClubIntroMutation = useSaveClubIntroMutation({
        clubId,
        postSchedules,
        inputValue,
    });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;

        try {
            // 저장하기
            if (target.name === 'save') {
                saveClubIntroMutation.mutate();
            }
        } catch (error) {
            console.error('동아리 소개 저장하기 실패', error);
        }

        try {
            // 미리보기
            if (target.name === 'preview') {
                // 미리보기 API 호출 및 페이지 이동 로직 추가
            }
        } catch (error) {
            console.error('미리보기 실패', error);
        }
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
