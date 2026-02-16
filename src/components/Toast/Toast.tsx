import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { cn } from '@/utils/cn';
import Icon from '@/assets/common/warnIcon.svg';
import { toastState } from './toast.atom';

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
    }

    return (
        <div
            className={cn(
                'flex fixed bottom-[40px] left-1/2 ',
                'bg-[rgba(35,35,35,0.8)] backdrop-blur-[5px] text-white',
                'min-w-[320px] w-max max-w-[340px]',
                'min-h-[45px] h-fit',
                'rounded-[10px] z-[9999]',
                'text-body-03 font-medium leading-[1.3]',
                'items-center justify-center gap-[7px]',
                animating ? 'animate-toast-in' : 'animate-toast-out',
            )}
        >
            {toast.message && <img src={Icon} />}
            {/* 메세지랑 아이콘이랑 사라지는 타이밍이 달라서 메세지 여부에 따라서 렌더링하도록 구현하엿슴다 */}
            <p className="text-b4 text-neutral-150">{toast.message}</p>
        </div>
    );
}
