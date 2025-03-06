import { ArrowLinkButton } from '@/components/Common';
import { clubIdSelector, clubNameSelector } from '@/store/clubInfoState';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const AdminClubPage = () => {
    const clubId = useRecoilValue(clubIdSelector);
    const clubName = useRecoilValue(clubNameSelector);

    return (
        <Container>
            <Wrapper>
                <h1>{clubName}님, 환영해요.</h1>

                <NavigationWrapper>
                    <ArrowLinkButton
                        size="large"
                        url={`/admin/club/${clubId}/summary-info`}
                    >
                        동아리 상세페이지 설정하기
                    </ArrowLinkButton>
                    <ArrowLinkButton size="large" url="/admin/club/activity">
                        활동로그 작성하기
                    </ArrowLinkButton>
                    <ArrowLinkButton
                        size="large"
                        url={`/admin/club/${clubId}/register/edit`}
                    >
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
