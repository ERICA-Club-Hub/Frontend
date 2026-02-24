import { useNavigate } from 'react-router-dom';
import SurveyBox from '@/assets/common/surveyBox.svg?react';
import {
    ALERT_MODAL_MESSAGE,
    PROMPT_MODAL_MESSAGE,
} from '@/components/Modal/modal.constant';
import { useFeedbackMutation } from '../api/feedback.mutations';
import { PromptModal } from '@/components/Modal/PromptModal';
import { AlertModal } from '@/components/Modal/AlertModal';
import useModal from '@/components/Modal/useModal';

export default function FeedbackBanner() {
    const navigate = useNavigate();
    const modal = useModal();

    const { mutateAsync: submitFeedback } = useFeedbackMutation();

    const handleClick = async () => {
        await modal.push('prompt', PromptModal, {
            title: PROMPT_MODAL_MESSAGE.FEEDBACK.title,
            placeholder: PROMPT_MODAL_MESSAGE.FEEDBACK.placeholder,
            inputType: 'textarea',
            onSubmit: async (inputValue: string) => {
                await submitFeedback({ content: inputValue });

                modal.push('alert', AlertModal, {
                    title: ALERT_MODAL_MESSAGE.FEEDBACK.title,
                    actionLabel: ALERT_MODAL_MESSAGE.FEEDBACK.actionLabel,
                    icon: ALERT_MODAL_MESSAGE.FEEDBACK.icon,
                    onAction: () => navigate('/club/search?type=central'),
                });
            },
        });
    };

    return (
        <div className="flex justify-center items-center mt-5">
            <button
                onClick={handleClick}
                className="bg-transparent border-none cursor-pointer p-0"
            >
                <SurveyBox />
            </button>
        </div>
    );
}
