import {
    Control,
    Controller,
    UseFormSetValue,
    useWatch,
} from 'react-hook-form';
import { FormValues } from '../model/profile.schema';
import {
    CATEGORY_CONFIG,
    PROFILE_FIELD_CONFIG,
} from '../constants/form.constant';
import FormItem from '@/domains/shared/components/form/FormItem';
import SelectDropdown from '@/domains/shared/components/dropdown/SelectDropdown';
import {
    getCollegeOptionsNameOnly,
    getDepartmentOptionsNameOnly,
} from '@/utils/getCategoryOptions';

interface CategorySelectDropdownProps {
    control: Control<FormValues>;
    setValue: UseFormSetValue<FormValues>;
}

export default function CategorySelectDropdown({
    control,
    setValue,
}: CategorySelectDropdownProps) {
    const clubType = useWatch({ name: 'clubType', control });
    const college = useWatch({ name: 'category.college', control });

    // TODO: 매직 스트링 상수화
    if (clubType === 'CENTRAL' || clubType === 'UNION') {
        const config = CATEGORY_CONFIG[clubType];
        return (
            <FormItem
                label={PROFILE_FIELD_CONFIG.category.label}
                hintText={PROFILE_FIELD_CONFIG.category.hintText}
                id={config.name}
                required
            >
                <Controller
                    control={control}
                    name={config.name}
                    render={({ field: { value, onChange } }) => (
                        <SelectDropdown
                            value={value || ''}
                            onChange={onChange}
                            items={config.options}
                            id={config.name}
                            placeholder={config.placeholder}
                        />
                    )}
                />
            </FormItem>
        );
    }

    if (clubType === 'COLLEGE' || clubType === 'DEPARTMENT') {
        return (
            <FormItem
                label={PROFILE_FIELD_CONFIG.category.label}
                hintText={PROFILE_FIELD_CONFIG.category.hintText}
                id="category.college"
                required
            >
                <Controller
                    control={control}
                    name="category.college"
                    render={({ field: { value, onChange } }) => (
                        <SelectDropdown
                            value={value || ''}
                            onChange={(val) => {
                                onChange(val);
                                if (clubType === 'DEPARTMENT')
                                    setValue('category.department', null);
                            }}
                            items={getCollegeOptionsNameOnly()}
                            id="category.college"
                            placeholder="단과대 선택"
                        />
                    )}
                />

                {/* 학과 소속 동아리 */}
                {clubType === 'DEPARTMENT' && college && (
                    <Controller
                        control={control}
                        name="category.department"
                        render={({ field: { value, onChange } }) => (
                            <SelectDropdown
                                value={value || ''}
                                onChange={onChange}
                                items={getDepartmentOptionsNameOnly(college)}
                                id="category.department"
                                placeholder="학과 선택"
                            />
                        )}
                    />
                )}
            </FormItem>
        );
    }

    return null;
}
