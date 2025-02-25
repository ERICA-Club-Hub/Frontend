import { IModal } from '@/types/modal.types';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

/**
 * Modal 컴포넌트는 모달을 렌더링합니다.
 *
 * @param {boolean} isOpen - 모달이 열려 있는지 여부를 나타내는 상태
 * @param {() => void} toggle - 모달의 열림/닫힘 상태를 토글하는 훅
 * @param {ReactNode} children - 모달의 내용
 */

export default function Modal({ children, isOpen, toggle }: IModal) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    // 모달 열고 닫는 기본 로직
    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
            dialogRef.current?.scrollTo({
                top: 0,
            });
        } else {
            const timer = setTimeout(() => {
                dialogRef.current?.close();
            }, 200); // 애니메이션 시간보다 조금 더 빠르게

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return createPortal(
        <Dialog
            $isOpen={isOpen}
            onClick={(e) => {
                // 모달 바깥을 클릭하면 닫히도록
                if ((e.target as any).nodeName === 'DIALOG') {
                    toggle();
                }
            }}
            ref={dialogRef}
        >
            {children}
        </Dialog>,
        document.body, // 모달을 body에 렌더링
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
    min-width: 300px;
    padding: 0;
    border: none;
    background-color: ${({ theme }) => theme.colors.white};
    animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.4s ease;
    &[open]::backdrop {
        animation: ${showBackdrop} 0.4s ease;
    }
    &::backdrop {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;
