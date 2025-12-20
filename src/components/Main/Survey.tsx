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
        <div className="flex justify-center items-center mt-5">
            <button
                onClick={toggleSurveyModal}
                className="relative bg-transparent border-none cursor-pointer p-0 flex items-center [&_svg:last-child]:absolute [&_svg:last-child]:right-[25px] [&_svg:last-child]:top-1/2 [&_svg:last-child]:-translate-y-1/2"
            >
                <SurveyBox />
                <SurveyCardArrow />
            </button>
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
        </div>
    );
}
