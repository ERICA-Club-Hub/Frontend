import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

/**
 * Tooltip 가시성 CVA 변형 정의
 *
 * Figma 스펙 (node: 1042:11362)
 * - 전체 크기: 158x42px
 * - 배경색: neutral-100 (#eceff3)
 * - 텍스트: 11px / 500 weight / neutral-600 (#587189)
 * - 말풍선 바디 cornerRadius: 6px
 * - 패딩: top/bottom 5px, left/right 9px
 * - 그림자: drop-shadow(0 1px 12px rgba(0,0,0,0.12))
 * - 화살표(Polygon 1): 18x18, cornerRadius 1px, neutral-100
 */
const tooltipVariants = cva('absolute z-50 transition-opacity duration-200', {
    variants: {
        visible: {
            true: 'opacity-100 pointer-events-auto',
            false: 'opacity-0 pointer-events-none',
        },
    },
    defaultVariants: {
        visible: false,
    },
});

/** 화살표(꼭짓점)의 수평 정렬 위치 */
type ArrowAlignment = 'left' | 'center' | 'right';

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
    /** 툴팁에 표시할 메시지 */
    message: string;
    /** 툴팁 표시 여부 (controlled) */
    isVisible: boolean;
    /**
     * 화살표 수평 정렬
     * - 'left': 화살표를 툴팁 왼쪽에 위치
     * - 'center': 화살표를 툴팁 중앙에 위치 (기본값)
     * - 'right': 화살표를 툴팁 오른쪽에 위치
     */
    arrowAlign?: ArrowAlignment;
    /** 추가 CSS 클래스 */
    className?: string;
}

const arrowPositionMap: Record<ArrowAlignment, string> = {
    left: 'left-2',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-2',
};

/**
 * Tooltip 컴포넌트
 *
 * Figma 디자인 시스템 기반의 순수 UI 컴포넌트입니다.
 * 상태 관리는 useTooltip 훅에 위임합니다.
 *
 * 사용 정책:
 * - 알리고자 하는 요소 8px 아래에 출력
 * - isVisible prop으로 표시 여부를 외부에서 제어 (controlled component)
 * - 부모 요소에 `position: relative`가 필요합니다
 *
 * @example
 * ```tsx
 * const { isVisible, triggerRef } = useTooltip();
 *
 * return (
 *   <div className="relative" ref={triggerRef}>
 *     <AlarmIcon />
 *     <Tooltip
 *       isVisible={isVisible}
 *       message="이메일로 모집알림을 받아보세요!"
 *       arrowAlign="right"
 *     />
 *   </div>
 * );
 * ```
 */
const Tooltip = ({
    message,
    isVisible,
    arrowAlign = 'center',
    className,
}: TooltipProps) => {
    return (
        <div
            role="tooltip"
            aria-hidden={!isVisible}
            className={cn(
                tooltipVariants({ visible: isVisible }),
                'top-full mt-4.25',
                className,
            )}
        >
            <div
                aria-hidden="true"
                className={cn(
                    'absolute -top-[9px]',
                    arrowPositionMap[arrowAlign],
                )}
            >
                <div
                    className="w-0 h-0"
                    style={{
                        borderLeft: '9px solid transparent',
                        borderRight: '9px solid transparent',
                        borderBottom: '9px solid var(--color-neutral-100)',
                        filter: 'drop-shadow(0 -1px 2px rgba(0,0,0,0.04))',
                    }}
                />
            </div>

            <div
                className={cn(
                    'bg-neutral-100 rounded-[6px]',
                    'px-[9px] py-[5px]',
                    'flex items-center justify-center',
                    'shadow-[0_1px_12px_rgba(0,0,0,0.12)]',
                    'text-neutral-600 whitespace-nowrap',
                )}
                style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                }}
            >
                {message}
            </div>
        </div>
    );
};

export default Tooltip;
