import { TopNavigator } from '@/components/Common';
import { loginNavigations } from '@/constants';
import { navState } from '@/store/navAtom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const AdminLoginPage = () => {
    const selectedNav = useRecoilValue(navState);

    return (
        <Container>
            <TopNavigator navList={loginNavigations} />
            <p>Selected Nav ID: {selectedNav}</p>
        </Container>
    );
};

export { AdminLoginPage };

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 162px;
`;
