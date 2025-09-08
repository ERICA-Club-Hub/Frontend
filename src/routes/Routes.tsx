import { Route, Routes } from 'react-router-dom';
import {
    AdminActivitiesFeedPage,
    AdminClubDetailPage,
    AdminClubPage,
    AdminClubRegisterManagePage,
    AdminLoginPage,
    // AdminResourcesRegisterPage,
    // AdminUnionNoticePage,
    // AdminUnionPage,
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
    UnionNoticePage,
} from '@/pages';
import { RedirectIfAuthenticated } from './RedirectIfAuthenticated';
import { AuthGuard } from './AuthGuard';
// import UnionAdminGuard from './UnionAdminGuard';
import ClubAdminGurad from './ClubAdminGurad';
// import AdminUnionNoticeEditPage from '@/pages/admin/union/notice/AdminUnionNoticeEditPage';
// import { AdminUnionNoticeRegisterPage } from '@/pages/admin/union/notice/AdminUnionNoticeRegisterPage';
import CompleteClubRegisterPage from '@/pages/admin/auth/register/CompleteClubRegisterPage';
import ServiceAdminGuard from './ServiceAdminGuard';
import ClubDetailPreviewPage from '@/pages/club-detail-preview/ClubDetailPreviewPage';
import ClubSearchPage from '@/pages/club-search/ClubSearchPage';
import MainPage from '@/pages/main/MainPage';

export default function AppRoutes() {
    return (
        <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainPage />} />

            {/* 동아리 상세 페이지 */}
            <Route path="/club/:id" element={<ClubDetailPage />} />

            {/* 동아리 검색 페이지 */}
            <Route path="/club/search" element={<ClubSearchPage />} />

            {/* 총동연 공지사항 페이지 */}
            <Route path="/union/notice" element={<UnionNoticePage />} />

            {/* 서비스 공지사항 페이지 */}
            <Route path="/club/notice" element={<ServiceNoticePage />} />

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
                <Route path="" element={<AdminLoginPage />} />
            </Route>

            {/* 동아리 등록 페이지 */}
            <Route path="/admin/club/register" element={<ClubRegisterPage />} />

            {/* 동아리 등록 성공 페이지 */}
            <Route
                path="/admin/club/register/complete"
                element={<CompleteClubRegisterPage />}
            />

            {/* 어드민 접근 권한 필요 -> 권한 없을 때 메인으로 리다이렉트 */}
            <Route path="/admin" element={<AuthGuard />}>
                {/* 동아리 어드민 */}
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

                <Route
                    path="/admin/club/register/manage"
                    element={<ServiceAdminGuard />}
                >
                    <Route index element={<AdminClubRegisterManagePage />} />
                </Route>

                {/* 총동연 어드민 */}
                {/* 총동연, 서비스 관리자 접근 가능 */}
                {/* <Route path="/admin/union" element={<UnionAdminGuard />}> */}
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
