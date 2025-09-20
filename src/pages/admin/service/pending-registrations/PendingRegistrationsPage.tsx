import { useState } from 'react';
import styled from 'styled-components';
import ClubListView from '@/components/ServiceAdmin/ClubListView';
import useServiceAdminQueries from '@/hooks/queries/useServiceAdminQueries';
import ClubListPageLayout from '@/components/ServiceAdmin/ClubListPageLayout';

export default function PendingRegistrationsPage() {
    const { useClubRegistrationRequestQuery } = useServiceAdminQueries();
    const { isPending, data, isError } = useClubRegistrationRequestQuery();

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data?.filter((club) =>
        club.clubName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <Container>
            <ClubListPageLayout
                value={searchTerm}
                onChange={handleSearchChange}
                clubList={
                    <ClubListView
                        isPending={isPending}
                        isError={isError}
                        data={filteredData}
                    />
                }
            />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
`;
