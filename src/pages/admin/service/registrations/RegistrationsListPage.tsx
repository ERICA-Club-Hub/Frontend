import { useState } from 'react';
import ClubListView from '@/domains/club/registration/ui/ClubListView';
import useServiceAdminQueries from '@/domains/club/registration/api/useServiceAdminQueries';
import SearchInput from '@/domains/club/registration/ui/SearchInput';

// 동아리 등록 요청 검토 페이지
export default function RegistrationsListPage() {
    const { useClubRegistrationRequestQuery } = useServiceAdminQueries();
    const { isPending, data, isError } = useClubRegistrationRequestQuery();

    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredData = data?.filter((club) =>
        club.clubName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="flex flex-col items-center pt-5">
            <div className="mb-5">
                <SearchInput value={searchTerm} setValue={setSearchTerm} />
            </div>

            <ClubListView
                isPending={isPending}
                isError={isError}
                data={filteredData}
            />
        </div>
    );
}
