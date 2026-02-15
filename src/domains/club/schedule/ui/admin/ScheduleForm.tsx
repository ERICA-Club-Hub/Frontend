import { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import FormItem from '@/domains/shared/components/form/FormItem';
import { SCHEDULE_FIELD_CONFIG } from '../../constants/schedule.constant';
import TextArea from '@/components/InputField/TextArea';
import MonthlyScheduleList from './MonthlyScheduleList';
import {
    FormProvider,
    Resolver,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SchedulesSchema, schedulesSchema } from '../../model/schedule.schema';
import { useSchedulesQuery } from '../../api/schedule.queries';
import { useParams } from 'react-router-dom';
import {
    useDeleteScheduleMutation,
    useUpdateScheduleMutation,
} from '../../api/schedule.mutations';
import { AlertModal } from '@/components/Modal/AlertModal';
import { ALERT_MODAL_MESSAGE } from '@/components/Modal/modal.constant';
import useModal from '@/components/Modal/useModal';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export default function ScheduleForm() {
    const { id: clubId } = useParams<{ id: string }>();

    const modal = useModal();
    const { handleError } = useErrorHandler();
    const method = useForm<SchedulesSchema>({
        resolver: zodResolver(schedulesSchema) as Resolver<SchedulesSchema>,
        defaultValues: {
            schedules: [],
            scheduleDescription: '',
        },
        mode: 'onChange',
    });
    const [deleteScheduleIds, setDeleteScheduleIds] = useState<number[]>([]);

    const { data, isSuccess } = useSchedulesQuery({
        clubId,
    });
    const { mutateAsync: updateSchedule } = useUpdateScheduleMutation({
        clubId,
    });
    const { mutateAsync: deleteSchedule } = useDeleteScheduleMutation({
        clubId,
    });

    useEffect(() => {
        if (isSuccess && data) {
            method.reset({
                schedules: (data.schedules ?? []).map((schedule) => ({
                    scheduleId: schedule.id,
                    month: schedule.month,
                    content: schedule.content,
                })),
                scheduleDescription: data.scheduleDescription,
            });
        }
    }, [isSuccess, data]);

    const onSubmit: SubmitHandler<SchedulesSchema> = async (formValues) => {
        const promises = [];

        try {
            if (deleteScheduleIds.length > 0) {
                const deletePromises = deleteScheduleIds.map((id) =>
                    deleteSchedule({ scheduleId: id }),
                );
                promises.push(...deletePromises);
            }

            promises.push(updateSchedule(formValues));

            await Promise.all(promises);

            await modal.push('prompt', AlertModal, {
                title: ALERT_MODAL_MESSAGE.SAVE.title,
                actionLabel: ALERT_MODAL_MESSAGE.SAVE.actionLabel,
            });
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <FormProvider {...method}>
            <div className="flex flex-col items-center w-full">
                <form
                    onSubmit={method.handleSubmit(onSubmit)}
                    className="flex flex-col justify-between items-center min-h-[calc(100vh-129px)]"
                >
                    <div>
                        {/* 주요 활동 일정 입력 */}
                        <FormItem
                            key={SCHEDULE_FIELD_CONFIG.scheduleSummary.name}
                            label={SCHEDULE_FIELD_CONFIG.scheduleSummary.label}
                            id={SCHEDULE_FIELD_CONFIG.scheduleSummary.name}
                            required={
                                SCHEDULE_FIELD_CONFIG.scheduleSummary.required
                            }
                        >
                            <MonthlyScheduleList
                                setDeleteIds={(id) =>
                                    setDeleteScheduleIds((prev) => [
                                        ...prev,
                                        id,
                                    ])
                                }
                            />
                        </FormItem>

                        {/* 동아리 활동 설명 */}
                        <FormItem
                            key={SCHEDULE_FIELD_CONFIG.scheduleDescription.name}
                            label={
                                SCHEDULE_FIELD_CONFIG.scheduleDescription.label
                            }
                            id={SCHEDULE_FIELD_CONFIG.scheduleDescription.name}
                            required={
                                SCHEDULE_FIELD_CONFIG.scheduleDescription
                                    .required
                            }
                            hintText={
                                SCHEDULE_FIELD_CONFIG.scheduleDescription
                                    .hintText
                            }
                        >
                            <TextArea
                                {...method.register(
                                    SCHEDULE_FIELD_CONFIG.scheduleDescription
                                        .name as 'scheduleDescription',
                                )}
                                id={
                                    SCHEDULE_FIELD_CONFIG.scheduleDescription
                                        .name
                                }
                                placeholder={
                                    SCHEDULE_FIELD_CONFIG.scheduleDescription
                                        .placeholder
                                }
                                className="min-h-[108px]"
                            />
                        </FormItem>
                    </div>

                    <div className="flex justify-end gap-3 w-full my-[28px]">
                        <Button
                            type="submit"
                            name="save"
                            size="xs"
                            disabled={
                                method.formState.isSubmitting ||
                                !method.formState.isValid
                            }
                        >
                            저장하기
                        </Button>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}
