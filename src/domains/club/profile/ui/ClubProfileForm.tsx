import { ReactNode, useState } from 'react';
import InputField from '@/components/InputField/InputField';
import TextArea from '@/components/InputField/TextArea';
import useDefaultImage from '@/hooks/useDefaultImage';
import {
    FormValues,
    profileSchema,
    registrationSchema,
} from '../model/profile.schema';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectDropdown from '@/domains/shared/components/dropdown/SelectDropdown';
import FormItem from '@/domains/shared/components/form/FormItem';
import {
    ONE_LINER_MAX_LENGTH,
    PROFILE_FIELD_CONFIG,
} from '../constants/form.constant';
import { ClubType } from '@/types/category.types';
import ClubImageUpload from '@/domains/shared/components/image-upload/ClubImageUpload';
import CategorySelectDropdown from './CategorySelectDropdown';
import { useClubRegisterMutation } from '../api/profile.mutations';

interface ClubProfileFormProps {
    editMode: boolean;
    renderAction?: (params: {
        isValid: boolean;
        isSubmitting: boolean;
    }) => ReactNode;
}

export default function ClubProfileForm({
    editMode,
    renderAction,
}: ClubProfileFormProps) {
    const method = useForm<FormValues>({
        resolver: zodResolver(
            editMode ? profileSchema : registrationSchema,
        ) as Resolver<FormValues>,
        defaultValues: {
            clubName: '',
            leaderEmail: '',
            clubType: '' as unknown as ClubType,
            category: {
                central: null,
                union: null,
                college: null,
                department: null,
            },
            oneLiner: '',
            briefIntroduction: '',
        },
        mode: 'onChange',
    });

    const [postImg, setPostImg] = useState<File | File[] | null>(null); // 요청보낼 이미지
    const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(
        '/placeholder-image.svg',
    ); // 미리보기 이미지

    useDefaultImage({ postImg, setPostImg }); // 기본 이미지 설정

    const { mutate: registerClub } = useClubRegisterMutation();

    // useEffect(() => {
    // TODO: 수정모드일 때 기존 데이터 불러와서 폼 초기화
    // if (editMode && initialData) {
    //     reset({
    //         clubName: initialData.name,
    //         // ... 필드 매핑
    //     });
    //     setPreviewImg(initialData.imageUrl); // 이미지 미리보기 설정
    // }
    // }, [editMode, postImg, setPostImg]);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const payload = { data, postImg };

        // 수정모드일 때
        if (editMode) {
            // TODO: api 호출 추가
        } else if (!editMode) {
            // 등록모드일 때
            registerClub(payload);
        }
    };

    return (
        <div className="w-full flex flex-col items-center pt-[20px]">
            <div>
                <h1 className="w-full mb-[20px] text-b2 text-neutral-900">
                    {editMode
                        ? '동아리 기본 등록 정보'
                        : '절차에 따라 동아리를 신청해 주세요.'}
                </h1>

                <form
                    onSubmit={method.handleSubmit(onSubmit)}
                    className="flex flex-col items-center"
                >
                    {/* 동아리 이름 */}
                    <FormItem
                        label={PROFILE_FIELD_CONFIG.clubName.label}
                        id="clubName"
                        required
                    >
                        <InputField
                            {...method.register('clubName')}
                            size="lg"
                            id="clubName"
                            type="text"
                            placeholder={
                                PROFILE_FIELD_CONFIG.clubName.placeholder
                            }
                            name="clubName"
                            maxLength={30}
                        />
                    </FormItem>

                    {/* 동아리 이메일 */}
                    {!editMode && (
                        <FormItem
                            label={PROFILE_FIELD_CONFIG.leaderEmail.label}
                            id="leaderEmail"
                            required
                        >
                            <InputField
                                {...method.register('leaderEmail')}
                                size="lg"
                                id="leaderEmail"
                                type="email"
                                placeholder={
                                    PROFILE_FIELD_CONFIG.leaderEmail.placeholder
                                }
                                hintText="승인 결과가 이메일로 전송됩니다."
                                maxLength={30}
                                isError={
                                    'leaderEmail' in method.formState.errors &&
                                    !!method.formState.errors.leaderEmail &&
                                    method.formState.touchedFields.leaderEmail
                                }
                                errorMessage="올바른 이메일 형식이 아니에요."
                            />
                        </FormItem>
                    )}

                    {/* 동아리 분류 */}
                    <FormItem
                        label={PROFILE_FIELD_CONFIG.clubType.label}
                        id="clubType"
                        required
                    >
                        <Controller
                            control={method.control}
                            name="clubType"
                            render={({ field: { onChange, value } }) => (
                                <SelectDropdown
                                    items={
                                        PROFILE_FIELD_CONFIG.clubType.options
                                    }
                                    id="clubType"
                                    value={value}
                                    onChange={(val) => {
                                        onChange(val);
                                        method.setValue(
                                            'category',
                                            {
                                                central: null,
                                                union: null,
                                                college: null,
                                                department: null,
                                            },
                                            { shouldValidate: true },
                                        );
                                    }}
                                    placeholder={
                                        PROFILE_FIELD_CONFIG.clubType
                                            .placeholder
                                    }
                                />
                            )}
                        />
                    </FormItem>

                    {/* 분과 선택 */}
                    <CategorySelectDropdown
                        control={method.control}
                        setValue={method.setValue}
                    />

                    {/* 동아리 사진 업로드 */}
                    <FormItem
                        label={PROFILE_FIELD_CONFIG.image.label}
                        id="image"
                    >
                        <ClubImageUpload
                            setPostImg={setPostImg}
                            previewImg={previewImg}
                            setPreviewImg={setPreviewImg}
                            placeholder={PROFILE_FIELD_CONFIG.image.placeholder}
                        />
                    </FormItem>

                    {/* 동아리 한 줄 소개 */}
                    <FormItem
                        label={PROFILE_FIELD_CONFIG.oneLiner.label}
                        id="oneLiner"
                        hintText={PROFILE_FIELD_CONFIG.oneLiner.hintText}
                        required
                    >
                        <InputField
                            {...method.register('oneLiner')}
                            size="lg"
                            id="oneLiner"
                            type="text"
                            placeholder={
                                PROFILE_FIELD_CONFIG.oneLiner.placeholder
                            }
                            maxLength={ONE_LINER_MAX_LENGTH}
                        />
                    </FormItem>

                    {/* 동아리 간단 소개 */}
                    {!editMode && (
                        <FormItem
                            label={PROFILE_FIELD_CONFIG.briefIntroduction.label}
                            id="briefIntroduction"
                            hintText={
                                PROFILE_FIELD_CONFIG.briefIntroduction.hintText
                            }
                            required
                        >
                            <TextArea
                                {...method.register('briefIntroduction')}
                                id="briefIntroduction"
                                placeholder={
                                    PROFILE_FIELD_CONFIG.briefIntroduction
                                        .placeholder
                                }
                                name="briefIntroduction"
                            />
                        </FormItem>
                    )}

                    {renderAction &&
                        renderAction({
                            isValid: method.formState.isValid,
                            isSubmitting: method.formState.isSubmitting,
                        })}
                </form>
            </div>
        </div>
    );
}
