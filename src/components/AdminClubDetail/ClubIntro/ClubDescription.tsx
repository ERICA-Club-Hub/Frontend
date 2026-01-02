import { TextArea } from '@/components/Common/TextArea';
import { clubIntroList } from '@/constants/club-detail-register.constant';
import useBulletPointConverter from '@/hooks/actions/useBulletPointConverter';
import useClubIntroContext from '@/hooks/contexts/useClubIntroContext';
import useClubAdminQueries from '@/hooks/queries/useClubAdminQueries';
import { AdminSection, AdminSectionLabel } from '@/components/Common';
import { IClubIntroValue } from '@/types';
import { inputChangeHandler } from '@/utils/inputChangeHandler';

function ClubDescription() {
    const { inputValue, setInputValue } = useClubIntroContext();

    // 데이터 fetch
    const { useClubDescriptionQuery } = useClubAdminQueries();
    useClubDescriptionQuery(setInputValue);

    return (
        <AdminSection className="min-h-[719px] mb-[5px]">
            <h2 className="w-full mb-5 text-subtitle-02 font-semibold text-black">
                동아리 소개글 작성
            </h2>

            <div className="flex flex-col gap-5">
                {clubIntroList.map((clubIntro, index) => (
                    <div key={`club-intro-${index}`} className="flex flex-col gap-[10px]">
                        <AdminSectionLabel>{clubIntro.label}</AdminSectionLabel>
                        <TextArea
                            size="large"
                            backgroundColor="gray"
                            maxLength={
                                clubIntro.name === 'activity' ? 1000 : 500
                            }
                            placeholder={clubIntro.placeholder}
                            name={clubIntro.name}
                            value={
                                inputValue[
                                    clubIntro.name as keyof IClubIntroValue
                                ]
                            }
                            onChange={(e) =>
                                inputChangeHandler<IClubIntroValue>({
                                    e,
                                    setInputValue,
                                })
                            }
                            onKeyDown={(e) =>
                                useBulletPointConverter({
                                    e,
                                    setInputValue,
                                })
                            }
                        />
                    </div>
                ))}
            </div>
        </AdminSection>
    );
}

export { ClubDescription };
