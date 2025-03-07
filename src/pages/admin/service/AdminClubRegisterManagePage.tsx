import Button from '@/components/Common/Button';
import useServiceAdminQueries from '@/hooks/queries/useServiceAdminQueries';
import styled from 'styled-components';

interface IClubRegistrationDTOList {
    clubRegistrationId: number;
    clubName: string;
    category: string;
    leaderEmail: string;
    oneLiner: string;
    briefIntroduction: string;
}

function AdminClubRegisterManagePage() {
    const {
        useClubRegistrationRequestQuery,
        useClubRegistrationRequestMutation,
    } = useServiceAdminQueries();
    const { data } = useClubRegistrationRequestQuery();

    const clubRegistrationRequestMutation =
        useClubRegistrationRequestMutation();

    const handleApprove = (clubRegistrationId: number) => {
        clubRegistrationRequestMutation.mutate(clubRegistrationId);
    };

    return (
        <Container>
            <Title>동아리 등록 관리</Title>

            <ClubList>
                {data &&
                    data.map((club: IClubRegistrationDTOList) => (
                        <Club key={club.clubRegistrationId}>
                            <ClubInfoWrapper>
                                <ClubName>{club.clubName}</ClubName>
                                <ClubId>
                                    id: &nbsp;{club.clubRegistrationId}
                                </ClubId>
                            </ClubInfoWrapper>
                            <Button
                                size="small"
                                onClick={() =>
                                    handleApprove(club.clubRegistrationId)
                                }
                            >
                                승인
                            </Button>
                        </Club>
                    ))}
            </ClubList>
        </Container>
    );
}

export { AdminClubRegisterManagePage };

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.div`
    margin: 20px;
`;

const ClubList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Club = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    width: 300px;
`;

const ClubInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 250px;
`;

const ClubName = styled.strong``;

const ClubId = styled.span``;
