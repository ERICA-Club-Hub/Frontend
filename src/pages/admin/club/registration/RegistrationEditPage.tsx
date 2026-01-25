import { ClubRegisterForm } from '@/domains/club/registration/ui/ClubRegisterForm';
import useEditMode from '@/domains/club/registration/model/useEditMode';

// 동아리 등록 정보 수정 페이지
export default function RegistrationEditPage() {
    const { isEditMode } = useEditMode();

    return <ClubRegisterForm editMode={isEditMode} />;
}
