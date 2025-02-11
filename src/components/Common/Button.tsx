import styled, { css } from 'styled-components';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';

export type VaraintType = 'filled' | 'outlined';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    size?: ButtonSize;
    varaint?: VaraintType;
    isDisabled?: () => boolean;
    handleClick?: () => void;
}

interface StyledButtonProps {
    size: ButtonSize;
    varaint: VaraintType;
    disabled: boolean;
}

const getButtonSize = (size: ButtonSize) => {
    switch (size) {
        case 'small':
            return css`
                height: 35px;
                width: 90px;
                padding: 14px 14px;
                font-size: 14px;
            `;
        case 'large':
            return css`
                height: 45px;
                width: 320px;
                padding: 14px 14px;
                font-size: 14px;
            `;
        default:
            return css`
                width: 141px;
                height: 35px;
                padding: 14px 14px;
                font-size: 14px;
            `;
    }
};

/**
 *
 * @param children 컴포넌트 안에 들어갈 내용
 * @param size 버튼 크기(small, large, medium 중 하나)
 * @param varaint 버튼 스타일 (filled, outlined 중 하나)
 * @param isDisabled 활성화 / 비활성화 시킬 함수(boolean return)
 * @param handleClick onClick시 작동할 이벤트를 담은 함수
 * @returns
 */

const Button = ({
    children,
    size = 'medium',
    varaint = 'filled',
    isDisabled = () => true,
    handleClick,
    ...props
}: ButtonProps) => {
    return (
        <StyledButton
            size={size}
            varaint={varaint}
            disabled={isDisabled()}
            onClick={handleClick}
            {...props}
        >
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.button<StyledButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-weight: 600;
    background-color: ${({ varaint, theme }) =>
        varaint === 'outlined' ? theme.colors.white : theme.colors.mainBlue};
    color: ${({ varaint, theme }) =>
        varaint === 'outlined' ? theme.colors.mainBlue : theme.colors.white};
    border: ${({ varaint, theme }) =>
        varaint === 'outlined' ? `1px solid ${theme.colors.mainBlue}` : 'none'};
    cursor: pointer;
    transition: all 0.2s ease;
    gap: 10px;
    line-height: 16.8;

    ${({ size }) => getButtonSize(size)}

    &:hover:not(:disabled) {
        background-color: #0056b3;
    }

    &:active:not(:disabled) {
        transform: scale(0.98);
    }

    &:disabled {
        border: none;
        background-color: #989898;
        color: ${({ theme }) => theme.colors.white};
        cursor: not-allowed;
    }
`;

export default Button;
