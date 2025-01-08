import { useState } from 'react';
import styled from 'styled-components';

interface NavItem {
    id: number;
    nav: string;
}

export const TopNavigator = ({ navList }: { navList: NavItem[] }) => {
    const [navStatus, setNavStatus] = useState<number>(1);

    return (
        <Container>
            <NavList>
                {navList.map((nav) => (
                    <Nav
                        key={`nav-list-${nav.id}`}
                        onClick={() => setNavStatus(nav.id)}
                    >
                        <Label $isActive={navStatus === nav.id}>
                            {nav.nav}
                        </Label>
                    </Nav>
                ))}
            </NavList>
        </Container>
    );
};

const Container = styled.div`
    width: 320px;
    height: 27px;
    border-bottom: 1px solid #eaeaea;
`;

const NavList = styled.ul`
    display: flex;
    justify-content: space-around;
`;

const Nav = styled.li`
    height: 27px;
    cursor: pointer;
`;

const Label = styled.h2<{ $isActive: boolean }>`
    height: 27px;
    border-bottom: 3px solid
        ${(props) => (props.$isActive ? props.theme.colors.mainBlue : 'none')};
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.black};
    transition: border-bottom 0.2s ease-in-out;
`;
