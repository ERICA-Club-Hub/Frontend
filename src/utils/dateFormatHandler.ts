interface IDateFormatHandler<T> {
    e: React.ChangeEvent<HTMLInputElement>;
    setInputValue: React.Dispatch<React.SetStateAction<T>>;
}

export const dateFormatHandler = <T>({
    e,
    setInputValue,
}: IDateFormatHandler<T>) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 입력받도록

    if (value.length >= 4) value = `${value.slice(0, 4)}.${value.slice(4)}`;
    if (value.length >= 7) value = `${value.slice(0, 7)}.${value.slice(7, 10)}`;

    setInputValue((prev) => ({
        ...prev,
        date: value,
    }));
};
