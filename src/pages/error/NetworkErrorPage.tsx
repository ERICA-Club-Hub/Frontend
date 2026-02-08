import ErrorPageTemplate from '@/components/Error/ErrorPageTemplate';
import { PAGE_ERROR_MESSAGE } from '@/constants/error-message.constant';

/**
 * 네트워크 에러 페이지
 */
export default function NetworkErrorPage() {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <ErrorPageTemplate
            content={PAGE_ERROR_MESSAGE.NETWORK_ERROR}
            onButtonClick={handleRetry}
        />
    );
}
