import FormItem from '@/domains/shared/components/form/FormItem';
import { RECRUIT_FIELD_CONFIG } from '../../constant/recruitment.constant';
import TextArea from '@/components/InputField/TextArea';
import { useParams } from 'react-router-dom';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    RecruitmentSchema,
    recruitmentSchema,
} from '../../model/recruitment.schema';
import useModal from '@/components/Modal/useModal';
import { useEffect } from 'react';
import { AlertModal } from '@/components/Modal/AlertModal';
import { ALERT_MODAL_MESSAGE } from '@/components/Modal/modal.constant';
import { useClubRecruitmentQuery } from '../../api/recruitment.queries';
import { useUpdateRecruitMutation } from '../../api/recruitment.mutations';
import Button from '@/components/Button/Button';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export default function RecruitmentForm() {
    const { id: clubId } = useParams<{ id: string }>();
    const method = useForm<RecruitmentSchema>({
        resolver: zodResolver(recruitmentSchema) as Resolver<RecruitmentSchema>,
        defaultValues: {
            due: '',
            target: '',
            notice: '',
            etc: '',
        },
        mode: 'onChange',
    });
    const modal = useModal();
    const { handleError } = useErrorHandler();

    const { data } = useClubRecruitmentQuery({
        clubId,
    });
    const { mutateAsync: update, isPending } = useUpdateRecruitMutation();

    useEffect(() => {
        if (data) {
            method.reset({
                due: data.due,
                target: data.target,
                notice: data.notice,
                etc: data.etc,
            });
        }
    }, [data, method]);

    const onSubmit: SubmitHandler<RecruitmentSchema> = async (formValues) => {
        if (!clubId) return;

        try {
            await update({
                data: formValues,
                clubId: Number(clubId),
            });

            await modal.push('prompt', AlertModal, {
                title: ALERT_MODAL_MESSAGE.SAVE.title,
                actionLabel: ALERT_MODAL_MESSAGE.SAVE.actionLabel,
            });
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <form
                onSubmit={method.handleSubmit(onSubmit)}
                className="flex flex-col justify-between min-h-[calc(100vh-129px)]"
            >
                {/* 모집 필드 */}
                <div>
                    {RECRUIT_FIELD_CONFIG.map((field) => (
                        <FormItem
                            key={field.name}
                            label={field.label}
                            id={field.name}
                            required={field.required}
                            hintText={field.hintText}
                        >
                            <TextArea
                                {...method.register(field.name)}
                                id={field.name}
                                placeholder={field.placeholder}
                                className="min-h-[108px]"
                            />
                        </FormItem>
                    ))}
                </div>

                <div className="flex justify-end items-center gap-[12px] w-full my-[28px]">
                    <Button
                        type="submit"
                        size="xs"
                        disabled={!method.formState.isValid}
                        isLoading={method.formState.isSubmitting || isPending}
                    >
                        저장하기
                    </Button>
                </div>
            </form>
        </div>
    );
}
