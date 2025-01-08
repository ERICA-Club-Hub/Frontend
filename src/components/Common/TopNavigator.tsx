import { navState } from '@/store/navAtom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

export const TopNavigator = ({
    navList,
}: {
    navList: { id: number; nav: string }[];
}) => {
    const [navStatus, setNavStatus] = useRecoilState(navState);

    return (
        <Container>
            <NavList>
                {navList.map((nav) => (
                    <Nav
                        key={`nav-list-${nav.id}`}
                        onClick={() => setNavStatus(nav.id)}
                    >
                        <Label>
                            {nav.nav}
                            <ActiveBar
                                $isActive={navStatus === nav.id}
                                $isAuth={navList[0].nav.includes('로그인')}
                            />
                        </Label>
                    </Nav>
                ))}
            </NavList>
        </Container>
    );
};

const Container = styled.div`
    width: 320px;
    border-bottom: 1px solid #eaeaea;
`;

const NavList = styled.ul`
    display: flex;
    justify-content: space-around;
`;

const Nav = styled.li`
    cursor: pointer;
`;

const Label = styled.h2`
    position: relative;
    height: 27px;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.black};
`;

const ActiveBar = styled.div<{ $isAuth: boolean; $isActive: boolean }>`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${(props) => (props.$isAuth ? '104px' : '64px')};
    height: 3px;
    background-color: ${(props) => props.theme.colors.mainBlue};
    opacity: ${(props) => (props.$isActive ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
`;
