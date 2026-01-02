import Card from '../Common/Card';
import { useState } from 'react';
import Button from '../Common/Button';
import { Link, useNavigate } from 'react-router-dom';
import useUnionQueries from '@/hooks/queries/useUnionQueries';

export interface AnnouncementDTOList {
    announcementDTOList: AnnouncementDTO[];
}

interface AnnouncementDTO {
    announcementId: number;
    title: string;
    date: string;
    url: string;
    thumbnailUrl: string;
}

function UnionNoticeList({ mode }: { mode: string }) {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState<AnnouncementDTOList>({
        announcementDTOList: [],
    });

    // 총동연 공지사항 목록 불러오기
    const { useUnionNoticeListQuery } = useUnionQueries();
    // 로딩, 에러 상태
    const { isPending, isError } = useUnionNoticeListQuery({
        setAnnouncements,
    });

    // 카드 클릭 시 이동
    const handleCardClick = (id: number, url: string) => {
        if (mode === 'register') {
            // 어드민 등록 모드일 때 해당 총동연 공지사항 수정 페이지로 이동
            navigate(`/admin/union/notice/${id}/register`, {
                state: { announcementId: id },
            });
        } else {
            // 읽기 모드일 때 클릭 시 해당 URL로 이동
            window.location.href = url;
        }
    };

    return (
        <div
            className={`flex flex-col items-center pt-5 ${mode === 'register' ? 'gap-[15px]' : 'gap-[19px]'}`}
        >
            <div className="flex justify-between w-[320px]">
                <div className="text-body-01 font-semibold text-black">
                    총동연 공지사항
                </div>
                {mode === 'register' && (
                    <Link to="/admin/union/notice/register">
                        <Button disabled={false}>공지사항 작성하기</Button>
                    </Link>
                )}
            </div>
            <div className="flex flex-col gap-2">
                {isPending ? (
                    <div>로딩중...</div>
                ) : isError ? (
                    <div>{isError}</div>
                ) : announcements?.announcementDTOList?.length > 0 ? (
                    announcements.announcementDTOList.map((announcement) => (
                        <div
                            key={announcement.announcementId}
                            className="cursor-pointer hover:opacity-80"
                            onClick={() =>
                                handleCardClick(
                                    announcement.announcementId,
                                    announcement.url,
                                )
                            }
                        >
                            <Card
                                $variant="unionNotice"
                                $imagePath={announcement.thumbnailUrl}
                                title={announcement.title}
                                date={announcement.date}
                            />
                        </div>
                    ))
                ) : (
                    <div>등록된 공지사항이 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export { UnionNoticeList };
