import Card from '@/components/Common/Card';
import { useState } from 'react';

interface NoticeItem {
    title: React.ReactNode | string;
    questionType: string;
    content: React.ReactNode | string;
}

const FAQPage = () => {
    const [rotatedStates, setRotatedStates] = useState<{
        [key: number]: boolean;
    }>({});

    const noticeItems: NoticeItem[] = [
        {
            title: '동아리 등록 방법',
            questionType: '서비스질문',
            content: (
                <>
                    1. 우측 상단 메뉴에서 <strong>어드민 로그인</strong>을
                    클릭합니다. <br /> <br />
                    2. 하단에 있는 <strong>동아리 등록하기</strong>를
                    클릭합니다. <br /> <br />
                    3. 요청 승인 후 로그인 코드는 입력된 대표자 이메일로
                    전송됩니다.
                </>
            ),
        },
        {
            title: '모든 동아리가 등록되어 있나요?',
            questionType: '서비스질문',
            content: '아니요, 현재는 일부 동아리만 등록되어 있는 상태입니다.',
        },
        {
            title: (
                <>
                    중앙 동아리가 아니어도 플랫폼에 <br />
                    동아리를 등록할 수 있나요?
                </>
            ),
            questionType: '서비스질문',
            content: (
                <>
                    네! 하지만 현재 한자리는 중앙동아리를 기준으로
                    <br /> 카테고리를 나누었기 때문에
                    <br /> 맞는 카테고리가 없을 수도 있습니다.
                    <br />
                    <br /> 필요한 부분이 있다면 메일로 문의해주세요!
                </>
            ),
        },
    ];

    const handleCardClick = (index: number) => {
        setRotatedStates((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-[320px] flex flex-col">
                <div className="text-body-01 font-semibold text-black my-5">
                    FAQ 페이지
                </div>
                <div className="flex flex-col w-full">
                    {noticeItems.map((item, index) => (
                        <div key={index} className="flex flex-col w-full pb-2">
                            <Card
                                $variant="FAQ"
                                title={item.title}
                                questionType={item.questionType}
                                isRotated={rotatedStates[index]}
                                onClick={() => handleCardClick(index)}
                            />
                            <div
                                className={`w-[320px] flex-shrink-0 rounded-[10px] border border-neutral-300 bg-white overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                                    rotatedStates[index]
                                        ? 'max-h-[200px]'
                                        : 'max-h-0'
                                }`}
                            >
                                <div className="w-[320px] text-body-03 font-medium text-neutral-700 leading-[18px] p-5 whitespace-pre-line">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { FAQPage };
