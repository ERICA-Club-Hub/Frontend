import { ClubRegisterForm } from '@/components/ClubRegister';
import useEditMode from '@/hooks/auth/useEditMode';

const ClubRegisterPage = () => {
    // 동아리 로그인 되어 있다면 수정모드
    const { isEditMode } = useEditMode();

    return <ClubRegisterForm editMode={isEditMode} />;
};

export { ClubRegisterPage };
