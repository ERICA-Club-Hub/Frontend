import InputField from '@/components/InputField/InputField';

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
