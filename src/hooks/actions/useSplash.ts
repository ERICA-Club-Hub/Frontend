import { useEffect, useState } from 'react';

export const useSplash = () => {
    const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);

    useEffect(() => {
        const checkFirstVisit = () => {
            const isFirstVisit = !sessionStorage.getItem('visited');

            // 첫 방문 시
            if (isFirstVisit) {
                setTimeout(() => {
                    setIsSplashVisible(false);
                    sessionStorage.setItem('visited', 'true');
                }, 2000);
            } else {
                // 첫 방문이 아닐 시
                setIsSplashVisible(false);
            }
        };
        checkFirstVisit();
    }, []);

    return { isSplashVisible };
};
