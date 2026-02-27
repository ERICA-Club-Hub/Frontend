import { useEffect, useRef, useState } from 'react';

interface UseTooltipOptions {
    /**
     * sessionStorage 키.
     * 지정하면 한 세션에서 툴팁이 한 번만 노출됩니다.
     * 지정하지 않으면 기존 동작(페이지 렌더링 시 자동 노출)을 유지합니다.
     */
    sessionKey?: string;
}

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
 * - sessionKey 미지정: 페이지 렌더링 시 자동 노출, 외부 클릭 시 사라짐
 * - sessionKey 지정: 초기값 false로 시작, showTooltip() 호출 시 sessionStorage 확인 후
 *   한 세션에서 한 번만 노출. 이미 노출된 경우 showTooltip() 호출을 무시합니다.
 * - triggerRef를 툴팁을 포함하는 상위 컨테이너에 부착해야 외부 클릭 감지가 동작합니다
 *
 * @example
 * ```tsx
 * // sessionKey 없음 - 기존 동작 (자동 노출)
 * const { isVisible, triggerRef } = useTooltip();
 *
 * // sessionKey 있음 - 세션당 1회 노출
 * const { isVisible, triggerRef, showTooltip } = useTooltip({ sessionKey: 'my-tooltip' });
 * useEffect(() => { if (condition) showTooltip(); }, [condition]);
 * ```
 */
const useTooltip = (options?: UseTooltipOptions): UseTooltipReturn => {
    const { sessionKey } = options ?? {};

    // sessionKey 없음: 기존 동작(자동 노출)
    // sessionKey 있음: caller가 showTooltip()으로 제어하므로 false로 시작
    const [isVisible, setIsVisible] = useState<boolean>(!sessionKey);
    const triggerRef = useRef<HTMLDivElement>(null);

    const hideTooltip = () => setIsVisible(false);

    const showTooltip = () => {
        // sessionKey가 있으면 이미 노출된 경우 무시
        if (sessionKey) {
            if (sessionStorage.getItem(sessionKey) !== null) return;
            sessionStorage.setItem(sessionKey, 'true');
        }
        setIsVisible(true);
    };

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
