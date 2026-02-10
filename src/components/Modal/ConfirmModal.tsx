import { cn } from '@/utils/cn';
import Modal from './Modal';
import { CONFIRM_MODAL_MESSAGE } from './modal.constant';

interface ConfirmModalProps {
    type: 'APPROVE' | 'UPLOAD' | 'DELETE' | 'REJECT';
    onConfirm?: () => void;
    onCancel?: () => void;
    resolve: (value: boolean) => void;
    closeModal: () => void;
}

/**
 * 확인 모달 컴포넌트
 * 삭제, 승인 등의 중요한 액션에 대해 사용자에게 확인 요청
 * @param type - 확인 유형 (승인, 업로드, 삭제, 거절)
 * @param onConfirm - 확인 시 실행할 콜백 함수
 * @param onCancel - 취소 시 실행할 콜백 함수
 * @param resolve - 모달 결과 반환 함수 (* 호출 시 prop에 포함하지 않음 *)
 * @param closeModal - 모달 종료 함수 (* 호출 시 prop에 포함하지 않음 *)
 * @example
 * ```tsx
 *  const modal = useModal();
 *
 *  const handleClick = async () => {
 *    await modal.push('confirm', ConfirmModal, {
 *     type: 'DELETE',
 *     onConfirm: () => console.log('삭제 확인'),
 *     onCancel: () => console.log('삭제 취소'),
 *   });
 *
 *  return <button onClick={handleClick}>click</button>
 */
export function ConfirmModal({
    type,
    onConfirm,
    onCancel,
    resolve,
    closeModal,
}: ConfirmModalProps) {
    const handleCancel = () => {
        if (onCancel) onCancel();
        resolve(false);
    };

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        resolve(true);
    };

    return (
        <Modal closeModal={closeModal} hideOnClickOutside>
            <div className="flex flex-col items-center justify-center gap-[16px] w-[236px] h-[125px] rounded-[12px] bg-neutral-50">
                <strong>{CONFIRM_MODAL_MESSAGE[type].title}</strong>
                <div
                    className={cn(
                        'flex gap-[16px]',
                        type === 'DELETE' || type === 'REJECT'
                            ? 'flex-row-reverse'
                            : 'flex-row',
                    )}
                >
                    <button
                        onClick={handleCancel}
                        className={cn(
                            'w-[90px] h-[37px] border-[0.6px] border-solid border-neutral-600 rounded-[8px] text-b4 text-neutral-600',
                        )}
                    >
                        취소
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={cn(
                            'w-[90px] h-[37px] border-[0.6px] rounded-[8px] text-b4',
                            type === 'DELETE' || type === 'REJECT'
                                ? 'border-sub-warning text-text-error'
                                : 'border-brand text-brand',
                        )}
                    >
                        {CONFIRM_MODAL_MESSAGE[type].actionLabel}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
