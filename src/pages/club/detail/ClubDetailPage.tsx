import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

import TabContents from './TabContents';
import ClubDetailHeader from '@/domains/club/profile/ui/ClubDetailHeader';
import { useClubDetail } from '@/domains/club/profile/model/useClubDetail';
import { useClubOverviewQuery } from '@/domains/club/profile/api/profile.queries';
import ClubDetailTab from '@/domains/shared/components/layout/ClubDetailTab';
import Tooltip from '@/components/Tooltip/Tooltip';
import useTooltip from '@/components/Tooltip/useTooltip';
import useModal from '@/components/Modal/useModal';
import { PromptModal } from '@/components/Modal/PromptModal';
import { AlertModal } from '@/components/Modal/AlertModal';
import {
    ALERT_MODAL_MESSAGE,
    PROMPT_MODAL_MESSAGE,
} from '@/components/Modal/modal.constant';
import { useRecruitmentEmailMutation } from '@/domains/club/recruitment/api/recruitment-email.mutations';
import AlarmIcon from '@/assets/club-detail/alarmIcon.svg?react';
import DisabledAlarmIcon from '@/assets/club-detail/disabledAlarmIcon.svg?react';

const TOOLTIP_SESSION_KEY = 'alarm-tooltip-shown';

export type activeTab = 'intro' | 'schedule' | 'recruit-info';

export default function ClubDetailPage() {
    const { activeTab, setActiveTab, clubId, isPreview } = useClubDetail();
    const { data, isLoading } = useClubOverviewQuery({ clubId, isPreview });
    const { isVisible, triggerRef, hideTooltip, showTooltip } = useTooltip({
        sessionKey: TOOLTIP_SESSION_KEY,
    });
    const modal = useModal();
    const { mutateAsync: submitEmail } = useRecruitmentEmailMutation(clubId);
    const navigate = useNavigate();

    useEffect(() => {
        const status = data?.recruitmentStatus;
        if (status === 'UPCOMING' || status === 'CLOSED') {
            showTooltip();
        }
    }, [data?.recruitmentStatus]);

    const handleAlarmClick = async () => {
        hideTooltip();
        await modal.push('prompt', PromptModal, {
            title: PROMPT_MODAL_MESSAGE.EMAIL.title,
            placeholder: PROMPT_MODAL_MESSAGE.EMAIL.placeholder,
            inputType: 'input',
            validate: (value: string) => z.email().safeParse(value).success,
            errorMessage: '올바른 이메일 형식이 아니에요.',
            onSubmit: async (inputValue: string) => {
                await submitEmail({ email: inputValue });
                modal.push('alert', AlertModal, {
                    title: ALERT_MODAL_MESSAGE.EMAIL.title,
                    actionLabel: ALERT_MODAL_MESSAGE.EMAIL.actionLabel,
                    icon: ALERT_MODAL_MESSAGE.EMAIL.icon,
                    onAction: () => navigate('/club/search?type=central'),
                });
            },
        });
    };

    const isAlarmEnabled =
        data?.recruitmentStatus === 'UPCOMING' ||
        data?.recruitmentStatus === 'CLOSED';

    return (
        <div className="flex flex-col items-center">
            <div className="bg-neutral-00 w-full relative">
                <div
                    ref={triggerRef}
                    className="absolute top-[18px] right-[18px] z-50"
                >
                    <>
                        <button
                            type="button"
                            aria-label="이메일 모집 알림 신청"
                            onClick={handleAlarmClick}
                            disabled={!isAlarmEnabled}
                        >
                            {isAlarmEnabled ? (
                                <AlarmIcon />
                            ) : (
                                <DisabledAlarmIcon />
                            )}
                        </button>
                        <Tooltip
                            isVisible={isVisible}
                            message="이메일로 모집알림을 받아보세요!"
                            arrowAlign="right"
                            className="right-0"
                        />
                    </>
                </div>
                <ClubDetailHeader data={data} isLoading={isLoading} />
                <div className="w-full flex justify-center">
                    <ClubDetailTab
                        setActiveTab={setActiveTab}
                        activeTab={activeTab}
                    />
                </div>
            </div>
            <main className="p-[16px]">
                <TabContents activeTab={activeTab} />
            </main>
        </div>
    );
}
