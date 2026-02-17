import { ReactNode, useEffect, useState } from 'react';
import InputField from '@/components/InputField/InputField';
import TextArea from '@/components/InputField/TextArea';
import useProfileImage from '@/hooks/useProfileImage';
import { FormValues, profileSchema } from '../model/profile.schema';
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
import {
    ClubFormData,
    normalizeData,
} from '@/domains/shared/utils/clubFormDataMapper';

interface ClubProfileFormProps {
    mode: 'register' | 'update' | 'read';
    data: ClubFormData | null | undefined;
    title?: string;
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
    const isReadOnly = mode === 'read';

    const method = useForm<FormValues>({
        resolver: zodResolver(profileSchema) as Resolver<FormValues>,
        defaultValues: {
            clubName: '',
            leaderEmail: '',
            clubType: '' as ClubType,
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
        if (data) {
            const normalizedData = normalizeData(data);

            method.reset({
                clubName: normalizedData.clubName,
                leaderEmail: normalizedData.leaderEmail,
                clubType: normalizedData.category.clubCategoryName,
                category: {
                    central: normalizedData.category.centralCategoryName,
                    union: normalizedData.category.unionCategoryName,
                    college: normalizedData.category.collegeName,
                    department: normalizedData.category.departmentName,
                },
                oneLiner: normalizedData.oneLiner,
                briefIntroduction: normalizedData.briefIntroduction,
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
                <form
                    onSubmit={triggerSubmit}
                    className="flex flex-col justify-between items-center min-h-[calc(100vh-76px)]"
                >
                    <div>
                        {mode !== 'read' && (
                            <h1 className="w-full mb-[20px] text-b2 text-neutral-900">
                                {mode === 'update'
                                    ? '동아리 기본 등록 정보'
                                    : mode === 'register'
                                    ? '절차에 따라 동아리를 신청해 주세요.'
                                    : ''}
                            </h1>
                        )}
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
                                disabled={isReadOnly}
                            />
                        </FormItem>

                        {/* 동아리 이메일 */}
                        {mode !== 'update' && (
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
                                        PROFILE_FIELD_CONFIG.leaderEmail
                                            .placeholder
                                    }
                                    hintText="승인 결과가 이메일로 전송됩니다."
                                    maxLength={30}
                                    isError={
                                        'leaderEmail' in
                                            method.formState.errors &&
                                        !!method.formState.errors.leaderEmail &&
                                        method.formState.touchedFields
                                            .leaderEmail
                                    }
                                    errorMessage={
                                        method.formState.errors.leaderEmail
                                            ?.message ?? ''
                                    }
                                    disabled={isReadOnly}
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
                                            PROFILE_FIELD_CONFIG.clubType
                                                .options
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
                                        disabled={isReadOnly}
                                    />
                                )}
                            />
                        </FormItem>

                        {/* 분과 선택 */}
                        <CategorySelectDropdown
                            data={data?.category}
                            control={method.control}
                            setValue={method.setValue}
                            disabled={isReadOnly}
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
                                placeholder={
                                    PROFILE_FIELD_CONFIG.image.placeholder
                                }
                                disabled={isReadOnly}
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
                                disabled={isReadOnly}
                            />
                        </FormItem>

                        {/* 동아리 간단 소개 */}
                        {mode !== 'update' && (
                            <FormItem
                                label={
                                    PROFILE_FIELD_CONFIG.briefIntroduction.label
                                }
                                id="briefIntroduction"
                                hintText={
                                    PROFILE_FIELD_CONFIG.briefIntroduction
                                        .hintText
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
                                    disabled={isReadOnly}
                                />
                            </FormItem>
                        )}
                    </div>

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
