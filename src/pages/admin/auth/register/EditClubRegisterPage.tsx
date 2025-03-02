import { ClubRegisterForm } from '@/components/ClubRegister';
import useEditMode from '@/hooks/auth/useEditMode';

const EditClubRegisterPage = () => {
    const { isEditMode } = useEditMode();

    return <ClubRegisterForm editMode={isEditMode} />;
};

export { EditClubRegisterPage };
