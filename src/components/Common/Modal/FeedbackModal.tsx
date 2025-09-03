import { IModal } from '@/types/modal.types';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

type FeedbackModalProps = IModal & {
    title?: string;
    subtitle?: string;
    type?: 'feedback';
    onSubmit?: (text: string) => void;
    placeholder?: string;
};

export default function MainModal({
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
            <ModalContent>
                {title && <ModalTitle>{title}</ModalTitle>}
                {subtitle && <ModalSubtitle>{subtitle}</ModalSubtitle>}
                {type === 'feedback' ? (
                    <FeedbackForm onSubmit={handleSubmit}>
                        <TextArea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder={placeholder}
                        />
                        <SubmitButton
                            type={feedbackText ? 'submit' : 'button'}
                            onClick={
                                feedbackText
                                    ? undefined
                                    : () => modalProps.toggle()
                            }
                            $isSubmit={!!feedbackText}
                        >
                            {feedbackText ? '완료' : '취소'}
                        </SubmitButton>
                    </FeedbackForm>
                ) : (
                    modalProps.children
                )}
            </ModalContent>
        </Modal>
    );
}

const ModalContent = styled.div`
    width: 320px;
    height: 236px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background: #fafafa;
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.35);
`;

const ModalTitle = styled.h2`
    width: 100%;
    color: ${(props) => props.theme.colors.mainBlack};
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
`;

const ModalSubtitle = styled.p`
    width: 100%;
    color: #989898;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 15px;
`;

const FeedbackForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const TextArea = styled.textarea`
    height: 98px;
    padding: 15px 20px;
    border-radius: 10px;
    background: #eaeaea;
    border: none;
    resize: none;
    color: ${(props) => props.theme.colors.mainBlack};
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #989898;
    }
`;

const SubmitButton = styled.button<{ $isSubmit: boolean }>`
    height: 35px;
    width: 100%;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: white;
    background-color: ${(props) =>
        props.$isSubmit
            ? props.theme.colors.mainBlue
            : props.theme.colors.subGray};
`;
