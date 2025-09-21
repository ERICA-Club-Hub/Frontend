import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import Button from '@/components/Common/Button';
import ClubDetailLayout from '@/components/ServiceAdmin/ClubDetailLayout';
import {
    ClubRegistrationDTOList,
    PendingRegistrationResponse,
} from '@/types/club.types';
import { APIResponse } from '@/types';

export default function RegistrationsDetailPage() {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const cachedData = queryClient.getQueryData<
        APIResponse<PendingRegistrationResponse>
    >(['registrations', 'pending']);

    const data = cachedData?.result.clubRegistrationDTOList.find(
        (club: ClubRegistrationDTOList) =>
            id === String(club.clubRegistrationId),
    );

    if (!data) {
        return (
            <ErrorMessage>
                동아리 정보를 불러오는 데 실패했습니다. <br />
                목록 페이지에서 다시 접근해주세요
            </ErrorMessage>
        );
    }

    return (
        <ClubDetailLayout
            data={data}
            button={
                <>
                    <DeleteButton size="small" variant="outlined">
                        삭제하기
                    </DeleteButton>
                    <Button size="small" variant="filled">
                        승인하기
                    </Button>
                </>
            }
        />
    );
}

const DeleteButton = styled(Button)`
    color: ${({ theme }) => theme.colors.red};
    border: 1px solid ${({ theme }) => theme.colors.red};
`;

const ErrorMessage = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    text-align: center;
`;
