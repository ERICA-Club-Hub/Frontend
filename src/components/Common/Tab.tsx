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
            disabled={disabled}
            className={className}
        >
            <TabText $isActive={isActive}>{children}</TabText>
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
    height: 47px;
    display: flex;
    margin-bottom: 9px;
    justify-content: center;
    background-color: ${(props) => props.$backgroundColor};
`;

const TabButton = styled.button`
    flex: 1;
    width: auto;
    padding-top: 24px;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    transition: all 0.2s ease;

    &:hover {
        opacity: 0.8;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 1;
    }
`;

const TabText = styled.span<{
    $isActive: boolean;
}>`
    display: inline-block;
    padding-bottom: 7px;
    border-bottom: 2px solid
        ${(props) => (props.$isActive ? '#33639C' : 'transparent')};
    color: #000000;
    font-weight: ${(props) => (props.$isActive ? '600' : '400')};
    font-size: 14px;
    transition: all 0.2s ease;

    ${TabButton}:disabled & {
        color: #cccccc;
    }
`;

export default Tab;
