import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import Spinner from '../Loading/Spinner';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-[10px] text-center transition-colors duration-200 ease-in ' +
        'disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:bg-neutral-200 disabled:text-neutral-400 ',
    {
        variants: {
            variant: {
                primary: 'bg-primary-600 text-neutral-50 hover:bg-primary-700',
                neutral:
                    'bg-neutral-50 text-neutral-600 border border-neutral-100 hover:bg-neutral-100',
                negative:
                    'bg-neutral-50 text-sub-warning border border-sub-warning hover:bg-sub-light-red',
            },
            size: {
                lg: 'h-[45px] w-[320px] px-3 py-3 rounded-xl text-b3',
                md: 'h-[40px] w-[296px] px-3 py-2 rounded-lg text-b3',
                sm: 'h-[37px] w-[144px] px-3 py-2 rounded-lg text-b3',
                xs: 'h-[37px] w-[88px] px-3 py-2 rounded-lg text-b4',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    children: ReactNode;
    isLoading?: boolean;
}

/**
 * CTA Button Component
 *
 * Figma 디자인 시스템을 따르는 버튼 컴포넌트입니다.
 *
 * @param variant - 버튼 스타일: 'primary' (기본, primary-600 배경), 'neutral' (중립, 회색 테두리), 'negative' (경고, 빨간색)
 * @param size - 버튼 크기: 'lg' (320px), 'md' (296px), 'sm' (144px), 'xs' (88px)
 * @param children - 버튼 내부 텍스트 또는 요소
 * @param className - 추가 CSS 클래스
 * @param disabled - 비활성화 상태
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">버튼 텍스트</Button>
 * <Button variant="neutral" size="md" onClick={handleClick}>취소</Button>
 * <Button variant="negative" size="xs" disabled>삭제</Button>
 * ```
 */
const Button = ({
    children,
    className,
    variant,
    size,
    disabled,
    type = 'button',
    isLoading = false,
    ...props
}: ButtonProps) => {
    const isDisabled = disabled || isLoading;

    return (
        <button
            type={type}
            className={cn(
                buttonVariants({ variant, size }),
                isLoading &&
                    'disabled:text-neutral-50 disabled:bg-neutral-500 disabled:cursor-not-allowed',
                className,
            )}
            disabled={isDisabled}
            aria-live="polite"
            aria-disabled={disabled}
            {...props}
        >
            {isLoading && <Spinner />}

            {/* 사이즈 'xs' 'sm': 로딩 중에 텍스트를 숨기고 스피너만 렌더링 */}
            {(size === 'xs' || size === 'sm') && isLoading ? null : children}
        </button>
    );
};

export default Button;
