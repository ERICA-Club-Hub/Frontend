import styled from 'styled-components';
import SurveyBox from '@/assets/common/surveyBox.svg?react';
import SurveyCardArrow from '@/assets/common/surveyCard_arrow.svg?react';
import FeedbackModal from '@/components/Common/Modal/FeedbackModal';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';

export default function Survey() {
    const [isSurveyModalOpen, setIsSurveyModalOpen] = useState<boolean>(false);
    const toggleSurveyModal = () => {
        setIsSurveyModalOpen((prev) => !prev);
    };

    const submitFeedBackMutation = useMutation({
        mutationFn: async (feedbackContent: string) => {
            const response = await apiRequest({
                url: '/api/feedbacks',
                method: 'POST',
                data: {
                    content: feedbackContent,
                },
            });
            return response;
        },
        retry: 1,
        onSuccess: () => {
            setIsSurveyModalOpen(false);
        },
    });
    return (
        <SurveyBoxContainer>
            <SurveyButton onClick={toggleSurveyModal}>
                <SurveyBox />
                <SurveyCardArrow />
            </SurveyButton>
            <FeedbackModal
                isOpen={isSurveyModalOpen}
                toggle={toggleSurveyModal}
                title="이용경험을 공유해 주세요."
                subtitle="오류, 건의사항, 칭찬 등 모두 환영입니다 :)"
                type="feedback"
                onSubmit={(content: string) =>
                    submitFeedBackMutation.mutate(content)
                }
            />
        </SurveyBoxContainer>
    );
}

const SurveyBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const SurveyButton = styled.button`
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;

    svg:last-child {
        position: absolute;
        right: 25px;
        top: 50%;
        transform: translateY(-50%);
    }
`;
