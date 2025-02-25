import { Route, Routes } from 'react-router-dom';
import {
    AdminActivityLogPage,
    AdminClubDetailPage,
    AdminClubPage,
    AdminLoginPage,
    AdminNoticePage,
    AdminResourcesRegisterPage,
    AdminUnionPage,
    ClubDetailPage,
    ClubListPage,
    ErrorPage,
    FAQPage,
    ModifyClubRegisterPage,
    RegisterClubPage,
    ResourcesPage,
    ServiceNoticePage,
    UnionNoticePage,
} from '@/pages';
import { RedirectIfAuthenticated } from './RedirectIfAuthenticated';
import { AuthGuard } from './AuthGuard';
import UnionAdminGuard from './UnionAdminGuard';

export default function AppRoutes() {
    return (
        <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<ClubListPage />} />

            {/* 동아리 상세 페이지 */}
            <Route path="/club/:id" element={<ClubDetailPage />} />

            {/* 총동연 공지사항 페이지 */}
            <Route path="/union/notice" element={<UnionNoticePage />} />

            {/* 서비스 공지사항 페이지 */}
            <Route path="/club/notice" element={<ServiceNoticePage />} />

            {/* 자료실 페이지 */}
            <Route path="/resources" element={<ResourcesPage />} />

            {/* 자주 묻는 질문 페이지 */}
            <Route path="/faq" element={<FAQPage />} />

            {/* 로그인됐을 때 로그인 페이지 접근 제한 */}
            <Route path="/admin/login" element={<RedirectIfAuthenticated />}>
                {/* 로그인 페이지 */}
                <Route path="" element={<AdminLoginPage />} />
            </Route>

            {/* 동아리 등록 페이지 */}
            <Route path="/admin/club/register" element={<RegisterClubPage />} />

            {/* 어드민 접근 권한 필요 -> 권한 없을 때 메인으로 리다이렉트 */}
            <Route path="/admin">
                {/* <Route path="/admin" element={<AuthGuard />}> */}
                {/* 동아리 어드민 */}
                {/* 총동연, 서비스 관리자, 동아리 대표 모두 접근 가능 */}
                <Route path="/admin/club">
                    {/* 동아리 어드민 홈*/}
                    <Route path="/admin/club" element={<AdminClubPage />} />

                    {/* 동아리 활동 로그 */}
                    <Route
                        path="/admin/club/activity"
                        element={<AdminActivityLogPage />}
                    />
                    {/* 동아리 상세 페이지  */}
                    <Route
                        path="/admin/club/:id"
                        element={<AdminClubDetailPage />}
                    />
                    {/* 동아리 등록 정보 수정 페이지 */}
                    <Route
                        path="/admin/club/modify"
                        element={<ModifyClubRegisterPage />}
                    />
                </Route>

                {/* 총동연 어드민 */}
                {/* 총동연, 서비스 관리자만 접근 가능 */}
                <Route path="/admin/union" element={<UnionAdminGuard />}>
                    {/* 총동연 어드민 홈*/}
                    <Route path="/admin/union" element={<AdminUnionPage />} />
                    {/* 총동연 공지 등록 */}
                    <Route
                        path="/admin/union/notice"
                        element={<AdminNoticePage />}
                    />
                    {/* 총동연 자료 등록  */}

                    <Route
                        path="/admin/union/resources"
                        element={<AdminResourcesRegisterPage mode="edit" />}
                    />
                </Route>
            </Route>

            {/* 404 Not Found Page */}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}
