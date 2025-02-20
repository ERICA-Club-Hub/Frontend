import styled, { css } from 'styled-components';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';

export type VariantType = 'filled' | 'outlined';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    size?: ButtonSize;
    variant?: VariantType;
    isDisabled?: () => boolean;
    handleClick?: () => void;
    outlineColor?: string;
}

interface StyledButtonProps {
    size: ButtonSize;
    variant: VariantType;
    disabled: boolean;
    outlineColor?: string;
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
 * @param variant 버튼 스타일 (filled, outlined 중 하나)
 * @param isDisabled 활성화 / 비활성화 시킬 함수(boolean return)
 * @param handleClick onClick시 작동할 이벤트를 담은 함수
 * @param outlineColor variant = 'outlined'일 때 색상 지정
 * @returns
 */

const Button = ({
    children,
    size = 'medium',
    variant = 'filled',
    isDisabled = () => true,
    handleClick,
    outlineColor,
    ...props
}: ButtonProps) => {
    return (
        <StyledButton
            size={size}
            variant={variant}
            disabled={isDisabled()}
            onClick={handleClick}
            outlineColor={outlineColor}
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
    background-color: ${({ variant, theme }) =>
        variant === 'outlined' ? theme.colors.white : theme.colors.mainBlue};
    color: ${({ variant, theme, outlineColor }) =>
        variant === 'outlined'
            ? outlineColor || theme.colors.mainBlue
            : theme.colors.white};
    border: ${({ variant, theme, outlineColor }) =>
        variant === 'outlined'
            ? `1px solid ${outlineColor || theme.colors.mainBlue}`
            : 'none'};
    cursor: pointer;
    transition: all 0.2s ease;
    gap: 10px;
    line-height: 16.8;

    ${({ size }) => getButtonSize(size)}

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
