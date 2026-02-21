import ErrorPageTemplate from '@/components/Error/ErrorPageTemplate';
import { PAGE_ERROR_MESSAGE } from '@/constants/error-message.constant';
import { PATHS } from '@/routes/paths';
import { useNavigate } from 'react-router-dom';

/**
 * 서버 에러 페이지
 */
export default function ServerErrorPage() {
    const navigate = useNavigate();

    return (
        <ErrorPageTemplate
            content={PAGE_ERROR_MESSAGE.SERVER_ERROR}
            onButtonClick={() => navigate(PATHS.HOME)}
        />
    );
}
