import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

type Size = 'small' | 'medium' | 'large';
type BackgroundColor = 'white' | 'gray';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inputSize: Size;
    backgroundColor?: BackgroundColor;
    isError?: boolean;
}

const inputVariants = cva(
    'z-[1] rounded-[10px] text-body-03 font-normal text-[#232323]',
    {
        variants: {
            inputSize: {
                small: 'w-[225px] h-[40px] px-[15px] py-[11.5px]',
                medium: 'w-[280px] h-[40px] px-[15px] py-[11px]',
                large: 'w-[320px] h-[45px] px-[17px] py-[14px]',
            },
            backgroundColor: {
                white: 'bg-white',
                gray: 'bg-neutral-100',
            },
            isError: {
                true: 'border border-[#DC5151]',
                false: 'border-0',
            },
        },
        defaultVariants: {
            inputSize: 'medium',
            backgroundColor: 'white',
            isError: false,
        },
    },
);

/**
 * InputField 컴포넌트는 사용자 정의 가능한 크기와 배경색을 가진 스타일된 입력 필드를 렌더링합니다.
 *
 * @param {Size} [inputSize = 'medium'] - 입력 필드의 크기. 'small', 'medium', 'large' 중 하나 입력 가능
 * @param {BackgroundColor} [backgroundColor='white'] - 입력 필드의 배경색. 'white' 또는 'gray' 중 하나
 * @param {boolean} [isError=false] - 에러 상태. true일 경우 빨간 테두리 표시
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - 입력 요소에 전달할 추가 속성
 *
 * @returns {JSX.Element} 스타일된 입력 필드 컴포넌트
 */

const InputField = ({
    inputSize = 'medium',
    backgroundColor = 'white',
    isError = false,
    ...props
}: InputFieldProps) => {
    return (
        <input
            className={cn(
                inputVariants({ inputSize, backgroundColor, isError }),
                'placeholder:text-body-03 placeholder:font-medium placeholder:text-neutral-400',
            )}
            {...props}
        />
    );
};

export { InputField };
