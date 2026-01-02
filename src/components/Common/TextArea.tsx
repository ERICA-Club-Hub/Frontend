import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

type Size = 'small' | 'medium' | 'large';
type BackgroundColor = 'white' | 'gray';

interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    size: Size;
    backgroundColor?: BackgroundColor;
}

const textAreaVariants = cva(
    'text-caption font-medium leading-[18px] text-[#232323] resize-none',
    {
        variants: {
            size: {
                small: 'w-[230px] h-[120px] p-[10px] rounded-[5px]',
                medium: 'w-[320px] h-[100px] px-[17px] py-[14px] rounded-[10px]',
                large: 'w-[280px] h-[170px] p-[15px] rounded-[10px]',
            },
            backgroundColor: {
                white: 'bg-white',
                gray: 'bg-neutral-100',
            },
        },
        defaultVariants: {
            size: 'large',
            backgroundColor: 'white',
        },
    }
);

/**
 * TextArea 컴포넌트는 사용자 정의 가능한 크기와 배경색을 가진 스타일된 텍스트 영역을 렌더링합니다.
 *
 * @param {Size} [size = 'large'] - 텍스트 영역의 크기. 'small', 'medium', 'large' 중 하나 입력 가능
 * @param {BackgroundColor} [backgroundColor='white'] - 텍스트 영역의 배경색. 'white' 또는 'gray' 중 하나
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} props - 텍스트 영역 요소에 전달할 추가 속성
 *
 * @returns {JSX.Element} 스타일된 텍스트 영역 컴포넌트
 */
const TextArea = ({
    size = 'large',
    backgroundColor = 'white',
    ...props
}: TextAreaProps) => {
    return (
        <textarea
            className={cn(
                textAreaVariants({ size, backgroundColor }),
                'placeholder:text-body-03 placeholder:font-normal placeholder:text-neutral-400'
            )}
            {...props}
        />
    );
};

export { TextArea };
