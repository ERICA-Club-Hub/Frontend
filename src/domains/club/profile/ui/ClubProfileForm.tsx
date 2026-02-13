import { ReactNode, useEffect, useState } from 'react';
import InputField from '@/components/InputField/InputField';
import TextArea from '@/components/InputField/TextArea';
import useProfileImage from '@/hooks/useProfileImage';
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
import { ClubOverviewResponse } from '@/api/data-contracts';

interface ClubProfileFormProps {
    mode: 'register' | 'update';
    data: ClubOverviewResponse | null | undefined;
    onSubmit: (formValues: FormValues, image: File | File[] | null) => void;
    renderAction?: (params: {
        isValid: boolean;
        isSubmitting: boolean;
        submitHandler: () => void;
    }) => ReactNode;
}

export default function ClubProfileForm({
    mode,
    data,
    onSubmit,
    renderAction,
}: ClubProfileFormProps) {
    const method = useForm<FormValues>({
        resolver: zodResolver(
            mode === 'update' ? profileSchema : registrationSchema,
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

    useProfileImage({
        fetchImgUrl: data?.profileImageUrl,
        setPostImg,
    }); // 프로필 이미지 설정

    // 데이터 패칭 시 폼 초기화
    useEffect(() => {
        if (mode === 'update' && data) {
            method.reset({
                clubName: data.name,
                clubType: data.category?.clubCategoryName as ClubType,
                category: {
                    central: data.category?.centralCategoryName,
                    union: data.category?.unionCategoryName,
                    college: data.category?.collegeName,
                    department: data.category?.departmentName,
                },
                oneLiner: data.oneLiner,
            });

            if (data.profileImageUrl) {
                setPreviewImg(data.profileImageUrl);
            }
        }
    }, [data, method, mode]);

    const handleSubmit: SubmitHandler<FormValues> = (formValues) => {
        // 부모 컴포넌트로 전달 (로직은 부모 컴포넌트에서 관리)
        onSubmit(formValues, postImg);
    };

    const triggerSubmit = method.handleSubmit(handleSubmit);

    return (
        <div className="w-full flex flex-col items-center pt-[20px]">
            <div>
                <h1 className="w-full mb-[20px] text-b2 text-neutral-900">
                    {mode === 'register'
                        ? '동아리 기본 등록 정보'
                        : '절차에 따라 동아리를 신청해 주세요.'}
                </h1>

                <form
                    onSubmit={triggerSubmit}
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
                    {mode === 'register' && (
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
                                errorMessage={
                                    method.formState.errors.leaderEmail
                                        ?.message ?? ''
                                }
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
                                    options={
                                        PROFILE_FIELD_CONFIG.clubType.options
                                    }
                                    id="clubType"
                                    value={
                                        data?.category?.clubCategoryName ||
                                        value
                                    }
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
                        data={data?.category}
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
                    {mode === 'register' && (
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
                            submitHandler: triggerSubmit,
                        })}
                </form>
            </div>
        </div>
    );
}
