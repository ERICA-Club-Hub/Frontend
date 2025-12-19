import { cn } from '@/utils/cn';
import Modal from './Modal';
import Button from '../Button';
import { IActionModal } from '@/types/modal.types';

export default function ActionModal({ isOpen, toggle, action }: IActionModal) {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <div
                className={cn(
                    'flex flex-col items-center gap-[15px]',
                    'w-[205px] h-[99px] pt-[25px]',
                    'rounded-[10px] bg-white'
                )}
            >
                <h2 className="text-caption font-medium text-black">
                    정말 삭제하시겠습니까?
                </h2>
                <div className="flex gap-[5px]">
                    <Button
                        type="button"
                        size="small"
                        variant="outlined"
                        onClick={toggle}
                    >
                        아니요
                    </Button>
                    <Button
                        type="button"
                        size="small"
                        variant="outlined"
                        outlineColor="#DC5151"
                        onClick={action}
                    >
                        삭제
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
