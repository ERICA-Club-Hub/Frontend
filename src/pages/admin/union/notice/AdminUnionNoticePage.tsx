import { UnionNoticeList } from '@/components/UnionNotice/UnionNoticeList';

const AdminUnionNoticePage = () => {
    // 등록 모드 (어드민 총동연에서의 공지사항 등록 가능)
    return <UnionNoticeList mode="register" />;
};

export { AdminUnionNoticePage };
