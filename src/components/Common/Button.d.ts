import { ButtonHTMLAttributes, ReactNode } from 'react';
export type ButtonSize = 'small' | 'medium' | 'large';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    size?: ButtonSize;
    isDisabled?: () => boolean;
    handleClick?: () => void;
}
/**
 *
 * @param children 컴포넌트 안에 들어갈 내용
 * @param size 버튼 크기(small, large, medium 중 하나)
 * @param isDisabled 활성화 / 비활성화 시킬 함수(boolean return)
 * @param handleClick onClick시 작동할 이벤트를 담은 함수
 * @returns
 */
declare const Button: ({ children, size, isDisabled, handleClick, ...props }: ButtonProps) => JSX.Element;
export default Button;
