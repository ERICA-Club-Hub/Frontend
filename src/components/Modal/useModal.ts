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
                const id = `${key}_${Date.now()}_${Math.random()
                    .toString(36)
                    .slice(2)}`;

                const newModal: ModalType = {
                    key: id,
                    Component,
                    props: props || {},
                    resolve: (value) => {
                        resolve(value);
                        remove(id);
                    },
                    cancel: () => {
                        resolve(null);
                        remove(id);
                    },
                };

                setModals((prev) => {
                    // 중복 처리  (e.g. 더블 클릭 등으로 인한 동일 모달 중복 생성)
                    if (prev.some((m) => m.key.startsWith(`${key}_`)))
                        return prev;

                    return [...prev, newModal];
                });
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
