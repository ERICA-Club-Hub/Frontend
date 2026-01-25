import { ClubRegisterForm } from '@/domains/club/registration/ui/ClubRegisterForm';
import useEditMode from '@/domains/club/registration/model/useEditMode';

export default function RegistrationPage() {
    // 동아리 로그인 되어 있다면 수정모드
    const { isEditMode } = useEditMode();

    return <ClubRegisterForm editMode={isEditMode} />;
}
