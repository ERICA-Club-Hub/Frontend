import Button from '@/components/Button/Button';
import { AlertModal } from '@/components/Modal/AlertModal';
import { ConfirmModal } from '@/components/Modal/ConfirmModal';
import { ALERT_MODAL_MESSAGE } from '@/components/Modal/modal.constant';
import useModal from '@/components/Modal/useModal';
import { useDeleteClubMutation } from '@/domains/club/profile/api/profile.mutations';
import { useClubOverviewQuery } from '@/domains/club/profile/api/profile.queries';
import ClubProfileForm from '@/domains/shared/components/form/ClubProfileForm';
import { PATHS } from '@/routes/paths';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

// [서비스 어드민] 동아리 관리 상세 페이지
export default function ClubManagementDetailPage() {
    const { id: clubId } = useParams();
    const navigate = useNavigate();
    const modal = useModal();

    const { data, isError } = useClubOverviewQuery({
        clubId,
        isPreview: false,
    });
    const { mutateAsync: deleteClub } = useDeleteClubMutation();

    const handleDelete = async () => {
        const isConfirmed = await modal.push('prompt', ConfirmModal, {
            type: 'DELETE',
            onConfirm: async () => await deleteClub(clubId),
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

    if (isError) return <Navigate to={PATHS.WRONG_ACCESS} replace={true} />;

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
