interface IBulleetPointConverter<T> {
    e: React.KeyboardEvent<HTMLTextAreaElement>;
    setInputValue: React.Dispatch<React.SetStateAction<T>>;
}

const useBulletPointConverter = <T>({
    e,
    setInputValue,
}: IBulleetPointConverter<T>) => {
    // 스페이스를 눌렀고, 스페이스를 누르기 직전의 입력 값이 '-'로 끝날 때
    if (e.key === ' ' && e.currentTarget.value.endsWith('-')) {
        e.preventDefault();
        const { name, value } = e.currentTarget;
        setInputValue((prev) => ({
            ...prev,
            // 마지막 문자('-')를 제외한 값 반환 + '• '를 추가
            [name]: value.slice(0, -1) + '• ',
        }));
    }
};

export default useBulletPointConverter;
