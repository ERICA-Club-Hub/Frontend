import { IModal } from '@/types/modal.types';
import { useEffect, useRef, MouseEvent, ReactNode, FormEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

/**
 * Modal 컴포넌트는 모달을 렌더링합니다.
 *
 * @param {boolean} isOpen - 모달이 열려 있는지 여부를 나타내는 상태
 * @param {() => void} toggle - 모달의 열림/닫힘 상태를 토글하는 훅
 * @param {ReactNode} children - 모달의 내용
 */

interface IModalProps extends IModal {
    title?: string;
    subtitle?: string;
    type?: 'feedback';
    onSubmit?: (text: string) => void;
    placeholder?: string;
    children?: ReactNode;
}

export default function Modal({ 
    children, 
    isOpen, 
    toggle, 
    title, 
    subtitle,
    type,
    onSubmit,
    placeholder = "의견을 자유롭게 작성해 주세요."
}: IModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
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

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
            dialogRef.current?.scrollTo({
                top: 0,
            });
        } else {
            const timer = setTimeout(() => {
                dialogRef.current?.close();
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const renderContent = () => {
        if (type === 'feedback') {
            return (
                <FeedbackForm onSubmit={handleSubmit}>
                    <TextArea 
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder={placeholder}
                    />
                    <SubmitButton 
                        type={feedbackText ? "submit" : "button"}
                        disabled={false}
                        onClick={feedbackText ? undefined : () => toggle()}
                    >
                        {feedbackText ? "완료" : "취소"}
                    </SubmitButton>
                </FeedbackForm>
            );
        }
        return children;
    };

    return createPortal(
        <Dialog
            $isOpen={isOpen}
            onClick={(e: MouseEvent<HTMLDialogElement>) => {
                if (e.target instanceof HTMLDialogElement) {
                    toggle();
                }
            }}
            ref={dialogRef}
        >
            <ModalContent>
                {title && <ModalTitle>{title}</ModalTitle>}
                {subtitle && <ModalSubtitle>{subtitle}</ModalSubtitle>}
                {renderContent()}
            </ModalContent>
        </Dialog>,
        document.body,
    );
}

const fadeIn = keyframes`
  0% {
    transform: scale(0.9) translate(-55%, -60%);
    opacity: 0;
  }
  100% {
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }
  100% {
    transform: scale(0.9) translate(-55%, -60%);
    opacity: 0;
  }
`;

const showBackdrop = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Dialog = styled.dialog<{ $isOpen: boolean }>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    border: none;
    background-color: transparent;
    animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.4s ease;
    &[open]::backdrop {
        animation: ${showBackdrop} 0.4s ease;
    }
    &::backdrop {
        background-color: rgba(35, 35, 35, 0.4);
    }
`;

const ModalContent = styled.div`
    display: flex;
    width: 320px;
    height: 236px;
    padding: 15px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    border-radius: 10px;
    background: ${props => props.theme.colors.white};
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.35);
`;

const ModalTitle = styled.h2`
    align-self: stretch;
    color: ${props => props.theme.colors.mainBlack};
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 10px;
`;

const ModalSubtitle = styled.p`
    align-self: stretch;
    color: ${props => props.theme.colors.subGray};
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 15px;
`;

const FeedbackForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const TextArea = styled.textarea`
    display: flex;
    height: 98px;
    padding: 15px 20px;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 10px;
    background: ${props => props.theme.colors.mediumGray};
    border: none;
    resize: none;
    
    color: ${props => props.theme.colors.mainBlack};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 10px;
    
    &:focus {
        outline: none;
    }

    &::placeholder {
        color: ${props => props.theme.colors.subGray};
    }
`;

const SubmitButton = styled.button`
    display: flex;
    height: 35px;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    background-color: ${props => props.children === "취소" ? props.theme.colors.subGray : props.theme.colors.mainBlue};
    color: ${props => props.theme.colors.white};
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
        background-color: ${props => props.children === "취소" ? props.theme.colors.subGray : props.theme.colors.mainBlue};
    }
`;