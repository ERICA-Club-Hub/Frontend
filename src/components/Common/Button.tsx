import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

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

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-[10px] font-semibold cursor-pointer transition-all duration-200 ease-in-out gap-[10px] leading-[1.2] active:scale-[0.98] disabled:border-0 disabled:bg-[#989898] disabled:text-white disabled:cursor-not-allowed',
    {
        variants: {
            size: {
                small: 'h-[35px] w-[90px] px-[14px] py-[14px] text-body-03',
                medium: 'w-[141px] h-[35px] px-[14px] py-[14px] text-body-03',
                large: 'h-[45px] w-[320px] px-[14px] py-[14px] text-body-03',
            },
            variant: {
                filled: 'bg-primary-500 text-white border-0',
                outlined: 'bg-white text-primary-500 border border-primary-500',
            },
        },
        defaultVariants: {
            size: 'medium',
            variant: 'filled',
        },
    }
);

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
    isDisabled = () => false,
    handleClick,
    outlineColor,
    ...props
}: ButtonProps) => {
    const dynamicStyles =
        variant === 'outlined' && outlineColor
            ? { borderColor: outlineColor, color: outlineColor }
            : {};

    return (
        <button
            className={cn(buttonVariants({ size, variant }))}
            onClick={handleClick}
            disabled={isDisabled()}
            style={dynamicStyles}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
