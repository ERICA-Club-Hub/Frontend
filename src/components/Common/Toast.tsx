import { toastState } from '@/recoil/toast';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

export default function Toast() {
    const toast = useRecoilValue(toastState);
    if (!toast.on) {
        return <></>;
    } else {
        return (
            <ToastContainer isVisible={true}>{toast.message}</ToastContainer>
        );
    }
}

const ToastContainer = styled.div<{ isVisible: boolean }>`
    display: flex;
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(35, 35, 35, 0.8);
    backdrop-filter: blur(5px);
    color: white;
    width: 320px;
    min-height: 45px;
    height: fit-content;
    border-radius: 10px;
    z-index: 9999;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.3;
    animation: 0.3s ease-in-out forwards;
    align-items: center;
    justify-content: center;
    padding-left: 66px;
    padding-right: 66px;
`;
