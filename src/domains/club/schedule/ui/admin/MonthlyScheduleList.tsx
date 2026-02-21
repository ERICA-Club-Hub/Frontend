import PlusIcon from '@/assets/common/plus-icon.svg?react';
import ScheduleItem from './ScheduleItem';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { SchedulesSchema } from '../../model/schedule.schema';
import { cn } from '@/utils/cn';

export default function MonthlyScheduleList({
    setDeleteIds,
}: {
    setDeleteIds: (id: number) => void;
}) {
    const { control } = useFormContext<SchedulesSchema>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'schedules',
    });

    const handleDelete = (index: number) => {
        const itemToDelete = fields[index];
        if (itemToDelete.scheduleId) setDeleteIds(itemToDelete.scheduleId);

        remove(index);
    };

    const handleAdd = () => append({ month: null, content: '' });

    return (
        <div className="flex flex-col gap-[10px]">
            {/* 일정 컴포넌트 리스트 */}
            <div className="flex flex-col gap-[6px]">
                {fields.map((field, idx) => (
                    <ScheduleItem
                        key={field.id}
                        index={idx}
                        onDelete={(idx) => handleDelete(idx)}
                    />
                ))}
            </div>

            <button
                type="button"
                onClick={handleAdd}
                className={cn(
                    'flex justify-center items-center gap-[5px] w-full h-[42px] border-[0.6px] border-solid border-neutral-100 rounded-[10px]',
                    'text-b4 text-neutral-900 bg-neutral-50',
                )}
            >
                일정 추가하기
                <div className="flex justify-center items-center">
                    <PlusIcon width={16} height={16} stroke="#1C232C" />
                </div>
            </button>
        </div>
    );
}
