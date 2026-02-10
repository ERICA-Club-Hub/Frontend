import { createPortal } from 'react-dom';
import useModal from './useModal';

export default function ModalContainer() {
    const { topModal } = useModal();

    if (!topModal) return null;

    const { key, Component, props, resolve, cancel } = topModal;

    return createPortal(
        <Component
            key={key}
            {...(props as object)}
            resolve={resolve}
            closeModal={() => cancel()}
        />,
        document.body,
    );
}
