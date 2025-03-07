import { toastState } from '@/store/toast';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';

export default function Toast() {
    const toast = useRecoilValue(toastState);
    const [visible, setVisible] = useState(false); // on/off 해야할 상황을 판단할 때
    const [animating, setAnimating] = useState(false); // 현재 상태(작동 시간 고려)

    useEffect(() => {
        if (toast.on) {
            // 토스트 메세지를 띄워야 하는 상황
            setVisible(true); // visible을 true로 -> DOM에 보이게 함
            setAnimating(true); // fadeIn 시키기
        } else if (visible) {
            // DOM에 보이는 상태일 때
            setAnimating(false); // fadeOut 시키기
            const timer = setTimeout(() => {
                setVisible(false);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [toast.on, visible]);

    if (!visible) {
        return null;
    } else {
        return (
            <ToastContainer $isVisible={animating}>
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

const ToastContainer = styled.div<{ $isVisible: boolean }>`
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
    animation: ${(props) => (props.$isVisible ? fadeIn : fadeOut)} 0.3s
        ease-in-out forwards;
    align-items: center;
    justify-content: center;
    padding-left: 66px;
    padding-right: 66px;
`;
