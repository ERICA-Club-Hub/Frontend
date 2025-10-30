import { Route, Routes } from 'react-router-dom';
import {
    AdminActivitiesFeedPage,
    AdminClubDetailPage,
    AdminClubPage,
    AdminLoginPage,
    ClubDetailPage,
    ClubIntroPage,
    ClubRegisterPage,
    EditAdminActivityLogPage,
    EditClubRegisterPage,
    ErrorPage,
    FAQPage,
    RecruitNoticePage,
    RegisterAdminActivityLogPage,
    ResourcesPage,
    ServiceNoticePage,
    SummaryInfoPage,
} from '@/pages';
import { RedirectIfAuthenticated } from './RedirectIfAuthenticated';
import { AuthGuard } from './AuthGuard';
import ClubAdminGurad from './ClubAdminGurad';
import CompleteClubRegisterPage from '@/pages/admin/auth/register/CompleteClubRegisterPage';
import ServiceAdminGuard from './ServiceAdminGuard';
import ServiceAdminPage from '@/pages/admin/service/dashboard/ServiceAdminPage';
import ClubDetailPreviewPage from '@/pages/club-detail-preview/ClubDetailPreviewPage';
import ClubSearchPage from '@/pages/club-search/ClubSearchPage';
import MainPage from '@/pages/main/MainPage';
import ReviewRegistrationsPage from '@/pages/admin/service/registrations/ReviewRegistrationsPage';
import ClubManagementPage from '@/pages/admin/service/club-management/ClubManagementPage';
import RegistrationsDetailPage from '@/pages/admin/service/registrations/RegistrationsDetailPage';
import ClubActivityLogDetailPage from '@/pages/club-detail/ClubActivityLogDetailPage';

export default function AppRoutes() {
    return (
        <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainPage />} />

            {/* 동아리 상세 페이지 */}
            <Route path="/club/:id" element={<ClubDetailPage />} />

            {/* 동아리 활동 로그 상세 페이지 */}
            <Route
                path="/club/:id/:activityId"
                element={<ClubActivityLogDetailPage />}
            />

            {/* 동아리 검색 페이지 */}
            <Route path="/club/search" element={<ClubSearchPage />} />

            {/* 서비스 공지사항 페이지 */}
            <Route path="/notice" element={<ServiceNoticePage />} />

            {/* 자료실 페이지 */}
            <Route path="/resources" element={<ResourcesPage />} />

            {/* 자주 묻는 질문 페이지 */}
            <Route path="/faq" element={<FAQPage />} />

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
            <Route path="/admin/club/register">
                {/* 동아리 등록 페이지 */}
                <Route index element={<ClubRegisterPage />} />

                {/* 동아리 등록 성공 페이지 */}
                <Route
                    path="/admin/club/register/complete"
                    element={<CompleteClubRegisterPage />}
                />
            </Route>

            {/* --- 어드민 --- */}
            <Route path="/admin" element={<AuthGuard />}>
                {/* --- 동아리 어드민 --- */}
                {/* 서비스 관리자, 동아리 대표 접근 가능 */}
                <Route path="/admin/club/:id" element={<ClubAdminGurad />}>
                    {/* 동아리 어드민 홈*/}
                    <Route index element={<AdminClubPage />} />

                    {/* 동아리 활동 로그 피드 페이지 */}
                    <Route
                        path="/admin/club/:id/activities/feed"
                        element={<AdminActivitiesFeedPage />}
                    />
                    {/* 동아리 활동 로그 등록 페이지 */}
                    <Route
                        path="/admin/club/:id/activities/register"
                        element={<RegisterAdminActivityLogPage />}
                    />
                    {/* 동아리 활동 로그 등록 페이지 */}
                    <Route
                        path="/admin/club/:id/activities/edit"
                        element={<EditAdminActivityLogPage />}
                    />

                    {/* 동아리 상세 페이지  */}
                    <Route
                        path="/admin/club/:id"
                        element={<AdminClubDetailPage />}
                    >
                        {/* 상세페이지 섹션 (요약정보, 동아리 소개, 모집안내) */}
                        <Route
                            path="/admin/club/:id/summary-info"
                            element={<SummaryInfoPage />}
                        />
                        <Route
                            path="/admin/club/:id/club-intro"
                            element={<ClubIntroPage />}
                        />
                        <Route
                            path="/admin/club/:id/recruit-notice"
                            element={<RecruitNoticePage />}
                        />
                    </Route>

                    {/* 동아리 등록 정보 수정 페이지 */}
                    <Route
                        path="/admin/club/:id/register/edit"
                        element={<EditClubRegisterPage />}
                    />
                </Route>

                {/* --- 서비스 어드민 --- */}
                <Route path="/admin/service" element={<ServiceAdminGuard />}>
                    {/* 서비스 어드민 대시보드 */}
                    <Route index element={<ServiceAdminPage />} />

                    {/* 신규 동아리 등록 신청 확인 */}
                    <Route
                        path="/admin/service/registrations"
                        element={<ReviewRegistrationsPage />}
                    />
                    <Route
                        path="/admin/service/registrations/:id"
                        element={<RegistrationsDetailPage />}
                    />

                    {/* 동아리 관리 페이지 */}
                    <Route
                        path="/admin/service/club-management"
                        element={<ClubManagementPage />}
                    />
                </Route>

                {/* 총동연 공지사항 페이지 */}
                {/* <Route path="/union/notice" element={<UnionNoticePage />} /> */}

                {/* 총동연 어드민 홈*/}
                {/* <Route path="/admin/union" element={<AdminUnionPage />} /> */}

                {/* 총동연 어드민 공지 */}
                {/* <Route
                            path="/admin/union/notice"
                            element={<AdminUnionNoticePage />}
                        /> */}

                {/* 총동연 어드민 공지 등록 */}
                {/* <Route
                            path="/admin/union/notice/register"
                            element={<AdminUnionNoticeRegisterPage />}
                        /> */}

                {/* 총동연 어드민 공지 수정 및 삭제 */}
                {/* <Route
                            path="/admin/union/notice/:id/register"
                            element={<AdminUnionNoticeEditPage />}
                        /> */}

                {/* 총동연 자료 등록  */}
                {/* <Route
                            path="/admin/union/resources"
                            element={<AdminResourcesRegisterPage mode="manage" />}
                        />
                    </Route> */}
            </Route>

            {/* 404 Not Found Page */}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}
