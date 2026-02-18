import FormItem from '@/domains/shared/components/form/FormItem';
import { INTRO_FIELD_CONFIG } from '../../constants/introduction.constant';
import InputField from '@/components/InputField/InputField';
import Button from '@/components/Button/Button';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { introSchema, IntroSchema } from '../../model/introduction.schema';
import { useClubIntroQuery } from '../../api/introduction.queries';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import TextArea from '@/components/InputField/TextArea';
import { useUpdateClubIntroMutation } from '../../api/introduction.mutations';
import useModal from '@/components/Modal/useModal';
import { ALERT_MODAL_MESSAGE } from '@/components/Modal/modal.constant';
import { AlertModal } from '@/components/Modal/AlertModal';

export default function ClubIntroductionForm() {
    const { id: clubId } = useParams<{ id: string }>();
    const method = useForm<IntroSchema>({
        resolver: zodResolver(introSchema) as Resolver<IntroSchema>,
        defaultValues: {
            description: '',
            leaderName: '',
            contactEmail: '',
            leaderPhone: '',
            membershipFee: '',
            snsAccount: '',
            applicationUrl: 'https://',
        },
        mode: 'onChange',
    });
    const modal = useModal();

    const { data } = useClubIntroQuery(clubId);
    const { mutate: update } = useUpdateClubIntroMutation(clubId);

    useEffect(() => {
        if (data) {
            method.reset({
                description: data.description,
                leaderName: data.leaderName,
                contactEmail: data.contactEmail,
                leaderPhone: data.leaderPhone,
                membershipFee: data.membershipFee,
                snsAccount: data.snsAccount,
                applicationUrl: data.applicationUrl,
            });
        }
    }, [data, method]);

    const onSubmit: SubmitHandler<IntroSchema> = (formValues) => {
        if (!clubId) return;

        update(
            { data: formValues },
            {
                onSuccess: async () => {
                    await modal.push('prompt', AlertModal, {
                        title: ALERT_MODAL_MESSAGE.SAVE.title,
                        actionLabel: ALERT_MODAL_MESSAGE.SAVE.actionLabel,
                    });
                },
            },
        );
    };

    return (
        <div className="flex flex-col items-center w-full">
            <form
                onSubmit={method.handleSubmit(onSubmit)}
                className="flex flex-col items-center"
            >
                {/* 동아리 소개글 */}
                <FormItem
                    key={INTRO_FIELD_CONFIG.description.name}
                    label={INTRO_FIELD_CONFIG.description.label}
                    id={INTRO_FIELD_CONFIG.description.name}
                    required={INTRO_FIELD_CONFIG.description.required}
                    hintText={INTRO_FIELD_CONFIG.description.hintText}
                >
                    <TextArea
                        {...method.register(
                            INTRO_FIELD_CONFIG.description.name,
                        )}
                        id={INTRO_FIELD_CONFIG.description.name}
                        placeholder={INTRO_FIELD_CONFIG.description.placeholder}
                        className="min-h-[108px]"
                    />
                </FormItem>

                {/* 대표 이름 */}
                <FormItem
                    key={INTRO_FIELD_CONFIG.leaderName.name}
                    label={INTRO_FIELD_CONFIG.leaderName.label}
                    id={INTRO_FIELD_CONFIG.leaderName.name}
                    required={INTRO_FIELD_CONFIG.leaderName.required}
                >
                    <InputField
                        {...method.register(INTRO_FIELD_CONFIG.leaderName.name)}
                        size="lg"
                        id={INTRO_FIELD_CONFIG.leaderName.name}
                        placeholder={INTRO_FIELD_CONFIG.leaderName.placeholder}
                    />
                </FormItem>

                {/* 문의 이메일 */}
                <FormItem
                    key={INTRO_FIELD_CONFIG.contactEmail.name}
                    label={INTRO_FIELD_CONFIG.contactEmail.label}
                    id={INTRO_FIELD_CONFIG.contactEmail.name}
                    required={INTRO_FIELD_CONFIG.contactEmail.required}
                >
                    <InputField
                        {...method.register(
                            INTRO_FIELD_CONFIG.contactEmail.name,
                        )}
                        size="lg"
                        id={INTRO_FIELD_CONFIG.contactEmail.name}
                        placeholder={
                            INTRO_FIELD_CONFIG.contactEmail.placeholder
                        }
                        isError={
                            'contactEmail' in method.formState.errors &&
                            !!method.formState.errors.contactEmail &&
                            method.formState.touchedFields.contactEmail
                        }
                        errorMessage={
                            method.formState.errors.contactEmail?.message ?? ''
                        }
                    />
                </FormItem>

                {/* 연락처 */}
                <FormItem
                    key={INTRO_FIELD_CONFIG.leaderPhone.name}
                    label={INTRO_FIELD_CONFIG.leaderPhone.label}
                    id={INTRO_FIELD_CONFIG.leaderPhone.name}
                    required={INTRO_FIELD_CONFIG.leaderPhone.required}
                >
                    <InputField
                        {...method.register(
                            INTRO_FIELD_CONFIG.leaderPhone.name,
                        )}
                        size="lg"
                        id={INTRO_FIELD_CONFIG.leaderPhone.name}
                        placeholder={INTRO_FIELD_CONFIG.leaderPhone.placeholder}
                    />
                </FormItem>

                {/* 회비 */}
                <FormItem
                    key={INTRO_FIELD_CONFIG.membershipFee.name}
                    label={INTRO_FIELD_CONFIG.membershipFee.label}
                    id={INTRO_FIELD_CONFIG.membershipFee.name}
                    required={INTRO_FIELD_CONFIG.membershipFee.required}
                >
                    <InputField
                        {...method.register(
                            INTRO_FIELD_CONFIG.membershipFee.name,
                        )}
                        size="lg"
                        id={INTRO_FIELD_CONFIG.membershipFee.name}
                        placeholder={
                            INTRO_FIELD_CONFIG.membershipFee.placeholder
                        }
                        hintText={INTRO_FIELD_CONFIG.membershipFee.hintText}
                    />
                </FormItem>

                {/* SNS */}
                <FormItem
                    key={INTRO_FIELD_CONFIG.snsAccount.name}
                    label={INTRO_FIELD_CONFIG.snsAccount.label}
                    id={INTRO_FIELD_CONFIG.snsAccount.name}
                    required={INTRO_FIELD_CONFIG.snsAccount.required}
                    hintText={INTRO_FIELD_CONFIG.snsAccount.hintText}
                >
                    <InputField
                        {...method.register(INTRO_FIELD_CONFIG.snsAccount.name)}
                        size="lg"
                        id={INTRO_FIELD_CONFIG.snsAccount.name}
                        placeholder={INTRO_FIELD_CONFIG.snsAccount.placeholder}
                    />
                </FormItem>

                {/* 동아리 신청폼 링크 */}
                <FormItem
                    key={INTRO_FIELD_CONFIG.applicationUrl.name}
                    label={INTRO_FIELD_CONFIG.applicationUrl.label}
                    id={INTRO_FIELD_CONFIG.applicationUrl.name}
                    required={INTRO_FIELD_CONFIG.applicationUrl.required}
                    hintText={INTRO_FIELD_CONFIG.applicationUrl.hintText}
                >
                    <InputField
                        {...method.register(
                            INTRO_FIELD_CONFIG.applicationUrl.name,
                        )}
                        size="lg"
                        id={INTRO_FIELD_CONFIG.applicationUrl.name}
                        placeholder={
                            INTRO_FIELD_CONFIG.applicationUrl.placeholder
                        }
                    />
                </FormItem>

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
