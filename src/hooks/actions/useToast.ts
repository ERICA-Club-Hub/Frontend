import { toastState } from '@/components/Toast/toast';
import { useRecoilState } from 'recoil';

export const useToast = () => {
    const [toast, setToast] = useRecoilState(toastState);

    const showToast = (message: string) => {
        if (toast.on) {
            // 이미 토스트가 떠있는 상태라면
            setToast({ on: false, message: '' }); // 지금 있는 토스트 false로 하고

            setTimeout(() => {
                setToast({ on: true, message: message }); // 0.5초 뒤에 새로운 toast 생성
                setTimeout(() => {
                    setToast({ on: false, message: '' });
                }, 2000); // 토스트는 2초 후에 사라지도록
            }, 500);
        } else {
            setToast({ on: true, message: message }); // 0.5초 뒤에 새로운 toast 생성
            setTimeout(() => {
                setToast({ on: false, message: '' });
            }, 2000);
        }
    };

    return { showToast };
};
