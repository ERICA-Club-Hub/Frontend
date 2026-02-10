import { useRecoilState } from 'recoil';
import { modalState, ModalType } from './modal.atom';
import { ComponentType, useCallback } from 'react';

type ModalCommonProps = {
    resolve: (value: any) => void;
    closeModal: () => void;
};

const useModal = () => {
    const [modals, setModals] = useRecoilState(modalState);

    const topModal = modals.length > 0 ? modals[modals.length - 1] : null;

    const remove = useCallback(
        (key: string) => {
            setModals((prev) => prev.filter((modal) => modal.key !== key));
        },
        [setModals],
    );

    const push = useCallback(
        <T extends ModalCommonProps>(
            key: string,
            Component: ComponentType<T>,
            props: Omit<T, keyof ModalCommonProps>,
        ) => {
            return new Promise((resolve) => {
                const newModal: ModalType = {
                    key,
                    Component,
                    props: props || {},
                    resolve: (value) => {
                        resolve(value);
                        remove(key);
                    },
                    cancel: () => {
                        resolve(null);
                        remove(key);
                    },
                };

                setModals((prev) => [...prev, newModal]);
            });
        },
        [setModals, remove],
    );

    const clear = useCallback(() => {
        setModals([]);
    }, [setModals]);

    return { topModal, modals, push, clear };
};

export default useModal;
