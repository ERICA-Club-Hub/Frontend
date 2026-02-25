import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from '@/assets/common/card_right_arrow.svg?react';
import { cn } from '@/utils/cn';

interface AccordionProps {
    title: string;
    date?: string;
    content: React.ReactNode;
    href?: string;
    defaultOpen?: boolean;
    className?: string;
    /** true일 때 title이 줄임표 없이 아래로 늘어납니다 (기본값: false) */
    wrapTitle?: boolean;
}

/**
 * 아코디언 아이템 카드 컴포넌트
 *
 * - href 있을 때: 텍스트 영역 클릭 → navigate, 아이콘 클릭 → 토글
 * - href 없을 때: 텍스트 영역 클릭 → 토글, 아이콘 클릭 → 토글
 */
const Accordion = ({
    title,
    date,
    content,
    href,
    defaultOpen = false,
    className,
    wrapTitle = false,
}: AccordionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
    const toggle = () => setIsOpen((prev) => !prev);

    const textContent = (
        <>
            <span
                className={cn(
                    'text-b3 text-neutral-900',
                    wrapTitle ? 'break-keep' : 'truncate',
                )}
            >
                {title}
            </span>
            {date !== undefined && date !== '' && (
                <span className="text-c1 text-neutral-600">{date}</span>
            )}
        </>
    );

    return (
        <div className={cn('flex flex-col gap-1', className)}>
            {/* 트리거 헤더 카드 */}
            <div
                className={cn(
                    'flex justify-between w-[320px]',
                    'bg-neutral-00 rounded-lg p-3',
                    wrapTitle ? 'items-start' : 'items-center',
                )}
            >
                {/* 텍스트 영역: href 유무에 따라 Link 또는 button */}
                {href ? (
                    <Link
                        to={href}
                        className="flex flex-col gap-0.5 flex-1 min-w-0"
                    >
                        {textContent}
                    </Link>
                ) : (
                    <button
                        type="button"
                        onClick={toggle}
                        className="flex flex-col gap-0.5 flex-1 min-w-0 text-left"
                    >
                        {textContent}
                    </button>
                )}

                {/* 토글 아이콘 버튼 */}
                <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-label={isOpen ? '접기' : '펼치기'}
                    onClick={toggle}
                    className="shrink-0 ml-2 p-px rounded-full focus-visible:outline-2 focus-visible:outline-primary-500"
                >
                    <ArrowIcon
                        className={cn(
                            'transition-transform duration-300 ease-in-out',
                            isOpen ? 'rotate-90' : 'rotate-0',
                        )}
                    />
                </button>
            </div>

            {/* 콘텐츠 영역 */}
            <div
                role="region"
                aria-label={`${title} 상세 내용`}
                className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-in-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
            >
                <div className="overflow-hidden">
                    <div className="bg-neutral-00 rounded-lg p-3">
                        <div className="text-b4 text-neutral-600">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
