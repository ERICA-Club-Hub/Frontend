import { ArrowLinkButton } from '@/components/Common';
import styled from 'styled-components';

const AdminClubPage = () => {
    return (
        <Container>
            <Wrapper>
                <h1>UMC ERICA님, 환영해요.</h1>

                <NavigationWrapper>
                    <ArrowLinkButton size="large" url="/admin/club/:id">
                        동아리 상세페이지 설정하기
                    </ArrowLinkButton>
                    <ArrowLinkButton size="large" url="/admin/club/activity">
                        활동로그 작성하기
                    </ArrowLinkButton>
                    <ArrowLinkButton size="large" url="/admin/modify">
                        동아리 등록 정보 수정하기
                    </ArrowLinkButton>
                </NavigationWrapper>
            </Wrapper>
        </Container>
    );
};

export { AdminClubPage };

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 50px;

    h1 {
        width: 100%;
        font-size: 16px;
        font-weight: 600;
        color: ${(props) => props.theme.colors.mainBlack};
    }
`;

const NavigationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;
