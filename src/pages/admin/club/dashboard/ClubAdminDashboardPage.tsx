import NavigationLink from '@/components/Link/NavigationLink';
import { DEFAULT_IMG } from '@/constants/default-image.constant';
import { getClubAdminMenus } from '@/constants/navigations.constant';
import { useClubOverviewQuery } from '@/domains/club/profile/api/profile.queries';
import { useUpdateRecruitStatusMutation } from '@/domains/club/recruitment/api/recruitment.mutations';
import { RECRUITMENT_STATUS_MAP } from '@/domains/club/recruitment/constant/recruitment.constant';
import RecruitmentStatusDropdown from '@/domains/club/recruitment/ui/admin/RecruitmentStatusDropdown';
import { RecruitmentStatus } from '@/types/recruitment-status.type';
import { cn } from '@/utils/cn';
import { getRecruitmentStatusOptions } from '@/utils/getCategoryOptions';
import { useParams } from 'react-router-dom';

export default function ClubAdminDashboardPage() {
    const { id: clubId } = useParams<{ id: string }>();

    const { data, isSuccess } = useClubOverviewQuery({
        clubId,
        isPreview: false,
    });
    const { mutate: update } = useUpdateRecruitStatusMutation(Number(clubId));

    const onSelectRecruitmentStatus = (value: RecruitmentStatus) => {
        const option = RECRUITMENT_STATUS_MAP[value];
        update(option);
    };

    return (
        <div className="w-full flex flex-col items-center pt-[20px]">
            <header
                className={cn(
                    'w-[320px] h-[88px] border-b border-solid border-neutral-150 mb-[8px]',
                )}
            >
                {isSuccess && (
                    <div className="flex gap-[16px]">
                        <div
                            className={cn(
                                'flex items-center justify-center w-[68px] h-[68px] rounded-[8px]',
                                !data?.profileImageUrl &&
                                    'border border-solid border-neutral-150 bg-neutral-00',
                            )}
                        >
                            <img
                                src={data?.profileImageUrl || DEFAULT_IMG}
                                alt="club-logo"
                                className={cn(
                                    'w-full h-full object-cover rounded-[8px]',
                                )}
                            />
                        </div>

                        <div className="flex flex-col gap-[4px]">
                            <h2 className="text-b2 text-neutral-800">
                                {data?.name}
                            </h2>
                            <p className="text-b4 text-neutral-600">
                                {data?.oneLiner}
                            </p>
                        </div>
                    </div>
                )}
            </header>

            <div className="flex flex-col items-center gap-[4px]">
                <>
                    <div className="flex justify-between w-[360px] h-[63px] py-[12px] px-[20px]">
                        <div className="flex flex-col gap-[2px]">
                            <strong className="text-b3 text-neutral-900">
                                모집 상태
                            </strong>
                            <p className="text-c1 text-neutral-400">
                                모집 상태를 주기적으로 업데이트 해주세요.
                            </p>
                        </div>

                        <RecruitmentStatusDropdown
                            options={getRecruitmentStatusOptions()}
                            selectedValue={data?.recruitmentStatus}
                            onSelect={(value) =>
                                onSelectRecruitmentStatus(
                                    value as RecruitmentStatus,
                                )
                            }
                        />
                    </div>

                    {getClubAdminMenus(Number(clubId)).map((menu) => (
                        <NavigationLink
                            key={menu.label}
                            type="clubAdmin"
                            to={menu.url}
                            content={{
                                label: menu.label,
                                description: menu.description,
                            }}
                        >
                            {menu.label}
                        </NavigationLink>
                    ))}
                </>
            </div>
        </div>
    );
}
