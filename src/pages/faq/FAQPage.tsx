import Accordion from '@/components/Accordion/Accordion';

interface FAQItem {
    title: string;
    content: React.ReactNode;
}

const FAQ_ITEMS: FAQItem[] = [
    {
        title: '동아리 등록 방법',
        content: (
            <>
                1. 우측 상단 메뉴에서 <strong>어드민 로그인</strong>을
                클릭합니다. <br /> <br />
                2. 하단에 있는 <strong>동아리 등록하기</strong>를 클릭합니다.{' '}
                <br /> <br />
                3. 요청 승인 후 로그인 코드는 입력된 대표자 이메일로 전송됩니다.
            </>
        ),
    },
    {
        title: '모든 동아리가 등록되어 있나요?',
        content:
            '한자리는 동아리 신청을 끊임없이 받고 있습니다. 현재 약 50개의 동아리가 등록되어있습니다',
    },
    {
        title: '중앙 동아리가 아니어도 플랫폼에 동아리를 등록할 수 있나요?',
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

export default function FAQPage() {
    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-[320px] flex flex-col">
                <div className="text-s1 my-5">자주 묻는 질문</div>
                <div className="flex flex-col gap-2">
                    {FAQ_ITEMS.map((item) => (
                        <Accordion
                            key={item.title}
                            title={item.title}
                            content={item.content}
                            wrapTitle
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
