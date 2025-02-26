import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import Button from '@/components/Common/Button';
import { TextArea } from '@/components/Common/TextArea';
import { recruitNoticeList } from '@/constants/club-detail-register';
import {
    ButtonGroupWrapper,
    Label,
    SectionWrapper,
} from '@/styles/admin-club-detail/style';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import { apiRequest } from '@/api/apiRequest';
import { clubIdselector } from '@/store/clubIdState';
import { IRecruitNoticeValue } from '@/types';
import useBulletPointConverter from '@/hooks/useBulletPointConverter';

function RecruitNotice() {
    const clubId = useRecoilValue(clubIdselector);
    const [inputValue, setInputValue] = useState<IRecruitNoticeValue>({
        due: '',
        notice: '',
        etc: '',
    });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;

        try {
            let res;
            // 저장하기
            if (target.name === 'save') {
                res = await apiRequest({
                    url: `/api/clubs/club-admin/${clubId}/recruitment`,
                    method: 'POST',
                    data: inputValue,
                    requireToken: true,
                });
            }
            // 미리보기
            else if (target.name === 'preview') {
                res = await apiRequest({
                    url: `/api/clubs/club-admin/${clubId}/recruitment/draft`,
                    method: 'POST',
                    data: inputValue,
                    requireToken: true,
                });
            }

            console.log(res);
        } catch (error) {
            console.error('저장하기 실패', error);
        }
    };

    return (
        <Container>
            <RecruitNoticeWrapper>
                <h2>모집안내 글 작성</h2>

                <RecruitNoticeFormList>
                    {recruitNoticeList.map((recruitNotice, index) => (
                        <RecruitNoticeForm key={`club-intro-${index}`}>
                            <Label>{recruitNotice.label}</Label>
                            <TextArea
                                name={recruitNotice.name}
                                value={
                                    inputValue[
                                        recruitNotice.name as keyof IRecruitNoticeValue
                                    ]
                                }
                                size="large"
                                backgroundColor="gray"
                                placeholder={recruitNotice.placeholder}
                                maxLength={500}
                                onChange={(e) =>
                                    inputChangeHandler<IRecruitNoticeValue>({
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
                        </RecruitNoticeForm>
                    ))}
                </RecruitNoticeFormList>
            </RecruitNoticeWrapper>

            <ButtonGroupWrapper>
                <Button
                    name="preview"
                    type="button"
                    size="small"
                    variant="outlined"
                    isDisabled={() => false}
                    onClick={handleSubmit}
                >
                    미리보기
                </Button>
                <Button
                    name="save"
                    type="button"
                    size="small"
                    isDisabled={() => false}
                    onClick={handleSubmit}
                >
                    저장하기
                </Button>
            </ButtonGroupWrapper>
        </Container>
    );
}

export { RecruitNotice };

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const RecruitNoticeWrapper = styled(SectionWrapper)`
    min-height: 719px;
    margin-bottom: 15px;

    h2 {
        width: 100%;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.mainBlack};
    }
`;

const RecruitNoticeFormList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const RecruitNoticeForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
