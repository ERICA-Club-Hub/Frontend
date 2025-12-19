import { PropsWithChildren } from 'react';

interface ContentBlockProps extends PropsWithChildren {
    hasTitle?: boolean;
    title?: string;
    content?: string;
}

export default function ContentBlock({
    hasTitle = true,
    title,
    content,
    children,
}: ContentBlockProps) {
    return (
        <div className="bg-white rounded-[10px] p-5 w-[328px] mb-[7px]">
            {hasTitle && (
                <div className="-mt-[5px] mb-[15px] text-body-01 font-semibold">
                    {title}
                </div>
            )}
            {children}
            {content && (
                <div className="w-[278px] mb-[25px]">
                    <span className="whitespace-pre-line text-body-03 text-gray-600">
                        {content === '' ? `${title} 내용이 비었어요.` : content}
                    </span>
                </div>
            )}
        </div>
    );
}
