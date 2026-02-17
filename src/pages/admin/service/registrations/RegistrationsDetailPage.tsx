import { useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/Button/Button';
import ClubProfileForm from '@/domains/shared/components/form/ClubProfileForm';
import { useRegistrationDetailQuery } from '@/domains/club/registration/api/registration.queries';
import useModal from '@/components/Modal/useModal';
import {
    useApproveRegistrationMutation,
    useDeleteRegistrationMutation,
} from '@/domains/club/registration/api/registration.mutations';
import { AlertModal } from '@/components/Modal/AlertModal';
import { ALERT_MODAL_MESSAGE } from '@/components/Modal/modal.constant';
import { ConfirmModal } from '@/components/Modal/ConfirmModal';
import { PATHS } from '@/routes/paths';

export default function RegistrationsDetailPage() {
    const { id: clubId } = useParams();
    const navigate = useNavigate();
    const modal = useModal();

    const { data } = useRegistrationDetailQuery(clubId);
    const { mutateAsync: approveRegistration } =
        useApproveRegistrationMutation();
    const { mutateAsync: deleteRegistration } = useDeleteRegistrationMutation();

    const handleApprove = async () => {
        const isConfirmed = await modal.push('prompt', ConfirmModal, {
            type: 'APPROVE',
            onConfirm: async () => await approveRegistration(clubId),
        });

        if (isConfirmed) {
            await modal.push('prompt', AlertModal, {
                title: ALERT_MODAL_MESSAGE.APPROVE.title,
                actionLabel: ALERT_MODAL_MESSAGE.APPROVE.actionLabel,
                onAction: () => navigate(PATHS.SERVICE_ADMIN_REGISTRATIONS),
            });
        }
    };

    const handleDelete = async () => {
        const isConfirmed = await modal.push('prompt', ConfirmModal, {
            type: 'DELETE',
            onConfirm: async () => await deleteRegistration(clubId),
        });

        if (isConfirmed) {
            await modal.push('prompt', AlertModal, {
                title: ALERT_MODAL_MESSAGE.DELETE.title,
                actionLabel: ALERT_MODAL_MESSAGE.DELETE.actionLabel,
                onAction: () => navigate(PATHS.SERVICE_ADMIN_REGISTRATIONS),
            });
        }
    };

    return (
        <ClubProfileForm
            mode="read"
            data={data}
            renderAction={({ isSubmitting }) => {
                return (
                    <div className="flex gap-[12px] justify-end w-full mt-[20px] mb-[28px]">
                        <Button
                            type="button"
                            size="xs"
                            disabled={isSubmitting}
                            onClick={handleApprove}
                        >
                            승인하기
                        </Button>
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
