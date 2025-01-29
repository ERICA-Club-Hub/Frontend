import { useClickOutside } from '@/hooks/useClickOutside';
import { useRef } from 'react';
import styled from 'styled-components';

interface LogMoadlProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActivityLogModal = ({ setModalOpen }: LogMoadlProps) => {
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => {
        setModalOpen(false);
    });
    return (
        <ModalWrapper>
            <ModalOverlay>
                <Modal ref={ref}>모달창!</Modal>
            </ModalOverlay>
        </ModalWrapper>
    );
};

const ModalWrapper = styled.div`
    z-index: 1500;
    position: absolute;
`;

const ModalOverlay = styled.div`
    background-color: rgb(0 0 0 /71%);
    position: fixed;
    justify-content: center;
    inset: 0px;
    display: flex;
    align-items: center;
`;

const Modal = styled.div`
    width: 320px;
    height: 409px;
    background-color: white;
`;

export { ActivityLogModal };
