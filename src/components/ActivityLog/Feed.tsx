import styled from 'styled-components';
import { IActivitiesLog } from '@/types';
import ErrorIcon from '@/assets/common/error-icon.svg?react';

function Feed({ data }: { data: IActivitiesLog[] }) {
    return (
        <Container>
            {data.length > 0 ? (
                <FeedListWrapper>
                    <p>활동</p>
                </FeedListWrapper>
            ) : (
                <EmyptyWrapper>
                    <ErrorIcon width={30} height={30} />
                    <ErrorText>활동로그가 비어있어요.</ErrorText>
                </EmyptyWrapper>
            )}
        </Container>
    );
}

export { Feed };

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 318px;
    padding: 10px;
`;

const FeedListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 6px;
    row-gap: 7px;
`;

const EmyptyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 318px;
    height: 115px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
`;

const ErrorText = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.mainBlack};
`;
