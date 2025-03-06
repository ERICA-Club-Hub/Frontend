import { UnionNoticeList } from '@/components/UnionNotice/UnionNoticeList';

const UnionNoticePage = () => {
    // 읽기 모드 (어드민 총동연에서의 공지사항 등록 불가)
    return <UnionNoticeList mode="read" />;
};

export { UnionNoticePage };
