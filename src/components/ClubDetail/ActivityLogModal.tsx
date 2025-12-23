import styled from 'styled-components';
import { DEFAULT_IMG } from '@/constants/default-image.constant';
import { useActivityIdByParams } from '@/hooks/useActivityIdByParams';
import { useActivityLogDetail } from '@/hooks/queries/club-detail/useClubLog';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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
        <Container>
            <ClubInfo>
                <ClubInfoProfileImage
                    src={activityDetail?.clubImageUrl || DEFAULT_IMG}
                    alt="club profile"
                />
                <LogInfo>
                    <LogInfoClubName>
                        {activityDetail?.clubName || 'UMC ERICA'}
                    </LogInfoClubName>
                    <LogInfoDate>
                        {activityDetail?.date || '2024.12.01'}
                    </LogInfoDate>
                </LogInfo>
            </ClubInfo>

            <SwiperWrapper>
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
                            <ActivityImage
                                src={imageUrl.imageUrl}
                                alt={`activity ${index + 1}`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </SwiperWrapper>

            {activityDetail?.content && (
                <ContentSection>
                    <ContentTitle>활동 내용</ContentTitle>
                    <ContentText>{activityDetail.content}</ContentText>
                </ContentSection>
            )}
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const ClubInfo = styled.section`
    height: 66px;
    width: 100%;
    padding: 15px 0 15px 29px;
    background-color: white;
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
`;

const ClubInfoProfileImage = styled.img`
    height: 36px;
    width: 36px;
    border-radius: 5.33px;
    object-fit: cover;
`;

const LogInfo = styled.div`
    display: flex;
    gap: 5px;
    flex-direction: column;
    height: 100%;
`;

const LogInfoClubName = styled.h3`
    font-weight: 500;
    font-size: 14px;
    color: black;
`;

const LogInfoDate = styled.span`
    font-weight: 500;
    font-size: 12px;
    color: #989898;
`;

const SwiperWrapper = styled.div`
    width: 100%;
    padding-bottom: 28px;

    .swiper {
        width: 100%;
        display: flex;
        gap: 10px;
        overflow: visible;
    }

    .swiper-slide {
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        overflow: hidden;
        transition: opacity 0.3s;
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 1;
            transition: opacity 0.3s;
        }
    }

    .swiper-slide-active {
        opacity: 1;
        &::before {
            opacity: 0;
        }
    }

    .swiper-pagination {
        background-color: white;
        padding: 2px;
        border-radius: 100px;
        width: fit-content;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);

        .swiper-pagination-fraction {
            color: white;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 4px 12px;
            border-radius: 12px;
            width: fit-content;
            left: 50%;
            transform: translateX(-50%);
        }
    }
`;

const ActivityImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const ContentSection = styled.section`
    background-color: white;
    padding: 20px;
    margin: 15px 20px 0 20px;
    border-radius: 10px;
`;

const ContentTitle = styled.h4`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #000;
`;

const ContentText = styled.p`
    font-size: 14px;
    line-height: 1.6;
    color: #333;
    white-space: pre-wrap;
`;

export { ActivityLogDetail };
