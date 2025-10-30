import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NavigateArrow from '@/assets/common/navigate-arrow.svg?react';

// large: 320 x 45  - 어드민 대시보드에서 사용
// small: 288 x 17  - AppHeader의 NavigationDrawer에서 사용

type Size = 'large' | 'small';

interface NavigationLinkProps {
    children: React.ReactNode;
    url: string;
    size?: Size;
}

const NavigationLink = ({
    children,
    url,
    size = 'small',
}: NavigationLinkProps) => {
    return (
        <StyledLink to={url} size={size}>
            {children}
            <NavigateArrow
                width={size === 'large' ? '24px' : '15px'}
                height={size === 'large' ? '24px' : '15px'}
            />
        </StyledLink>
    );
};

export { NavigationLink };

const StyledLink = styled(Link)<{ size: Size }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${({ size }) =>
        size === 'large'
            ? `
                width: 320px;
                height: 45px;
                padding: 14px 11px 14px 17px;
                border-radius: 10px;
                color: #232323;
            `
            : `
                width: 288px;
                height: 17px;
                color: #000;
            `}

    background-color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
`;
