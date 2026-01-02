import {
    RegistrationInnerWrapper,
    RegistrationLabel,
    RegistrationContent,
} from '@/components/Common';
import { ClubRegistrationDTOList } from '@/types/club.types';

interface ClubDetailLayoutProps {
    button: React.ReactNode; // CTA 버튼 렌더링
    data: ClubRegistrationDTOList; // 동아리 상세 정보
}

export default function ClubDetailLayout({
    data,
    button,
}: ClubDetailLayoutProps) {
    const categoryFields = [
        { label: '동아리 분류', value: data.category.clubCategoryName },
        { label: '동아리 분과', value: data.category.centralCategoryName },
        { label: '연합 동아리 분류', value: data.category.unionCategoryName },
        { label: '단과대', value: data.category.collegeName },
        { label: '학과', value: data.category.departmentName },
    ];

    return (
        <div className="flex flex-col items-center pb-[39px]">
            <div className="flex flex-col items-end w-[320px] pt-5">
                <div className="flex justify-end gap-[5px] w-full mb-5">
                    {button}
                </div>

                <div className="flex flex-col items-center gap-5">
                    <RegistrationInnerWrapper>
                        <RegistrationLabel>동아리 이름</RegistrationLabel>
                        <RegistrationContent>
                            {data.clubName}
                        </RegistrationContent>
                    </RegistrationInnerWrapper>
                    <RegistrationInnerWrapper>
                        <RegistrationLabel>대표자 이메일</RegistrationLabel>
                        <RegistrationContent>
                            {data.leaderEmail}
                        </RegistrationContent>
                    </RegistrationInnerWrapper>

                    {/* --- 동아리 카테고리 --- */}
                    {categoryFields.map(
                        (field) =>
                            field.value && (
                                <RegistrationInnerWrapper>
                                    <RegistrationLabel>
                                        {field.label}
                                    </RegistrationLabel>
                                    <RegistrationContent>
                                        {field.value}
                                    </RegistrationContent>
                                </RegistrationInnerWrapper>
                            ),
                    )}

                    <RegistrationInnerWrapper>
                        <RegistrationLabel>동아리 사진</RegistrationLabel>
                        <div className="flex gap-5 p-[10px]">
                            <img
                                src="/placeholder-image.svg"
                                alt="placeholder-logo-image"
                            />
                            <button className="text-body-03 font-normal text-neutral-500">
                                클릭해서 크게 보기
                            </button>
                        </div>
                    </RegistrationInnerWrapper>
                    <RegistrationInnerWrapper>
                        <RegistrationLabel>동아리 한 줄 소개</RegistrationLabel>
                        <RegistrationContent>
                            {data.oneLiner}
                        </RegistrationContent>
                    </RegistrationInnerWrapper>
                    <RegistrationInnerWrapper>
                        <RegistrationLabel>동아리 간단소개</RegistrationLabel>
                        <RegistrationContent>
                            {data.briefIntroduction}
                        </RegistrationContent>
                    </RegistrationInnerWrapper>
                </div>
            </div>
        </div>
    );
}
