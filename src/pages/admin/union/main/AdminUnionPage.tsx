import { ArrowLinkButton } from '@/components/Common';
import styled from 'styled-components';

const AdminUnionPage = () => {
    return (
        <Container>
            <Wrapper>
                <h1>총동아리연합회님, 환영해요.</h1>

                <NavigationWrapper>
                    <ArrowLinkButton size="large" url="/admin/union/notice">
                        총동연 공지사항 등록하기
                    </ArrowLinkButton>
                    <ArrowLinkButton size="large" url="/admin/union/resources">
                        자료 등록하기
                    </ArrowLinkButton>
                </NavigationWrapper>
            </Wrapper>
        </Container>
    );
};

export { AdminUnionPage };

const Container = styled.div`
    width: 100%;
    height: 100%;
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
