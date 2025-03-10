interface IDateFormatHandler<T> {
    e:
        | React.ChangeEvent<HTMLInputElement>
        | React.KeyboardEvent<HTMLInputElement>;
    setInputValue: React.Dispatch<React.SetStateAction<T>>;
}

const dateFormatHandler = <T>({ e, setInputValue }: IDateFormatHandler<T>) => {
    let value = e.currentTarget.value.replace(/[^0-9]/g, ''); // 숫자만 입력받도록

    if (value.length >= 4) value = `${value.slice(0, 4)}.${value.slice(4)}`;
    if (value.length >= 7) value = `${value.slice(0, 7)}.${value.slice(7, 10)}`;

    setInputValue((prev) => ({
        ...prev,
        date: value,
    }));
};

export const handleDateChange = <T>({
    e,
    setInputValue,
}: IDateFormatHandler<T>) => {
    if (e.type === 'change') {
        dateFormatHandler({ e, setInputValue });
    } else if (
        e.type === 'keydown' &&
        (e as unknown as React.KeyboardEvent).key === 'Backspace'
    ) {
        const value = e.currentTarget.value;
        if (value.endsWith('.')) {
            e.preventDefault();
            setInputValue((prev) => ({
                ...prev,
                date: value.slice(0, -1),
            }));
        }
    }
};

export { dateFormatHandler };
