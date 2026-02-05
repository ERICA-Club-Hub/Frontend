import { cn } from '@/utils/cn';
import { ComponentProps, forwardRef } from 'react';

type TextAreaProps = ComponentProps<'textarea'>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    'w-[320px] min-h-[45px] p-[12px] rounded-[8px] border-[0.6px] border-solid border-neutral-100 text-b4 text-text-main bg-neutral-100 transition-all duration-300 ease-in',
                    'field-sizing-content resize-none',
                    'placeholder:text-b4 placeholder:text-neutral-400 outline-none focus:bg-neutral-00 focus:border-[0.6px] focus:border-solid focus:border-neutral-150',
                    '[&:not(:placeholder-shown)]:bg-neutral-00 [&:not(:placeholder-shown)]:border-neutral-150',
                    className,
                )}
                {...props}
            />
        );
    },
);

export default TextArea;
