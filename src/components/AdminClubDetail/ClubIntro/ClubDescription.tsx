import { TextArea } from '@/components/Common/TextArea';
import { clubIntroList } from '@/constants/club-detail-register.constant';
import useBulletPointConverter from '@/hooks/actions/useBulletPointConverter';
import useClubIntroContext from '@/hooks/contexts/useClubIntroContext';
import useClubAdminQueries from '@/hooks/queries/useClubAdminQueries';
import { Label, SectionWrapper } from '@/styles/admin-club-detail/style';
import { IClubIntroValue } from '@/types';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import styled from 'styled-components';

function ClubDescription() {
    const { inputValue, setInputValue } = useClubIntroContext();

    // 데이터 fetch
    const { useClubDescriptionQuery } = useClubAdminQueries();
    useClubDescriptionQuery(setInputValue);

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
