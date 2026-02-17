import { UseQueryResult } from '@tanstack/react-query';
import { ReactNode } from 'react';
import ClubCard from '@/domains/shared/components/card/ClubCard';

interface ClublistProps<T> {
    queryResult: UseQueryResult<T[], Error>;
    render: (club: T) => ReactNode;
}

/**
 * 동아리 리스트를 받아서 렌더링하는 컴포넌트
 * @usage - 서비스 어드민 (신규 동아리 신청 관리, 동아리 관리, 동아리 정보 수정 요청 관리)
 */
export default function ClubListView<T>({
    queryResult,
    render,
}: ClublistProps<T>) {
    if (queryResult.isPending) {
        return (
            <div className="flex flex-col items-center gap-[8px]">
                {Array.from({ length: 6 }).map((_, index) => (
                    <ClubCard key={index} to="" isLoading />
                ))}
            </div>
        );
    }

    if (queryResult.isError) {
        return <div>동아리 정보를 불러오는 데 실패했습니다.</div>;
    }

    return queryResult.isSuccess ? (
        <div className="flex flex-col items-center gap-[8px]">
            {queryResult.data?.map((club) => render(club))}
        </div>
    ) : null;
}
