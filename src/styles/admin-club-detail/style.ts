import styled from 'styled-components';

const SectionWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 320px;
    padding: 0 20px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
`;

const Label = styled.h3`
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainBlack};
`;

export { SectionWrapper, Label };
