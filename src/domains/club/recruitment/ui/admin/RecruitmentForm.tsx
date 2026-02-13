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

    const { data } = useClubRecruitmentQuery({
        clubId,
    });
    const { mutate: update } = useUpdateRecruitMutation();

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

    const onSubmit: SubmitHandler<RecruitmentSchema> = (formValues) => {
        if (!clubId) return;

        const payload = {
            data: {
                due: formValues.due || '',
                target: formValues.target || '',
                notice: formValues.notice || '',
                etc: formValues.etc || '',
            },
            clubId: Number(clubId),
        };

        update(payload, {
            onSuccess: async () => {
                await modal.push('prompt', AlertModal, {
                    title: ALERT_MODAL_MESSAGE.SAVE.title,
                    actionLabel: ALERT_MODAL_MESSAGE.SAVE.actionLabel,
                });
            },
        });
    };

    return (
        <div className="flex flex-col items-center w-full">
            <form
                onSubmit={method.handleSubmit(onSubmit)}
                className="flex flex-col"
            >
                {/* 모집 필드 */}
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

                <div className="flex justify-end items-center gap-[12px] w-full my-[28px]">
                    <Button
                        type="submit"
                        size="xs"
                        disabled={
                            !method.formState.isValid ||
                            method.formState.isSubmitting
                        }
                    >
                        저장하기
                    </Button>
                </div>
            </form>
        </div>
    );
}
