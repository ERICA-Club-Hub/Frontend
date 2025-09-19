import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';
import ClubTypeTag from './ClubCardTags/ClubTypeTag';
import RecruitStatusTag from './ClubCardTags/RecruitStatusTag';

interface ClubCardProps extends LinkProps {
    title: string; // 동아리 이름
    subTitle: string; // 한 줄 소개
    categoryName: string; // 동아리 카테고리 이름 (타입화 필요)
    recruitmentStatus?: string; // 모집 상태 (타입화 필요)
    to: string; // 이동할 라우팅 주소
    tags?: string[]; // tag 타입화 필요
}

export default function ClubCard({
    title,
    subTitle,
    categoryName,
    recruitmentStatus,
    to,
    ...props
}: ClubCardProps) {
    const isAdminRoute = to.startsWith('/admin/service');

    return (
        <CardContainer to={to} {...props}>
            {/* 어드민 페이지에서는 프로필 이미지 미표시 */}
            {!isAdminRoute && <ProfileImage />}

            <ClubInfo>
                <TitleWrapper>
                    <TagContainer>
                        <ClubTypeTag clubCategory={categoryName} />
                        {recruitmentStatus && (
                            <RecruitStatusTag
                                recruitmentStatus={recruitmentStatus}
                            />
                        )}
                    </TagContainer>
                </TitleWrapper>

                <Title>{title}</Title>

                <SubTitle>{subTitle}</SubTitle>
            </ClubInfo>
        </CardContainer>
    );
}

const CardContainer = styled(Link)`
    display: flex;
    width: 320px;
    height: 95px;
    padding: 10px;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    border-radius: 10px;
    border: 1px solid #eaeaea;
    background: #fff;
    cursor: pointer;
`;

const ProfileImage = styled.img`
    width: 75px;
    height: 75px;
    border-radius: 5px;
`;

const ClubInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 204px;
    height: 65px;
    justify-content: flex-start;
    align-items: flex-start;
`;

const TitleWrapper = styled.div`
    display: flex;
    gap: 6px;
    margin-bottom: 7px;
`;

const Title = styled.p`
    color: #232323;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 0 0 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TagContainer = styled.div`
    display: flex;
    gap: 6px;
`;

const SubTitle = styled.p`
    color: #aeaeae;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 100%;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
`;
