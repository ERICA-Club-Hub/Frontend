import { toastState } from '@/recoil/toast';
import { useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';

export default function Toast() {
    const toast = useRecoilValue(toastState);
    if (!toast.on) {
        return <></>;
    } else {
        return (
            <ToastContainer isVisible={toast.on}>
                {toast.message}
            </ToastContainer>
        );
    }
}

// 페이드 인 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

// 페이드 아웃 애니메이션
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  to {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
`;

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
    animation: ${(props) => (props.isVisible ? fadeIn : fadeOut)} 0.3s
        ease-in-out forwards;
    align-items: center;
    justify-content: center;
    padding-left: 66px;
    padding-right: 66px;
`;
