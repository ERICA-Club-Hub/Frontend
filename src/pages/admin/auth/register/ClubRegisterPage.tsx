import { ClubRegisterForm } from '@/components/ClubRegister';
import useEditMode from '@/hooks/auth/useEditMode';

const ClubRegisterPage = () => {
    const { isEditMode } = useEditMode();

    return <ClubRegisterForm editMode={isEditMode} />;
};

export { ClubRegisterPage };
