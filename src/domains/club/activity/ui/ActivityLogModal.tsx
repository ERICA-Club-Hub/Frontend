import { DEFAULT_IMG } from '@/constants/default-image.constant';
import { useActivityIdByParams } from '@/domains/club/activity/api/useActivityIdByParams';
import { useActivityLogDetail } from '@/domains/club/activity/api/useClubLog';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './ActivityLogModal.css';

const ActivityLogDetail = () => {
    const activityId = useActivityIdByParams();
    const { data: activityLogDetailResponse, isLoading } =
        useActivityLogDetail(activityId);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    const activityDetail = activityLogDetailResponse?.result;
    const imageList = activityDetail?.activityImageDTOList || [];

    return (
        <div className="w-full min-h-screen flex flex-col">
            <section className="h-[66px] w-full px-0 py-[15px] pl-[29px] bg-white flex gap-[10px] mb-[15px]">
                <img
                    src={activityDetail?.clubImageUrl || DEFAULT_IMG}
                    alt="club profile"
                    className="h-[36px] w-[36px] rounded-[5.33px] object-cover"
                />
                <div className="flex gap-[5px] flex-col h-full">
                    <h3 className="font-medium text-body-03 text-black">
                        {activityDetail?.clubName || 'UMC ERICA'}
                    </h3>
                    <span className="font-medium text-caption text-neutral-600">
                        {activityDetail?.date || '2024.12.01'}
                    </span>
                </div>
            </section>

            <div className="activity-log-swiper w-full pb-[28px]">
                <Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={10}
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                        type: 'bullets',
                    }}
                >
                    {imageList?.map((imageUrl, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={imageUrl.imageUrl}
                                alt={`activity ${index + 1}`}
                                className="w-full h-full object-contain"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {activityDetail?.content && (
                <section className="bg-white px-5 py-5 mx-5 mt-[15px] rounded-[10px]">
                    <h4 className="text-body-01 font-semibold mb-[12px] text-black">
                        활동 내용
                    </h4>
                    <p className="text-body-03 leading-body text-neutral-700 whitespace-pre-wrap">
                        {activityDetail.content}
                    </p>
                </section>
            )}
        </div>
    );
};

export { ActivityLogDetail };
