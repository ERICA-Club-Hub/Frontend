import styled from 'styled-components';
import { ButtonGroupWrapper } from '@/styles/admin-club-detail/style';
import { useState } from 'react';
import Button from '@/components/Common/Button';
import { IClubIntroValue, IEventScheduleValue } from '@/types';
import { apiRequest } from '@/api/apiRequest';
import { useRecoilValue } from 'recoil';
import { clubIdselector } from '@/store/clubIdState';
import { MonthlyEventSchedule } from './MonthlyEventSchedule';
import { ClubDescription } from './ClubDescription';
import { ClubIntroProvider } from '@/contexts/ClubIntroContext';

function ClubIntro() {
    const clubId = useRecoilValue(clubIdselector);
    const [schedules, setSchedules] = useState<IEventScheduleValue[]>([]);
    const [inputValue, setInputValue] = useState<IClubIntroValue>({
        introduction: '',
        activity: '',
        recruitment: '',
    });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;

        try {
            let res;
            // 저장하기
            if (target.name === 'save') {
                res = await apiRequest({
                    url: `/api/clubs/club-admin/${clubId}/introduction`,
                    method: 'POST',
                    data: inputValue,
                    requireToken: true,
                });
            }
            // 미리보기
            else if (target.name === 'preview') {
                res = await apiRequest({
                    url: `/api/clubs/club-admin/${clubId}/introduction/draft`,
                    method: 'POST',
                    data: inputValue,
                    requireToken: true,
                });
            }

            console.log(res);
        } catch (error) {
            console.error('저장하기 실패', error);
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

export { ClubIntro };

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
