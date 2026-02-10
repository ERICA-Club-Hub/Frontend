import {
    MouseEvent,
    ReactNode,
    SyntheticEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import { cn } from '@/utils/cn';

interface ModalProps {
    children: ReactNode;
    closeModal: () => void;
    hideOnClickOutside?: boolean;
}

export default function Modal({
    children,
    closeModal,
    hideOnClickOutside = false,
}: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isClosing, setIsClosing] = useState<boolean>(false);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (!dialog.open) dialog.showModal();

        document.body.style.overflow = 'hidden'; // 배경 스크롤 방지

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const triggerClose = () => {
        setIsClosing(true);
    };

    const handleAnimationEnd = () => {
        if (isClosing) {
            dialogRef.current?.close();
            closeModal();
            setIsClosing(false);
        }
    };

    const handleCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        triggerClose();
    };

    const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
        if (!dialogRef.current) return;

        if (hideOnClickOutside && e.target === dialogRef.current)
            triggerClose();
    };

    return (
        <dialog
            ref={dialogRef}
            onCancel={handleCancel}
            onClick={handleClick}
            onAnimationEnd={handleAnimationEnd}
            className={cn(
                'fixed top-1/2 left-1/2 ',
                'p-0 m-0 border-0 bg-transparent rounded-0',
                isClosing ? 'animate-modal-pop-out' : 'animate-modal-pop-in',
                '[&::backdrop]:bg-[rgba(8,10,12,0.4)]',
            )}
        >
            {children}
        </dialog>
    );
}
