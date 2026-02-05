import { IModal } from '@/types/modal.types';
import { FormEvent, useState } from 'react';
import { cn } from '@/utils/cn';
import Modal from '@/components/Modal/Modal';
import TextArea from '@/components/InputField/TextArea';

type FeedbackModalProps = IModal & {
    title?: string;
    type?: 'feedback';
    onSubmit?: (text: string) => void;
};

export default function FeedbackModal({
    title,
    type,
    onSubmit,
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
                    'flex flex-col items-center gap-[12px] w-[320px] min-h-[178px] py-[24px] px-[20px] rounded-[12px] bg-neutral-50 shadow-default',
                )}
            >
                {title && (
                    <h2 className="w-full text-text-main text-center text-b2 font-medium">
                        {title}
                    </h2>
                )}

                {type === 'feedback' ? (
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col items-center gap-[12px]"
                    >
                        <TextArea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="오류, 건의사항, 칭찬 등 모두 환영입니다. :)"
                            className={cn('w-full min-h-[45px]')}
                        />
                        <button
                            type={feedbackText ? 'submit' : 'button'}
                            onClick={
                                feedbackText
                                    ? undefined
                                    : () => modalProps.toggle()
                            }
                            className={cn(
                                'w-full h-[37px] rounded-[8px] text-b3 cursor-pointer transition-all duration-200 ease-in',
                                feedbackText
                                    ? 'bg-brand text-neutral-50'
                                    : 'bg-neutral-200 text-neutral-600',
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
