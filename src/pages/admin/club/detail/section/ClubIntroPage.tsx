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
import useAdminClubQueries from '@/hooks/queries/useAdminClubQueries';

function ClubIntroPage() {
    const clubId = useRecoilValue(clubIdSelector);

    const [schedules, setSchedules] = useState<IEventScheduleValue[]>([
        { month: 1, content: '', id: null },
    ]);
    const [inputValue, setInputValue] = useState<IClubIntroValue>({
        introduction: '',
        activity: '',
        recruitment: '',
    });

    // 동아리 소개글 저장하기 mutation 호출
    const { useSaveClubIntroMutation } = useAdminClubQueries();
    const saveClubIntroMutation = useSaveClubIntroMutation({
        clubId,
        schedules,
        inputValue,
    });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;

        try {
            // 저장하기
            if (target.name === 'save') {
                saveClubIntroMutation.mutate();
            }
            // 미리보기
            else if (target.name === 'preview') {
                // 미리보기 API 호출 및 페이지 이동 로직 추가
            }
        } catch (error) {
            console.error('동아리 소개 저장하기 or 미리보기 실패', error);
        }
    };

    return (
        <ClubIntroProvider
            value={{
                schedules,
                setSchedules,
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
                    <Button
                        name="preview"
                        type="button"
                        size="small"
                        variant="outlined"
                        isDisabled={() => false}
                        onClick={handleSubmit}
                    >
                        미리보기
                    </Button>
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
