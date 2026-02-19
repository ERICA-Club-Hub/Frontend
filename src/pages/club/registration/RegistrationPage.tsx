import Button from '@/components/Button/Button';
import { FormValues } from '@/domains/club/profile/model/profile.schema';
import ClubProfileForm from '@/domains/shared/components/form/ClubProfileForm';
import { useRegistrationMutation } from '@/domains/club/registration/api/registration.mutations';

// 신규 동아리 등록 페이지
export default function RegistrationPage() {
    const { mutate: registerClub } = useRegistrationMutation();

    const handleSubmit = async (
        formValues: FormValues,
        postImg: File | File[] | null,
    ) => {
        registerClub({
            data: formValues,
            postImg,
        });
    };

    return (
        <ClubProfileForm
            mode="register"
            onSubmit={handleSubmit}
            renderAction={({ isValid, isSubmitting }) => {
                return (
                    <Button
                        type="submit"
                        size="lg"
                        disabled={!isValid || isSubmitting}
                        className="mt-[32px] mb-[28px]"
                    >
                        동아리 등록 신청하기
                    </Button>
                );
            }}
        />
    );
}
