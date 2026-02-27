import ClubProfileForm from '@/domains/shared/components/form/ClubProfileForm';
import Button from '@/components/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useClubOverviewQuery } from '@/domains/club/profile/api/profile.queries';
import useModal from '@/components/Modal/useModal';
import { useUpdateProfileMutation } from '@/domains/club/profile/api/profile.mutations';
import { ALERT_MODAL_MESSAGE } from '@/components/Modal/modal.constant';
import { AlertModal } from '@/components/Modal/AlertModal';
import { PATHS } from '@/routes/paths';
import { FormValues } from '@/domains/club/profile/model/profile.schema';
import { useErrorHandler } from '@/hooks/useErrorHandler';

// 동아리 기본 정보 관리 페이지
export default function ProfileManagePage() {
    const { id: clubId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const modal = useModal();
    const { handleError } = useErrorHandler();

    const { data } = useClubOverviewQuery({
        clubId,
        isPreview: false,
    });
    const { mutateAsync: update, isPending } = useUpdateProfileMutation();

    const handleSubmit = async (
        formValues: FormValues,
        postImg: File | File[] | null,
    ) => {
        if (!clubId) return;

        const payload = {
            data: formValues,
            postImg,
            clubId: Number(clubId),
        };

        try {
            await update(payload);

            await modal.push('prompt', AlertModal, {
                title: ALERT_MODAL_MESSAGE.SAVE.title,
                actionLabel: ALERT_MODAL_MESSAGE.SAVE.actionLabel,
                onAction: () =>
                    navigate(PATHS.CLUB_ADMIN_DASHBOARD(Number(clubId))),
            });
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <ClubProfileForm
            mode="update"
            data={data}
            onSubmit={handleSubmit}
            renderAction={({ isValid, isSubmitting, submitHandler }) => {
                return (
                    <div className="flex justify-end w-full">
                        <Button
                            type="button"
                            size="xs"
                            disabled={!isValid}
                            isLoading={isSubmitting || isPending}
                            className="mb-[28px]"
                            onClick={submitHandler}
                        >
                            저장하기
                        </Button>
                    </div>
                );
            }}
        />
    );
}
