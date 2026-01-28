import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@/components/Button/Button';
import ClubDetailLayout from '@/domains/club/registration/ui/ClubDetailLayout';
import {
    ClubRegistrationDTOList,
    PendingRegistrationResponse,
} from '@/domains/club/registration/types/registration.types';
import { APIResponse } from '@/types/api.types';

export default function RegistrationsDetailPage() {
    const { id } = useParams();
    const queryClient = useQueryClient();

    if (!id) {
        return (
            <p className="flex flex-col items-center pt-5 text-center">
                잘못된 접근입니다. <br />
                목록 페이지에서 다시 시도해주세요.
            </p>
        );
    }

    const cachedData = queryClient.getQueryData<
        APIResponse<PendingRegistrationResponse>
    >(['registrations', 'pending']);

    const data = cachedData?.result.clubRegistrationDTOList.find(
        (club: ClubRegistrationDTOList) =>
            id === String(club.clubRegistrationId),
    );

    if (!data) {
        return (
            <p className="flex flex-col items-center pt-5 text-center">
                동아리 정보를 불러오는 데 실패했습니다. <br />
                목록 페이지에서 다시 접근해주세요
            </p>
        );
    }

    return (
        <ClubDetailLayout
            data={data}
            button={
                <>
                    <Button
                        size="small"
                        variant="outlined"
                        className="text-sub-warning border-sub-warning"
                    >
                        삭제하기
                    </Button>
                    <Button size="small" variant="filled">
                        승인하기
                    </Button>
                </>
            }
        />
    );
}
