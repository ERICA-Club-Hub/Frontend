import { useState } from 'react';
import ClubListView from '@/components/ServiceAdmin/ClubListView';
import useServiceAdminQueries from '@/hooks/queries/useServiceAdminQueries';
import SearchInput from '@/components/ServiceAdmin/SearchInput';

// 동아리 등록 요청 검토 페이지
export default function ReviewRegistrationsPage() {
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
