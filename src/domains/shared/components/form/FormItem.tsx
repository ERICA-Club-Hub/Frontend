import { PropsWithChildren } from 'react';

interface FormItemProps {
    label: string;
    id: string;
    required?: boolean;
    hintText?: string;
}

export default function FormItem({
    label,
    id,
    required = false,
    hintText,
    children,
}: PropsWithChildren<FormItemProps>) {
    return (
        <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-[4px]">
                <div>
                    <label htmlFor={id} className="tex-b3">
                        {label}
                    </label>
                    {required && <span className="text-sub-warning"> *</span>}
                </div>
                {hintText && <p>{hintText}</p>}
            </div>

            {children}
        </div>
    );
}
