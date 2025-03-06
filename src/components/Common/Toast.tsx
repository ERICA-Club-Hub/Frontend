import { toastState } from '@/recoil/toast';
import { useRecoilValue } from 'recoil';

export default function Toast() {
    const toast = useRecoilValue(toastState);
    if (!toast.on) {
        return <></>;
    } else {
        return <div style={{ backgroundColor: 'red' }}>{toast.message}</div>;
    }
}
