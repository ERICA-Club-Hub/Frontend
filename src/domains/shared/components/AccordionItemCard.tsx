import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { Tag } from '../../../components/Common/Tag';
import downloadIcon from '@/assets/common/card_download.svg';
import rightArrowIcon from '@/assets/common/card_right_arrow.svg';

interface CardProps {
    $variant?: 'unionNotice' | 'serviceNotice' | 'resources' | 'FAQ';
    $imagePath?: string;
    title: string | React.ReactNode;
    date?: string;
    questionType?: string;
    onClick?: () => void;
    isRotated?: boolean;
}

const cardVariants = cva(
    'w-[320px] h-[71px] relative flex rounded-[10px] bg-white border border-[#f7f7f7] items-center cursor-pointer p-0 transition-colors duration-200 ease-in-out hover:bg-[#f5f5f5]',
    {
        variants: {
            variant: {
                unionNotice: '',
                serviceNotice: 'px-[20px]',
                resources: 'px-[20px]',
                FAQ: 'px-[20px]',
            },
        },
        defaultVariants: {
            variant: 'unionNotice',
        },
    },
);

// TODO: headless ui로 대체 가능성 검토
// 현재 FAQ, 공지사항, 자료실 페이지 에서 사용 중
const AccordionItemCard = ({
    $variant = 'unionNotice',
    $imagePath,
    title,
    date,
    questionType,
    onClick,
    isRotated,
}: CardProps) => {
    return (
        <button
            className={cn(cardVariants({ variant: $variant }))}
            onClick={onClick}
            type="button"
        >
            {$variant === 'unionNotice' && (
                <>
                    <div
                        className="w-[55px] h-[55px] flex-shrink-0 rounded-[5px] mx-[15px] my-[8px] ml-[8px] bg-neutral-600"
                        style={{
                            background: $imagePath
                                ? `url(${$imagePath}) lightgray 50% / cover no-repeat`
                                : 'lightgray',
                        }}
                    />
                    <div className="flex flex-col gap-[5px] py-[18px] px-0 pb-[17px] w-full">
                        <div className="text-[#232323] text-body-03 font-semibold leading-normal text-left">
                            {title}
                        </div>
                        <div className="text-neutral-600 text-caption font-medium leading-normal text-left">
                            {date}
                        </div>
                    </div>
                </>
            )}

            {$variant === 'serviceNotice' && (
                <>
                    <div className="flex flex-col gap-[5px] py-[18px] px-0 pb-[17px] w-full">
                        <div className="text-[#232323] text-body-03 font-semibold leading-normal text-left">
                            {title}
                        </div>
                        <div className="text-neutral-600 text-caption font-medium leading-normal text-left">
                            {date}
                        </div>
                    </div>
                    <img
                        src={rightArrowIcon}
                        alt="right arrow"
                        className={cn(
                            'w-[24px] h-[24px] ml-auto transition-transform duration-300 ease-in-out',
                            isRotated ? 'rotate-90' : 'rotate-0',
                        )}
                    />
                </>
            )}

            {$variant === 'resources' && (
                <>
                    <div className="flex flex-col gap-[5px] py-[18px] px-0 pb-[17px] w-full">
                        <div className="text-[#232323] text-body-03 font-semibold leading-normal text-left">
                            {title}
                        </div>
                        <div className="text-neutral-600 text-caption font-medium leading-normal text-left">
                            {date}
                        </div>
                    </div>
                    <img
                        src={downloadIcon}
                        alt="download icon"
                        className="w-[24px] h-[24px] ml-auto"
                    />
                </>
            )}

            {$variant === 'FAQ' && (
                <>
                    <div className="flex flex-col gap-[5px] py-[18px] px-0 pb-[17px] w-full">
                        <div className="text-[#232323] text-body-03 font-semibold leading-normal text-left">
                            {title}
                        </div>
                        <div className="flex flex-wrap">
                            <Tag type="동아리 및 질문">{questionType}</Tag>
                        </div>
                    </div>
                    <img
                        src={rightArrowIcon}
                        alt="right arrow"
                        className={cn(
                            'w-[24px] h-[24px] ml-auto transition-transform duration-300 ease-in-out',
                            isRotated ? 'rotate-90' : 'rotate-0',
                        )}
                    />
                </>
            )}
        </button>
    );
};

export default AccordionItemCard;
