import styled from 'styled-components';
import Modal from './Modal';
import Button from '../Button';
import { IActionModal } from '@/types/modal.types';

export default function ActionModal({ isOpen, toggle, action }: IActionModal) {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalWrapper>
                <ModalTitle>정말 삭제하시겠습니까?</ModalTitle>
                <ModalButtonWrapper>
                    <Button
                        type="button"
                        size="small"
                        variant="outlined"
                        onClick={toggle}
                    >
                        아니요
                    </Button>
                    <Button
                        type="button"
                        size="small"
                        variant="outlined"
                        outlineColor="#DC5151"
                        onClick={action}
                    >
                        삭제
                    </Button>
                </ModalButtonWrapper>
            </ModalWrapper>
        </Modal>
    );
}

const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 205px;
    height: 99px;
    padding-top: 25px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
`;

const ModalTitle = styled.h2`
    font-size: 12px;
    font-weight: 500;
    color: #000;
`;

const ModalButtonWrapper = styled.div`
    display: flex;
    gap: 5px;
`;
