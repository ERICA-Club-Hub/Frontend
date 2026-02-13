import { useEffect, useRef, useState } from 'react';

/**
 * useTooltip 반환 타입
 */
interface UseTooltipReturn {
    /** 툴팁 표시 여부 */
    isVisible: boolean;
    /** 툴팁의 트리거(앵커) 요소에 부착할 ref */
    triggerRef: React.RefObject<HTMLDivElement>;
    /** 툴팁 수동 닫기 */
    hideTooltip: () => void;
    /** 툴팁 수동 열기 */
    showTooltip: () => void;
}

/**
 * useTooltip 훅
 *
 * 툴팁의 표시 상태(isVisible), ref, 자동 노출, 외부 클릭 감지를 관리합니다.
 *
 * 동작 정책:
 * - 페이지 렌더링 시 자동 노출
 * - 빈 곳(툴팁 외부) 클릭 시 툴팁 사라짐
 * - triggerRef를 툴팁을 포함하는 상위 컨테이너에 부착해야 외부 클릭 감지가 동작합니다
 *
 * @example
 * ```tsx
 * const { isVisible, triggerRef } = useTooltip();
 *
 * return (
 *   <div className="relative" ref={triggerRef}>
 *     <AlarmIcon />
 *     <Tooltip isVisible={isVisible} message="이메일로 모집알림을 받아보세요!" />
 *   </div>
 * );
 * ```
 */
const useTooltip = (): UseTooltipReturn => {
    // 페이지 렌더링 시 자동 노출을 위해 초기값 true
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const triggerRef = useRef<HTMLDivElement>(null);

    const hideTooltip = () => setIsVisible(false);
    const showTooltip = () => setIsVisible(true);

    // 외부 클릭 시 툴팁 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return {
        isVisible,
        triggerRef,
        hideTooltip,
        showTooltip,
    };
};

export default useTooltip;
