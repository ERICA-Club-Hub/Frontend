import { NavigationLink } from '@/components/Common';
import { serviceAdminMenus } from '@/routes/paths';
import styled from 'styled-components';

export default function ServiceAdminPage() {
    return (
        <Container>
            {serviceAdminMenus.map((menu) => (
                <NavigationLink key={menu.label} size="large" url={menu.url}>
                    {menu.label}
                </NavigationLink>
            ))}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding-top: 22px;
`;
