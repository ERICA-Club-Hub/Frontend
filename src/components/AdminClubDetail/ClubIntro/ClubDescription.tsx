import { apiRequest } from '@/api/apiRequest';
import { TextArea } from '@/components/Common/TextArea';
import { clubIntroList } from '@/constants/club-detail-register';
import useBulletPointConverter from '@/hooks/actions/useBulletPointConverter';
import useClubIntroContext from '@/hooks/contexts/useClubIntroContext';
import { clubIdSelector } from '@/store/clubInfoState';
import { Label, SectionWrapper } from '@/styles/admin-club-detail/style';
import { IClubIntroValue } from '@/types';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function ClubDescription() {
    const clubId = useRecoilValue(clubIdSelector);
    const { inputValue, setInputValue } = useClubIntroContext();
    const { isSuccess, data, isError } = useQuery({
        queryKey: [clubId, 'clubDescription'],
        queryFn: async () => {
            return await apiRequest({
                url: `/api/clubs/${clubId}/introduction`,
                method: 'GET',
                requireToken: true,
            });
        },
        // 데이터 구조 변경
        select: (data) => ({
            introduction: data.result.introduction,
            activity: data.result.activity,
            recruitment: data.result.recruitment,
        }),
        staleTime: 5 * 60 * 1000, // 5분
    });

    // 무한 렌더링 노션 기록
    // if (isSuccess) {
    //     setInputValue({
    //         introduction: data.result.introduction,
    //         activity: data.result.activity,
    //         recruitment: data.result.recruitment,
    //     });
    // }

    useEffect(() => {
        // 무한 렌더링 방지
        if (isSuccess && data) {
            setInputValue(data);
        }

        if (isError) {
            console.error('동아리 소개글 불러오기 실패');
        }
    }, [isSuccess, data]);

    return (
        <ClubIntroFormContainer>
            <h2>동아리 소개글 작성</h2>

            <ClubIntroFormList>
                {clubIntroList.map((clubIntro, index) => (
                    <ClubIntroForm key={`club-intro-${index}`}>
                        <Label>{clubIntro.label}</Label>
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
                    </ClubIntroForm>
                ))}
            </ClubIntroFormList>
        </ClubIntroFormContainer>
    );
}

export { ClubDescription };

const ClubIntroFormContainer = styled(SectionWrapper)`
    min-height: 719px;
    margin-bottom: 5px;

    h2 {
        width: 100%;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.mainBlack};
    }
`;

const ClubIntroFormList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ClubIntroForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
