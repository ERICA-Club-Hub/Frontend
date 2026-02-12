import Button from '@/components/Button/Button';
import { useClubRegisterMutation } from '@/domains/club/profile/api/profile.mutations';
import { FormValues } from '@/domains/club/profile/model/profile.schema';
import ClubProfileForm from '@/domains/club/profile/ui/ClubProfileForm';

// 신규 동아리 등록 페이지
export default function RegistrationPage() {
    const { mutate: registerClub } = useClubRegisterMutation();

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
            data={null}
            onSubmit={handleSubmit}
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
