import styled from 'styled-components';
import { InnerWrapper, Label, Content } from '@/styles/registration-form';
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
        <Container>
            <InnerContainer>
                <ButtonWrapper>{button}</ButtonWrapper>

                <ContentWrapper>
                    <InnerWrapper>
                        <Label>동아리 이름</Label>
                        <Content>{data.clubName}</Content>
                    </InnerWrapper>
                    <InnerWrapper>
                        <Label>대표자 이메일</Label>
                        <Content>{data.leaderEmail}</Content>
                    </InnerWrapper>

                    {/* --- 동아리 카테고리 --- */}
                    {categoryFields.map(
                        (field) =>
                            field.value && (
                                <InnerWrapper>
                                    <Label>{field.label}</Label>
                                    <Content>{field.value}</Content>
                                </InnerWrapper>
                            ),
                    )}

                    <InnerWrapper>
                        <Label>동아리 사진</Label>
                        <ImageContent>
                            <img
                                src="/placeholder-image.svg"
                                alt="placeholder-logo-image"
                            />
                            <button>클릭해서 크게 보기</button>
                        </ImageContent>
                    </InnerWrapper>
                    <InnerWrapper>
                        <Label>동아리 한 줄 소개</Label>
                        <Content>{data.oneLiner}</Content>
                    </InnerWrapper>
                    <InnerWrapper>
                        <Label>동아리 간단소개</Label>
                        <Content>{data.briefIntroduction}</Content>
                    </InnerWrapper>
                </ContentWrapper>
            </InnerContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 39px;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 320px;
    padding-top: 20px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    width: 100%;
    margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const ImageContent = styled(Content)`
    display: flex;
    gap: 20px;
    padding: 10px;

    button {
        font-size: 14px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.mainGray};
    }
`;
