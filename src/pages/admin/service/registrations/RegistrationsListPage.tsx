import { useRegistrationQuery } from '@/domains/club/registration/api/registration.queries';
import ClubListView from '@/domains/shared/components/layout/ClubListView';
import ClubCard from '@/domains/shared/components/card/ClubCard';
import {
    CategoryResponse,
    ClubRegistrationResponse,
} from '@/api/data-contracts';
import { PATHS } from '@/routes/paths';

const DEPARTMENT_LENGTH = 2; // 카테고리 이름이 2개인 경우 -> 학과 동아리

// 동아리 등록 요청 검토 페이지
export default function RegistrationsListPage() {
    const queryResult = useRegistrationQuery();

    const getCategoryName = (category: CategoryResponse | undefined) => {
        const categoryList = [
            category?.centralCategoryName || '',
            category?.unionCategoryName || '',
            category?.collegeName || '',
            category?.departmentName || '',
        ].filter((name) => name !== '');

        return categoryList.length === DEPARTMENT_LENGTH
            ? categoryList[1]
            : categoryList[0];
    };

    return (
        <div className="flex flex-col items-center pt-[20px] pb-[32px]">
            <ClubListView
                queryResult={queryResult}
                render={(club: ClubRegistrationResponse) => (
                    <ClubCard
                        key={club.clubRegistrationId}
                        title={club.clubName}
                        subTitle={club.briefIntroduction}
                        categoryName={getCategoryName(club.category)}
                        profileImageUrl={club?.profileImageUrl}
                        to={PATHS.SERVICE_ADMIN_REGISTRATIONS_DETAIL(
                            String(club.clubRegistrationId),
                        )}
                    />
                )}
            />
        </div>
    );
}
