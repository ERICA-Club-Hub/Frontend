import Button from '@/components/Button/Button';
import ClubProfileForm from '@/domains/club/profile/ui/ClubProfileForm';
import useEditMode from '@/domains/club/profile/model/useEditMode';

export default function RegistrationPage() {
    // 신규 동아리 등록 페이지
    const { isEditMode } = useEditMode();

    return (
        <ClubProfileForm
            editMode={isEditMode}
            renderAction={({ isValid, isSubmitting }) => {
                return (
                    <Button
                        type="submit"
                        size="lg"
                        disabled={!isValid || isSubmitting}
                        className="mt-[40px] mb-[28px]"
                    >
                        동아리 등록 신청하기
                    </Button>
                );
            }}
        />
    );
}
