interface IHandleInputChange<T> {
    e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>;
    setInputValue: React.Dispatch<React.SetStateAction<T>>;
}

const inputChangeHandler = <T>({ e, setInputValue }: IHandleInputChange<T>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
        ...prev,
        [name]: value,
    }));
};

export { inputChangeHandler };
