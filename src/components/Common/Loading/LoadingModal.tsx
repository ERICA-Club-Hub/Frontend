import Modal from '../Modal/Modal';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useToast } from '@/hooks/actions/useToast';
import { ILoadingModal } from '@/types/modal.types';
import useToggle from '@/hooks/actions/useToggle';

export default function LoadingModal({
    isPending,
    isSuccess,
    isError,
}: ILoadingModal) {
    const { toggle } = useToggle();
    const { showToast } = useToast();

    useEffect(() => {
        if (isError) {
            showToast('실패했습니다');
            toggle();
        } else if (isSuccess) {
            toggle();
        }
    }, [isError, isSuccess]);

    return (
        <Modal isOpen={isPending} toggle={toggle} isLoadingModal={true}>
            <ModalWrapper>
                <LoadingTitle>로딩중</LoadingTitle>
                <LoadingGuideText>조금만 기다려주세요!</LoadingGuideText>

                <LoadingDots>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <LoadingDot key={index} />
                    ))}
                </LoadingDots>
            </ModalWrapper>
        </Modal>
    );
}

const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    height: 126px;
    padding-top: 20px;
    border-radius: 10px;
    gap: 5px;
    background-color: ${({ theme }) => theme.colors.white};
    // box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    //     0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const LoadingTitle = styled.h2`
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainBlack};
`;

const LoadingGuideText = styled.p`
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.subGray};
`;

const LoadingDots = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    width: 48px;
    height: 48px;
`;

const LoadingDot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.mainBlue};
    animation: bounce 0.5s infinite alternate;

    &:nth-child(2) {
        animation-delay: 0.1s;
    }

    &:nth-child(3) {
        animation-delay: 0.2s;
    }

    @keyframes bounce {
        to {
            transform: translateY(-10px);
        }
    }
`;
