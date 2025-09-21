import { useState } from 'react';
import styled from 'styled-components';
import ClubListView from '@/components/ServiceAdmin/ClubListView';
import useServiceAdminQueries from '@/hooks/queries/useServiceAdminQueries';
import SearchInput from '@/components/ServiceAdmin/SearchInput';

// 동아리 등록 요청 검토 페이지
export default function ReviewRegistrationsPage() {
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
            <SearchInputWrapper>
                <SearchInput value={searchTerm} onChange={handleSearchChange} />
            </SearchInputWrapper>

            <ClubListView
                isPending={isPending}
                isError={isError}
                data={filteredData}
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

const SearchInputWrapper = styled.div`
    margin-bottom: 20px;
`;
