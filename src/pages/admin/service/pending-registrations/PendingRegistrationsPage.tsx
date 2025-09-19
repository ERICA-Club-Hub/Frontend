import { useState } from 'react';
import styled from 'styled-components';
import { InputField } from '@/components/Common';
import SearchIcon from '@/assets/common/search.svg?react';
import ClubList from '@/components/ServiceAdmin/ClubList';
import useServiceAdminQueries from '@/hooks/queries/useServiceAdminQueries';

export default function PendingRegistrationsPage() {
    const { useClubRegistrationRequestQuery } = useServiceAdminQueries();
    const { isPending, data } = useClubRegistrationRequestQuery();

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data?.filter((club) =>
        club.clubName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <Container>
            <InputWrapper>
                <StyledSearchIcon />
                <SearchInputField
                    inputSize="large"
                    placeholder="동아리 검색"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </InputWrapper>

            <ClubList isPending={isPending} data={filteredData} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
`;

const InputWrapper = styled.div`
    position: relative;
    margin-bottom: 20px;
`;

const StyledSearchIcon = styled(SearchIcon)`
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #989898;
`;

const SearchInputField = styled(InputField)`
    padding: 14px 19px 14px 40px;
`;
