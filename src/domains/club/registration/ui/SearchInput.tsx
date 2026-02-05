import InputField from '@/components/InputField/InputField';
import SearchIcon from '@/assets/search.svg?react';

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
            <SearchIcon className="absolute left-[15px] top-1/2 -translate-y-1/2 text-neutral-600" />
            <InputField
                inputType="search"
                placeholder="동아리 검색"
                value={value}
                onChange={handleChange}
                className="w-[320px] h-[48px] py-[14px] pr-[19px] pl-[40px]"
            />
        </div>
    );
}
