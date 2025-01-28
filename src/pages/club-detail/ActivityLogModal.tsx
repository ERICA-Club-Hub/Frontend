import styled from 'styled-components';

const ActivityLogModal = () => {
    console.log('모달 열림');
    return (
        <ModalWrapper>
            <ModalOverlay>
                <ModalContent>모달창!</ModalContent>
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

const ModalContent = styled.div`
    width: 320px;
    height: 409px;
    background-color: white;
    margin: 0 auto;
`;

export { ActivityLogModal };
