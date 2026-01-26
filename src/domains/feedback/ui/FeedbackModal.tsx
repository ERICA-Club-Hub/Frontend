import { IModal } from '@/types/modal.types';
import { FormEvent, useState } from 'react';
import { cn } from '@/utils/cn';
import Modal from '@/components/Modal/Modal';

type FeedbackModalProps = IModal & {
    title?: string;
    subtitle?: string;
    type?: 'feedback';
    onSubmit?: (text: string) => void;
    placeholder?: string;
};

export default function FeedbackModal({
    title,
    subtitle,
    type,
    onSubmit,
    placeholder = '의견을 자유롭게 작성해 주세요.',
    ...modalProps
}: FeedbackModalProps) {
    const [feedbackText, setFeedbackText] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (onSubmit && feedbackText.trim()) {
            try {
                await onSubmit(feedbackText);
                setFeedbackText('');
            } catch (error) {
                console.error('피드백 제출 중 오류 발생:', error);
            }
        }
    };

    return (
        <Modal {...modalProps}>
            <div
                className={cn(
                    'w-[320px] h-[236px] p-[15px]',
                    'flex flex-col items-center',
                    'rounded-[10px] bg-[#fafafa]',
                    'shadow-[0px_5px_15px_0px_rgba(0,0,0,0.35)]',
                )}
            >
                {title && (
                    <h2 className="w-full text-[#232323] text-center text-body-01 font-medium mb-[10px]">
                        {title}
                    </h2>
                )}
                {subtitle && (
                    <p className="w-full text-[#989898] text-center text-caption font-medium mb-[15px]">
                        {subtitle}
                    </p>
                )}
                {type === 'feedback' ? (
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col flex-1"
                    >
                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder={placeholder}
                            className={cn(
                                'h-[98px] px-[20px] py-[15px]',
                                'rounded-[10px] bg-[#eaeaea]',
                                'border-0 resize-none',
                                'text-[#232323] text-body-03 font-medium',
                                'mb-[10px]',
                                'focus:outline-none',
                                'placeholder:text-[#989898]',
                            )}
                        />
                        <button
                            type={feedbackText ? 'submit' : 'button'}
                            onClick={
                                feedbackText
                                    ? undefined
                                    : () => modalProps.toggle()
                            }
                            className={cn(
                                'h-[35px] w-full',
                                'border-0 rounded-[8px]',
                                'text-body-03 font-semibold',
                                'cursor-pointer text-white',
                                feedbackText
                                    ? 'bg-primary-500'
                                    : 'bg-neutral-400',
                            )}
                        >
                            {feedbackText ? '완료' : '취소'}
                        </button>
                    </form>
                ) : (
                    modalProps.children
                )}
            </div>
        </Modal>
    );
}
