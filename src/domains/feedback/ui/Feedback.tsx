import { useNavigate } from 'react-router-dom';
import SurveyBox from '@/assets/common/surveyBox.svg?react';
import SurveyCardArrow from '@/assets/common/surveyCard_arrow.svg?react';
import {
    ALERT_MODAL_MESSAGE,
    PROMPT_MODAL_MESSAGE,
} from '@/components/Modal/modal.constant';
import { useFeedbackMutation } from '../api/feedback.mutations';
import { PromptModal } from '@/components/Modal/PromptModal';
import { AlertModal } from '@/components/Modal/AlertModal';
import useModal from '@/components/Modal/useModal';

export default function Feedback() {
    const navigate = useNavigate();
    const modal = useModal();

    const { mutateAsync: submitFeedback } = useFeedbackMutation();

    const handleClick = async () => {
        await modal.push('prompt', PromptModal, {
            title: PROMPT_MODAL_MESSAGE.FEEDBACK.title,
            placeholder: PROMPT_MODAL_MESSAGE.FEEDBACK.placeholder,
            inputType: 'textarea',
            asyncOnSubmit: async (inputValue: string) => {
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
                className="relative bg-transparent border-none cursor-pointer p-0 flex items-center [&_svg:last-child]:absolute [&_svg:last-child]:right-[25px] [&_svg:last-child]:top-1/2 [&_svg:last-child]:-translate-y-1/2"
            >
                <SurveyBox />
                <SurveyCardArrow />
            </button>
        </div>
    );
}
