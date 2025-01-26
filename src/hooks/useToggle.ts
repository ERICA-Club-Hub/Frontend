import { useCallback, useState } from 'react';

export const useToggle = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, [isOpen]);

    return { isOpen, setIsOpen, toggle };
};

export default useToggle;
