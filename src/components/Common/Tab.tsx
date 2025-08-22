import styled from 'styled-components';

interface TabItemProps {
    tabKey: string;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    activeTab: string;
    onTabChange: (tabKey: string) => void;
}

interface TabContainerProps {
    children: React.ReactNode;
    width?: string;
    className?: string;
    backgroundColor?: string;
}

const TabItem = ({
    tabKey,
    children,
    disabled = false,
    className,
    activeTab,
    onTabChange,
}: TabItemProps) => {
    const isActive = activeTab === tabKey;

    return (
        <TabButton
            onClick={() => !disabled && onTabChange(tabKey)}
            $isActive={isActive}
            disabled={disabled}
            className={className}
        >
            {children}
        </TabButton>
    );
};

const TabContainer = ({
    children,
    width = '320px',
    className,
    backgroundColor = 'none',
}: TabContainerProps) => {
    return (
        <StyledTabContainer
            width={width}
            className={className}
            $backgroundColor={backgroundColor}
        >
            {children}
        </StyledTabContainer>
    );
};

TabContainer.Item = TabItem;
const Tab = TabContainer;

const StyledTabContainer = styled.div<{
    width: string;
    $backgroundColor: string;
}>`
    width: ${(props) => props.width};
    display: flex;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 9px;
    justify-content: center;
    background-color: ${(props) => props.$backgroundColor};
`;

const TabButton = styled.button<{
    $isActive: boolean;
}>`
    flex: 1;
    width: auto;
    padding-top: 24px;
    padding-bottom: 7px;
    border: none;
    border-bottom: 2px solid
        ${(props) => (props.$isActive ? '#33639C' : 'transparent')};
    color: ${(props) => (props.disabled ? '#cccccc' : '#000000')};
    font-weight: 500;
    font-size: 14px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    transition: all 0.2s ease;

    &:hover {
        opacity: ${(props) => (props.disabled ? 1 : 0.8)};
    }

    &:disabled {
        color: #cccccc;
        cursor: not-allowed;
    }
`;

export default Tab;
