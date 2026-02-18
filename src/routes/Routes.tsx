import { Route, Routes } from 'react-router-dom';
import { RedirectIfAuthenticated } from './RedirectIfAuthenticated';
import { AuthGuard } from './AuthGuard';
import ClubAdminGurad from './ClubAdminGurad';
import ServiceAdminGuard from './ServiceAdminGuard';
import ServiceAdminDashboardPage from '@/pages/admin/service/dashboard/ServiceAdminDashboardPage';
import ClubDetailPreviewPage from '@/pages/club/preview/ClubDetailPreviewPage';
import ClubSearchPage from '@/pages/search/ClubSearchPage';
import MainPage from '@/pages/main/MainPage';
import ClubManagementPage from '@/pages/admin/service/clubs/ClubManagementPage';
import RegistrationsDetailPage from '@/pages/admin/service/registrations/RegistrationsDetailPage';
import { PATHS } from './paths';
import { AdminLoginPage } from '@/pages/admin/auth/AdminLoginPage';
import ProfileManagePage from '@/pages/admin/club/profile/ProfileManagePage';
import RegistrationCompletionPage from '@/pages/club/registration/RegistrationCompletionPage';
import RegistrationsListPage from '@/pages/admin/service/registrations/RegistrationsListPage';
import RegistrationPage from '@/pages/club/registration/RegistrationPage';
import NoticePage from '@/pages/notice/NoticePage';
import ClubSocialPage from '@/pages/social/ClubSocialPage';
import ClubDetailPage from '@/pages/club/detail/ClubDetailPage';
import ClubAdminDashboardPage from '@/pages/admin/club/dashboard/ClubAdminDashboardPage';
import ClubAdminDetailPage from '@/pages/admin/club/detail/ClubAdminDetailPage';
import WrongAccessPage from '@/pages/error/WrongAccessPage';
import NetworkErrorPage from '@/pages/error/NetworkErrorPage';
import UnknownErrorPage from '@/pages/error/UnknownErrorPage';
import ServerErrorPage from '@/pages/error/ServerErrorPage';
import ClubManagementDetailPage from '@/pages/admin/service/clubs/ClubManagementDetailPage';

export default function AppRoutes() {
    return (
        <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainPage />} />

            {/* 동아리 상세 페이지 */}
            <Route path="/club/:id" element={<ClubDetailPage />} />

            {/* 동아리 검색 페이지 */}
            <Route path="/club/search" element={<ClubSearchPage />} />

            {/* 서비스 공지사항 페이지 */}
            <Route path={PATHS.NOTICE} element={<NoticePage />} />

            {/* 자주 묻는 질문 페이지 */}
            {/* <Route path={PATHS.FAQ} element={<FAQPage />} /> */}

            {/* 동아리 등록 및 수정의 미리보기 페이지 */}
            <Route
                path="/club-detail-preview/:id"
                element={<ClubDetailPreviewPage />}
            />

            {/* 로그인됐을 때 로그인 페이지 접근 제한 */}
            <Route path="/admin/login" element={<RedirectIfAuthenticated />}>
                {/* 로그인 페이지 */}
                <Route index element={<AdminLoginPage />} />
            </Route>

            {/* --- 동아리 등록 --- */}
            <Route path={PATHS.CLUB_REGISTRATION}>
                {/* 동아리 등록 페이지 */}
                <Route index element={<RegistrationPage />} />

                {/* 동아리 등록 성공 페이지 */}
                <Route
                    path={PATHS.CLUB_REGISTRATION_COMPLETED}
                    element={<RegistrationCompletionPage />}
                />
            </Route>

            {/* --- 동아리 소셜(인스타) 페이지 --- */}
            <Route path={PATHS.CLUB_SOCIAL} element={<ClubSocialPage />} />

            {/* --- 어드민 --- */}
            <Route path="/admin" element={<AuthGuard />}>
                {/* --- 동아리 어드민 --- */}
                {/* 서비스 관리자, 동아리 대표 접근 가능 */}
                <Route path="/admin/club/:id" element={<ClubAdminGurad />}>
                    {/* 동아리 어드민 홈*/}
                    <Route index element={<ClubAdminDashboardPage />} />

                    {/* 동아리 기본 정보 관리 */}
                    <Route path="profile" element={<ProfileManagePage />} />

                    {/* 동아리 상세 페이지  */}
                    <Route path="detail" element={<ClubAdminDetailPage />} />
                </Route>

                {/* --- 서비스 어드민 --- */}
                <Route path="/admin/service" element={<ServiceAdminGuard />}>
                    {/* 서비스 어드민 대시보드 */}
                    <Route index element={<ServiceAdminDashboardPage />} />

                    {/* 신규 동아리 등록 신청 관리 */}
                    <Route
                        path={PATHS.SERVICE_ADMIN_REGISTRATIONS}
                        element={<RegistrationsListPage />}
                    />
                    <Route
                        path="registrations/:id"
                        element={<RegistrationsDetailPage />}
                    />

                    {/* 동아리 관리 페이지 */}
                    <Route
                        path={PATHS.SERVICE_ADMIN_CLUBS}
                        element={<ClubManagementPage />}
                    />
                    <Route
                        path="clubs/:id"
                        element={<ClubManagementDetailPage />}
                    />
                </Route>
            </Route>

            {/* 에러 페이지 */}
            <Route path={PATHS.WRONG_ACCESS} element={<WrongAccessPage />} />
            <Route path={PATHS.SERVER_ERROR} element={<ServerErrorPage />} />
            <Route path={PATHS.NETWORK_ERROR} element={<NetworkErrorPage />} />
            <Route path="*" element={<UnknownErrorPage />} />
        </Routes>
    );
}
