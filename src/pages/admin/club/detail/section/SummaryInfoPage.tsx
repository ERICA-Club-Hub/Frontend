import { InputField } from '@/components/InputField/InputField';
import { useState } from 'react';
import { summaryInfoList } from '@/domains/shared/constants/club-detail-register.constant';
import Button from '@/components/Button/Button';
import {
    AdminSection,
    AdminSectionLabel,
    AdminButtonGroup,
} from '@/domains/shared/components/layout/AdminSection';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import { ISummaryInfoValue } from '@/types';
import useClubAdminQueries from '@/domains/shared/api/useClubAdminQueries';
import LoadingModal from '@/components/Loading/LoadingModal';
import { RecruitmentStatus } from '@/domains/club/recruitment/ui/admin/RecruitmentStatus';

export default function SummaryInfoPage() {
    const [inputValue, setInputValue] = useState<ISummaryInfoValue>({
        recruitmentStatus: '',
        leaderName: '',
        leaderPhone: '',
        activities: '',
        membershipFee: null,
        snsUrl: '',
        applicationUrl: '',
    });

    // 데이터 fetch 및  데이터 저장 mutation 호출
    const { useSaveSummaryInfoMutation, useSummaryInfoQuery } =
        useClubAdminQueries();
    const { isPending } = useSummaryInfoQuery(setInputValue);
    const saveSummaryInfoMutation = useSaveSummaryInfoMutation(inputValue);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        saveSummaryInfoMutation.mutate(); // 데이터 저장
    };

    const isValid =
        inputValue.recruitmentStatus.length > 0 &&
        inputValue.leaderName.length > 0 &&
        inputValue.leaderPhone.length > 0 &&
        inputValue.activities.length > 0 &&
        inputValue.membershipFee;

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
                {/* 동아리 모집 여부 */}
                <RecruitmentStatus
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />

                {/* 동아리 요약 정보 */}
                <AdminSection className="h-[472px]">
                    <h2 className="w-full mb-5 text-subtitle-02 font-semibold text-black">
                        동아리 요약 정보
                    </h2>

                    <ul className="flex flex-col justify-center gap-[10px]">
                        {summaryInfoList.map((summaryInfo, index) => (
                            <li
                                key={`summary-info-${index}`}
                                className="flex flex-col items-center gap-[10px]"
                            >
                                <div className="flex justify-start items-center gap-[5px] w-[280px]">
                                    <AdminSectionLabel
                                        style={
                                            // SNS 한정 width 조정 (100% -> auto)
                                            summaryInfo.label === 'SNS' ||
                                            summaryInfo.label === '회비'
                                                ? { width: 'auto' }
                                                : {}
                                        }
                                    >
                                        {summaryInfo.label}
                                    </AdminSectionLabel>
                                    {summaryInfo.label === 'SNS' && (
                                        <span className="text-body-03 font-normal text-neutral-400">
                                            (선택)
                                        </span>
                                    )}
                                    {summaryInfo.label === '회비' && (
                                        <span className="text-body-03 font-normal text-neutral-400">
                                            (숫자만 입력가능)
                                        </span>
                                    )}
                                </div>
                                <InputField
                                    value={
                                        inputValue[
                                            summaryInfo.name as keyof ISummaryInfoValue
                                        ] ?? ''
                                    }
                                    type={
                                        summaryInfo.name === 'membershipFee'
                                            ? 'number'
                                            : 'text'
                                    }
                                    name={summaryInfo.name}
                                    inputSize={'medium'}
                                    backgroundColor={'gray'}
                                    placeholder={
                                        isPending ? '' : summaryInfo.placeholder
                                    }
                                    onChange={(e) =>
                                        inputChangeHandler<ISummaryInfoValue>({
                                            e,
                                            setInputValue,
                                        })
                                    }
                                    maxLength={20}
                                />
                            </li>
                        ))}
                    </ul>
                </AdminSection>

                {/* 동아리 신청 폼 링크 */}
                <AdminSection className="h-[101px] gap-[8px] mb-[10px]">
                    <div className="flex justify-start items-center gap-[5px] w-[280px]">
                        <AdminSectionLabel style={{ width: 'auto' }}>
                            동아리 신청 폼 링크
                        </AdminSectionLabel>
                        <span className="text-body-03 font-normal text-neutral-400">
                            (선택)
                        </span>
                    </div>
                    <InputField
                        value={inputValue.applicationUrl}
                        name="applicationUrl"
                        inputSize={'medium'}
                        backgroundColor={'gray'}
                        placeholder={
                            isPending
                                ? ''
                                : '신청 폼 링크를 정확하게 입력해 주세요.'
                        }
                        onChange={(e) =>
                            inputChangeHandler<ISummaryInfoValue>({
                                e,
                                setInputValue,
                            })
                        }
                    />
                </AdminSection>

                <AdminButtonGroup>
                    {/* <Button
                        type="button"
                        size="small"
                        variant="outlined"
                        isDisabled={() => false}
                    >
                        미리보기
                    </Button> */}
                    <Button type="submit" size="small" disabled={!isValid}>
                        저장하기
                    </Button>
                </AdminButtonGroup>
            </form>

            <LoadingModal
                isPending={saveSummaryInfoMutation.isPending}
                isSuccess={saveSummaryInfoMutation.isSuccess}
            />
        </>
    );
}
