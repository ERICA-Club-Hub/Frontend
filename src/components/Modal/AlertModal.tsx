import { cn } from '@/utils/cn';
import { ReactNode } from 'react';
import Modal from './Modal';

interface AlertModalProps {
    title: string;
    actionLabel: string;
    icon?: ReactNode;
    onAction?: () => void;
    resolve: (value: boolean) => void;
    closeModal: () => void;
}

/**
 * 알림, 재확인용 모달
 * 주로 제출 후 제출 상태를 알리거나, 간단한 안내를 위해 사용
 * @param title - 모달 내용
 * @param actionLabel - 액션 버튼 내용
 * @param icon - 모달 상단 아이콘 (usage: 피드백, 이메일)
 * @param onAction - 액션 버튼 클릭 시 실행할 콜백 함수
 * @param resolve - 모달 결과 반환 함수 (* 호출 시 prop에 포함하지 않음 *)
 * @param closeModal - 모달 종료 함수 (* 호출 시 prop에 포함하지 않음 *)
 * @example
 * ```tsx
 *  const modal = useModal();
 *
 *  const handleClick = async () => {
 *    await modal.push('alert', AlertModal, {
 *      title: '제출되었습니다!',
 *      actionLabel: '확인',
 *      icon: <FeedbackIcon />,
 *      onAction: () => navigate('/home'),
 *   });
 *
 *  return <button onClick={handleClick}>click</button>
 */
export function AlertModal({
    title,
    actionLabel,
    icon,
    onAction,
    resolve,
    closeModal,
}: AlertModalProps) {
    const handleClick = () => {
        if (onAction) onAction();
        resolve(true);
    };

    return (
        <Modal closeModal={closeModal} hideOnClickOutside={icon ? true : false}>
            <div
                className={cn(
                    'flex flex-col items-center justify-center py-[24px] px-[20px] rounded-[12px] bg-neutral-50',
                    icon ? 'gap-[12px]' : 'gap-[16px]',
                )}
            >
                {icon && (
                    <div className="flex justify-center items-center">
                        {icon}
                    </div>
                )}
                <p
                    className={cn(
                        'text-center whitespace-pre-wrap',
                        icon
                            ? 'text-b4 text-neutral-600'
                            : 'text-b2 text-neutral-900',
                    )}
                >
                    {title}
                </p>
                <button
                    className={cn(
                        'h-[37px] rounded-[8px]',
                        icon
                            ? 'w-[280px] text-b3 text-neutral-50 bg-brand'
                            : 'w-[196px] border-[0.6px] border-solid border-neutral-600 text-b4 text-neutral-600 bg-neutral-50',
                    )}
                    onClick={handleClick}
                >
                    {actionLabel}
                </button>
            </div>
        </Modal>
    );
}
