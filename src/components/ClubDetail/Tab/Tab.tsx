import { useClubDetail } from '@/hooks/club-detail/useClubDetail';
import { activeTab } from '@/pages';
import styled from 'styled-components';

interface TabProps {
    setActiveTab: (activeTab: activeTab) => void;
    activeTab: activeTab;
}

// tab 항목에서 활성화 여부를 판단할 props
interface TabButtonProps {
    $isActive?: boolean;
}

export default function Tab({ setActiveTab, activeTab }: TabProps) {
    const { isPreview } = useClubDetail();
    return (
        <TabContainer>
            <TabButton
                onClick={() => {
                    setActiveTab('intro');
                }}
                $isActive={activeTab === 'intro'}
            >
                동아리 소개
            </TabButton>
            <TabButton
                onClick={() => setActiveTab('recruit')}
                $isActive={activeTab === 'recruit'}
            >
                모집안내
            </TabButton>
            <TabButton
                disabled={isPreview}
                onClick={() => setActiveTab('log')}
                $isActive={activeTab === 'log'}
            >
                활동로그
            </TabButton>
        </TabContainer>
    );
}

const TabContainer = styled.div`
    width: 320px;
    display: flex;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 9px;
    justify-content: center;
`;

const TabButton = styled.button<TabButtonProps>`
    flex: 1;
    width: auto;
    padding-top: 24px;
    padding-bottom: 7px;
    background: none;
    border: none;
    border-bottom: 2px solid
        ${(props) => (props.$isActive ? '#33639C' : 'transparent')};
    color: #000000;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    &:disabled {
        color: #cccccc;
        cursor: not-allowed;
    }
`;
