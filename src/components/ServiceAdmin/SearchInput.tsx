import { InputField } from '@/components/Common';
import SearchIcon from '@/assets/common/search.svg?react';

interface SearchInputProps {
    value: string; // 검색어 상태
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchInput({ value, setValue }: SearchInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className="relative">
            <SearchIcon className="absolute left-[15px] top-1/2 -translate-y-1/2 text-gray-light" />
            <InputField
                inputSize="large"
                placeholder="동아리 검색"
                value={value}
                onChange={handleChange}
                className="py-[14px] pr-[19px] pl-[40px]"
            />
        </div>
    );
}
