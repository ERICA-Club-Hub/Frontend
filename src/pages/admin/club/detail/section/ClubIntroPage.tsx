import styled from 'styled-components';
import { ButtonGroupWrapper } from '@/styles/admin-club-detail/style';
import { useState } from 'react';
import Button from '@/components/Common/Button';
import { IClubIntroValue, IEventScheduleValue } from '@/types';
import { apiRequest } from '@/api/apiRequest';
import { useRecoilValue } from 'recoil';
import { clubIdSelector } from '@/store/clubInfoState';
import { ClubIntroProvider } from '@/contexts/ClubIntroContext';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/config/queryClient';
import {
    ClubDescription,
    MonthlyEventSchedule,
} from '@/components/AdminClubDetail';

function ClubIntroPage() {
    const clubId = useRecoilValue(clubIdSelector);

    const [schedules, setSchedules] = useState<IEventScheduleValue[]>([
        { month: 1, content: '' },
    ]);
    const [inputValue, setInputValue] = useState<IClubIntroValue>({
        introduction: '',
        activity: '',
        recruitment: '',
    });

    const saveMutation = useMutation({
        mutationFn: async () => {
            const [introResponse, scheduleResponse] = await Promise.all([
                apiRequest({
                    url: `/api/clubs/club-admin/${clubId}/introduction`,
                    method: 'POST',
                    data: inputValue,
                    requireToken: true,
                }),
                apiRequest({
                    url: `/api/clubs/club-admin/${clubId}/schedules`,
                    method: 'POST',
                    data: schedules,
                    requireToken: true,
                }),
            ]);

            return { introResponse, scheduleResponse };
        },
        onSuccess: () => {
            // 해당 쿼리키를 stale 상태로 변경
            // -> 기존에 캐시된 데이터를 사용할 수 없도록 하여 이후 호출 시에 최신 데이터를 다시 가져오도록 트리거
            queryClient.invalidateQueries({
                queryKey: [clubId, 'clubDescription'],
            });
        },
        onError: (error) => {
            console.error('동아리 소개글 저장하기 실패', error);
        },
    });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;

        try {
            // 저장하기
            if (target.name === 'save') {
                saveMutation.mutate();
            }
            // 미리보기
            else if (target.name === 'preview') {
                // 미리보기 API 호출 및 페이지 이동 로직 추가
            }
        } catch (error) {
            console.error('저장하기 or 미리보기 실패', error);
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
