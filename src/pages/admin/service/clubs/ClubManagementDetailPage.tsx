import Button from '@/components/Button/Button';
import { AlertModal } from '@/components/Modal/AlertModal';
import { ConfirmModal } from '@/components/Modal/ConfirmModal';
import { ALERT_MODAL_MESSAGE } from '@/components/Modal/modal.constant';
import useModal from '@/components/Modal/useModal';
import { useDeleteClubMutation } from '@/domains/club/profile/api/profile.mutations';
import { useClubOverviewQuery } from '@/domains/club/profile/api/profile.queries';
import ClubProfileForm from '@/domains/shared/components/form/ClubProfileForm';
import { PATHS } from '@/routes/paths';
import { useNavigate, useParams } from 'react-router-dom';

export default function ClubManagementDetailPage() {
    const { id: clubId } = useParams();
    const navigate = useNavigate();
    const modal = useModal();

    const { data } = useClubOverviewQuery({ clubId, isPreview: false });
    const { mutateAsync: deleteRegistration } = useDeleteClubMutation();

    const handleDelete = async () => {
        const isConfirmed = await modal.push('prompt', ConfirmModal, {
            type: 'DELETE',
            onConfirm: async () => await deleteRegistration(clubId),
        });

        if (isConfirmed) {
            await modal.push('prompt', AlertModal, {
                title: ALERT_MODAL_MESSAGE.DELETE.title,
                actionLabel: ALERT_MODAL_MESSAGE.DELETE.actionLabel,
                onAction: () =>
                    navigate(PATHS.SERVICE_ADMIN_CLUBS + `?type=central`, {
                        replace: true,
                    }),
            });
        }
    };

    return (
        <ClubProfileForm
            mode="read"
            data={data}
            renderAction={({ isSubmitting }) => {
                return (
                    <div className="flex justify-end w-full mt-[20px] mb-[28px]">
                        <Button
                            type="button"
                            size="xs"
                            variant="negative"
                            disabled={isSubmitting}
                            onClick={handleDelete}
                        >
                            삭제하기
                        </Button>
                    </div>
                );
            }}
        />
    );
}
