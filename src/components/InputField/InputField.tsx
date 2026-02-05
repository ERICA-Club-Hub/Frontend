import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { ComponentProps, forwardRef } from 'react';

interface InputFieldProps extends Omit<ComponentProps<'input'>, 'size'> {
    size?: 'md' | 'lg';
    inputType?: 'default' | 'search' | 'date';
    isError?: boolean;
    errorMessage?: string;
    hintText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    className?: string;
    iconClickHandler?: () => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            size = 'lg',
            inputType = 'default',
            isError = false,
            errorMessage,
            hintText,
            leftIcon,
            rightIcon,
            className,
            iconClickHandler,
            ...props
        },
        ref,
    ) => {
        return (
            <div className={cn('relative flex flex-col gap-[6px]')}>
                {leftIcon && (
                    <button
                        type="button"
                        className={cn(
                            'absolute top-1/2 left-[20px] -translate-y-1/2',
                        )}
                    >
                        {leftIcon}
                    </button>
                )}

                <input
                    ref={ref}
                    className={cn(
                        inputVariants({ size, inputType, isError }),
                        className,
                    )}
                    {...props}
                />

                {isError && errorMessage && (
                    <p className={cn('text-c1 text-text-error')}>
                        {errorMessage}
                    </p>
                )}
                {!isError && hintText && (
                    <p className={cn('text-c1 text-text-hint')}>{hintText}</p>
                )}

                {rightIcon && (
                    <button
                        type="button"
                        className={cn(
                            'absolute top-1/2 right-[12px] -translate-y-1/2',
                        )}
                        onClick={iconClickHandler}
                    >
                        {rightIcon}
                    </button>
                )}
            </div>
        );
    },
);

const inputVariants = cva(
    'w-full p-[12px] rounded-[8px] border-[0.6px] border-solid border-neutral-100 text-b4 text-text-main bg-neutral-100 transition-all duration-300 ease-in-out ' +
        'placeholder:text-b4 placeholder:text-neutral-400 outline-none focus:bg-neutral-00 focus:border-[0.6px] focus:border-solid focus:border-neutral-150 ' +
        '[&:not(:placeholder-shown)]:bg-neutral-00 [&:not(:placeholder-shown)]:border-neutral-150',
    {
        variants: {
            size: {
                md: 'w-[284px] h-[45px]',
                lg: 'w-[320px] h-[45px]',
            },
            inputType: {
                default: '',
                search: 'pl-[54px] border-none bg-neutral-00 focus:border-none',
                date: 'w-[252px] h-[46px] py-[12.5px] pr-[44px] pl-[12px]',
            },
            isError: {
                true: 'border-text-error focus:border-text-error',
                false: '',
            },
        },
        defaultVariants: {
            size: 'lg',
            inputType: 'default',
            isError: false,
        },
    },
);

export default InputField;
