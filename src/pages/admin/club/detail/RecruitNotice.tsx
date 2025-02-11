import Button from '@/components/Common/Button';
import { TextArea } from '@/components/Common/TextArea';
import { recruitNoticeList } from '@/constants/club-detail-register';
import {
    ButtonGroupWrapper,
    Label,
    SectionWrapper,
} from '@/styles/admin-club-detail/style';
import styled from 'styled-components';

export default function RecruitNotice() {
    return (
        <Container>
            <RecruitNoticeContainer>
                <h2>모집안내 글 작성</h2>

                <RecruitNoticeFormList>
                    {recruitNoticeList.map((recruitNotice, index) => (
                        <RecruitNoticeForm key={`club-intro-${index}`}>
                            <Label>{recruitNotice.label}</Label>
                            <TextArea
                                size="large"
                                backgroundColor="gray"
                                placeholder={recruitNotice.placeholder}
                            />
                        </RecruitNoticeForm>
                    ))}
                </RecruitNoticeFormList>
            </RecruitNoticeContainer>

            <ButtonGroupWrapper>
                <Button
                    size="small"
                    varaint="outlined"
                    isDisabled={() => false}
                >
                    미리보기
                </Button>
                <Button size="small" isDisabled={() => false}>
                    저장하기
                </Button>
            </ButtonGroupWrapper>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const RecruitNoticeContainer = styled(SectionWrapper)`
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
