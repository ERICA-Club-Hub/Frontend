import Modal from '../Modal/Modal';
import { cn } from '@/utils/cn';
import { useEffect } from 'react';
import { ILoadingModal } from '@/types/modal.types';
import useToggle from '@/hooks/actions/useToggle';

export default function LoadingModal({ isPending, isSuccess }: ILoadingModal) {
    const { toggle } = useToggle();

    useEffect(() => {
        if (isSuccess) {
            toggle();
        }
    }, [, isSuccess]);

    return (
        <Modal isOpen={isPending} toggle={toggle} isLoadingModal={true}>
            <div
                className={cn(
                    'flex flex-col items-center',
                    'w-[250px] h-[126px] pt-[20px]',
                    'rounded-[10px] gap-[5px] bg-white'
                )}
            >
                <h2 className="text-body-01 font-semibold text-[#232323]">
                    로딩중
                </h2>
                <p className="text-caption font-medium text-neutral-400">
                    조금만 기다려주세요!
                </p>

                <div className="flex justify-center items-center gap-[6px] w-[48px] h-[48px]">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                'w-[10px] h-[10px] rounded-full bg-primary-500',
                                'animate-bounce'
                            )}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </Modal>
    );
}
