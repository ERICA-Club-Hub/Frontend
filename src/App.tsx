import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RootLayout } from '@/components/Common';
import {
    AdminActivityLogPage,
    AdminClubDetailPage,
    AdminClubPage,
    AdminLoginPage,
    AdminNoticePage,
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
    AdminResourcesRegisterPage,
} from '@/pages';
import ClubDetailPreview from './pages/club-detail-preview/ClubDetailPreview';

function App() {
    return (
        <>
            <BrowserRouter>
                <RootLayout>
                    <Routes>
                        {/* 메인 페이지 */}
                        <Route path="/" element={<ClubListPage />} />
                        {/* 동아리 상세 페이지 */}
                        <Route path="/club/:id" element={<ClubDetailPage />} />
                        {/* 총동연 공지사항 페이지 */}
                        <Route
                            path="/union/notice"
                            element={<UnionNoticePage />}
                        />
                        {/* 서비스 공지사항 페이지 */}
                        <Route
                            path="/club/notice"
                            element={<ServiceNoticePage />}
                        />
                        {/* 자료실 페이지 */}
                        <Route path="/resources" element={<ResourcesPage />} />
                        {/* 자주 묻는 질문 페이지 */}
                        <Route path="/faq" element={<FAQPage />} />
                        {/* 동아리 상세피이지 등록하기에서 동아리 미리보기 했을 때 */}
                        <Route
                            path="/club-detail-preview/:id"
                            element={<ClubDetailPreview />}
                        />
                        {/* 어드민 페이지 */}
                        <Route path="/admin">
                            {/* 로그인 페이지 */}
                            <Route
                                path="/admin/login"
                                element={<AdminLoginPage />}
                            />
                            {/* 동아리 등록 페이지 */}
                            <Route
                                path="/admin/register"
                                element={<RegisterClubPage />}
                            />
                            {/* 동아리 등록 정보 수정 페이지 */}
                            <Route
                                path="/admin/modify"
                                element={<ModifyClubRegisterPage />}
                            />

                            {/* 동아리 어드민 */}
                            <Route
                                path="/admin/club"
                                element={<AdminClubPage />}
                            />
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

                            {/* 총동연 어드민 */}
                            <Route
                                path="/admin/union"
                                element={<AdminUnionPage />}
                            />
                            {/* 총동연 공지 등록 */}
                            <Route
                                path="/admin/union/notice"
                                element={<AdminNoticePage />}
                            />
                            {/* 총동연 자료 등록  */}
                            <Route
                                path="/admin/union/resources"
                                element={
                                    <AdminResourcesRegisterPage mode="edit" />
                                }
                            />
                        </Route>
                        {/* 404 Not Found Page */}
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </RootLayout>
            </BrowserRouter>
        </>
    );
}

export default App;
