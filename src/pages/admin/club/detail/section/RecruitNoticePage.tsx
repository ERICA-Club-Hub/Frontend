import { useState } from 'react';
import Button from '@/components/Button/Button';
import { TextArea } from '@/components/InputField/TextArea';
import { recruitNoticeList } from '@/domains/shared/constants/club-detail-register.constant';
import {
    AdminButtonGroup,
    AdminSection,
    AdminSectionLabel,
} from '@/domains/shared/components/layout/AdminSection';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import { IRecruitNoticeValue } from '@/types';
import useBulletPointConverter from '@/hooks/actions/useBulletPointConverter';
import useClubAdminQueries from '@/domains/shared/api/useClubAdminQueries';
import LoadingModal from '@/components/Loading/LoadingModal';

export default function RecruitNoticePage() {
    const [inputValue, setInputValue] = useState<IRecruitNoticeValue>({
        due: '',
        notice: '',
        etc: '',
    });

    // 데이터 fetch 및 저장 mutation 호출
    const { useRecruitNoticeQuery, useSaveRecruitNoticeMutation } =
        useClubAdminQueries();
    const { isPending } = useRecruitNoticeQuery(setInputValue);
    const saveRecruitNoticeMutation = useSaveRecruitNoticeMutation(inputValue);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;

        try {
            // 저장하기
            if (target.name === 'save') {
                saveRecruitNoticeMutation.mutate();
            }
            // 미리보기
        } catch (error) {
            console.error('저장하기 실패', error);
        }
    };

    return (
        <>
            <div className="flex flex-col">
                <AdminSection className="min-h-[719px] mb-[15px]">
                    <h2 className="w-full mb-5 text-subtitle-02 font-semibold text-black">
                        모집안내 글 작성
                    </h2>

                    <div className="flex flex-col gap-5">
                        {recruitNoticeList.map((recruitNotice, index) => (
                            <div
                                key={`club-intro-${index}`}
                                className="flex flex-col gap-[10px]"
                            >
                                <AdminSectionLabel>
                                    {recruitNotice.label}
                                </AdminSectionLabel>
                                <TextArea
                                    size="large"
                                    backgroundColor="gray"
                                    placeholder={
                                        isPending
                                            ? ''
                                            : recruitNotice.placeholder
                                    }
                                    maxLength={500}
                                    name={recruitNotice.name}
                                    value={
                                        inputValue[
                                            recruitNotice.name as keyof IRecruitNoticeValue
                                        ]
                                    }
                                    onChange={(e) =>
                                        inputChangeHandler<IRecruitNoticeValue>(
                                            {
                                                e,
                                                setInputValue,
                                            },
                                        )
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

                <AdminButtonGroup>
                    {/* <Button
                        name="preview"
                        type="button"
                        size="small"
                        variant="outlined"
                        isDisabled={() => false}
                        onClick={handleSubmit}
                    >
                        미리보기
                    </Button> */}
                    <Button
                        name="save"
                        type="button"
                        size="small"
                        isDisabled={() => false}
                        onClick={handleSubmit}
                    >
                        저장하기
                    </Button>
                </AdminButtonGroup>
            </div>

            {/* 로딩 모달 */}
            <LoadingModal
                isPending={saveRecruitNoticeMutation.isPending}
                isSuccess={saveRecruitNoticeMutation.isSuccess}
            />
        </>
    );
}
