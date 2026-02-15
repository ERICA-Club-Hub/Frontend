import InputField from '@/components/InputField/InputField';
import MonthSelect from './MonthSelect';
import DeleteIcon from '@/assets/trash.svg?react';
import { Controller, useFormContext } from 'react-hook-form';
import { SchedulesSchema } from '../../model/schedule.schema';

export default function ScheduleItem({
    index,
    onDelete,
}: {
    index: number;
    onDelete: (index: number) => void;
}) {
    const { control, register } = useFormContext<SchedulesSchema>();

    return (
        <div className="relative flex gap-[5px]">
            <Controller
                control={control}
                name={`schedules.${index}.month`}
                render={({ field: { onChange, value } }) => (
                    <MonthSelect
                        selectedValue={value}
                        handleMonthValue={onChange}
                    />
                )}
            />

            <div className="relative">
                <InputField
                    {...register(`schedules.${index}.content`)}
                    inputType="date"
                    name={`schedules.${index}.content`}
                    placeholder="일정을 입력해 주세요."
                    maxLength={29}
                />
                <button
                    type="button"
                    className="absolute top-1/2 right-[12px] -translate-y-1/2"
                    onClick={() => onDelete(index)}
                >
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
}
