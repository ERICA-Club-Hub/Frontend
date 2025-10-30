import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { NavigationLink } from '@/components/Common';
import { getClubAdminMenus } from '@/routes/paths';
import { clubIdSelector, clubNameSelector } from '@/store/clubInfoState';

const AdminClubPage = () => {
    const clubId = useRecoilValue(clubIdSelector);
    const clubName = useRecoilValue(clubNameSelector);
    const menus = clubId !== null ? getClubAdminMenus(clubId) : [];

    return (
        <Container>
            <Wrapper>
                <h1>{clubName}님, 환영해요.</h1>

                <NavigationWrapper>
                    {menus.map((menu) => (
                        <NavigationLink
                            key={menu.label}
                            size="large"
                            url={menu.url}
                        >
                            {menu.label}
                        </NavigationLink>
                    ))}
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
