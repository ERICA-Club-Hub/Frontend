// import ClubProfileForm from '@/domains/club/profile/ui/ClubProfileForm';
import useEditMode from '@/domains/club/profile/model/useEditMode';

// 동아리 등록 정보 수정 페이지
export default function RegistrationEditPage() {
    const { isEditMode } = useEditMode();

    // return <ClubProfileForm editMode={isEditMode} />;
    return <></>;
}
