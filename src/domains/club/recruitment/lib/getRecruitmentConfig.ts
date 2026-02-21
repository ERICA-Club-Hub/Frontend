import { RECRUITMENT_STATUS } from '@/constants/category-config.constant';
import { RecruitmentStatus } from '@/types/recruitment-status.type';

interface RecruitmentConfig {
    label: string;
    backgroundColor: string;
    textColor: string;
}

/**
 * 모집 상태 코드로 디스플레이 정보 가져오기
 */
export const getRecruitmentConfig = (
    status?: RecruitmentStatus,
): RecruitmentConfig => {
    if (!status) {
        return {
            label: '상태 없음',
            backgroundColor: 'bg-badge-gray-bg',
            textColor: 'text-badge-gray-text',
        };
    }

    const config = RECRUITMENT_STATUS[status];
    return config
        ? {
              label: config.label,
              backgroundColor: config.backgroundColor,
              textColor: config.textColor,
          }
        : {
              label: '상태 없음',
              backgroundColor: 'bg-badge-gray-bg',
              textColor: 'text-badge-gray-text',
          };
};
