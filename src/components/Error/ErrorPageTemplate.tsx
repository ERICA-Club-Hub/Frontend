import Button from '../Button/Button';

export interface ErrorPageContent {
    title: string;
    description: string;
    buttonLabel: string;
}

interface ErrorPageTemplateProps {
    content: ErrorPageContent;
    onButtonClick?: () => void;
}

export default function ErrorPageTemplate({
    content,
    onButtonClick,
}: ErrorPageTemplateProps) {
    return (
        <div className="w-full h-[calc(100vh-55px)] flex flex-col justify-center items-center">
            <h1 className="mb-[8px] text-s2 text-neutral-900">
                {content.title}
            </h1>
            <p className="mb-[20px] text-b4 text-neutral-600">
                {content.description}
            </p>
            <Button size="lg" onClick={onButtonClick}>
                {content.buttonLabel}
            </Button>
        </div>
    );
}
