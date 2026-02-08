import ErrorPageTemplate from '@/components/Error/ErrorPageTemplate';
import { PAGE_ERROR_MESSAGE } from '@/constants/error-message.constant';

/**
 * 알 수 없는 에러에 대한 에러 페이지
 */
export default function UnknownErrorPage() {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <ErrorPageTemplate
            content={PAGE_ERROR_MESSAGE.UNKNOWN_ERROR}
            onButtonClick={handleRetry}
        />
    );
}
