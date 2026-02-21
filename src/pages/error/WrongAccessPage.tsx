import ErrorPageTemplate from '@/components/Error/ErrorPageTemplate';
import { PAGE_ERROR_MESSAGE } from '@/constants/error-message.constant';
import { PATHS } from '@/routes/paths';
import { useNavigate } from 'react-router-dom';

/**
 * 잘못된 접근에 대한 에러 페이지
 */
export default function WrongAccessPage() {
    const navigate = useNavigate();

    return (
        <ErrorPageTemplate
            content={PAGE_ERROR_MESSAGE.WRONG_ACCESS}
            onButtonClick={() => navigate(PATHS.HOME)}
        />
    );
}
