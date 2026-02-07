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
import { CLUB_TYPE } from '@/constants/category-config.constant';

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
    if (clubType === CLUB_TYPE.CENTRAL || clubType === CLUB_TYPE.UNION) {
        const config = CATEGORY_CONFIG[clubType];
        return (
            <FormItem
                key={config.name}
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

    if (clubType === CLUB_TYPE.COLLEGE || clubType === CLUB_TYPE.DEPARTMENT) {
        return (
            <FormItem
                key={clubType}
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
                                if (clubType === CLUB_TYPE.DEPARTMENT)
                                    setValue('category.department', null, {
                                        shouldValidate: true,
                                    });
                            }}
                            items={getCollegeOptionsNameOnly()}
                            id="category.college"
                            placeholder="단과대 선택"
                        />
                    )}
                />

                {/* 학과 소속 동아리 */}
                {clubType === CLUB_TYPE.DEPARTMENT && college && (
                    <Controller
                        key={college}
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
