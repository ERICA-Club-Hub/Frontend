import { TopNavigator } from '@/components/Common';
import { clubDetailRegisterNavigations } from '@/constants';
import { useState } from 'react';
import styled from 'styled-components';
import SummaryInfo from './SummaryInfo';

const AdminClubDetailPage = () => {
    const [navStatus, setNavStatus] = useState<number>(1);

    return (
        <Container>
            <TopNavigatorWrapper>
                <TopNavigator
                    navStatus={navStatus}
                    navList={clubDetailRegisterNavigations}
                    onClick={(id: number) => setNavStatus(id)}
                />
            </TopNavigatorWrapper>

            {navStatus === 1 && <SummaryInfo />}
        </Container>
    );
};

export { AdminClubDetailPage };

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TopNavigatorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 55px;
    margin-bottom: 15px;
    background-color: ${({ theme }) => theme.colors.white};
`;
