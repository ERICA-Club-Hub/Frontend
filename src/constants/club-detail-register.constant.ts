const recruitStatus = [
    { label: '모집예정', value: 'UPCOMING' },
    { label: '모집중', value: 'OPEN' },
    { label: '모집완료', value: 'CLOSED' },
];

const summaryInfoList = [
    {
        label: '대표 이름',
        name: 'leaderName',
        placeholder: '동아리 대표 이름을 입력해주세요',
    },
    {
        label: '연락처',
        name: 'leaderPhone',
        placeholder: '문의 가능한 연락처를 입력해 주세요.',
    },
    {
        label: '정기모임',
        name: 'activities',
        placeholder: '정기모임 일정을 입력해 주세요',
    },
    {
        label: '회비',
        name: 'membershipFee',
        placeholder: '회비 금액을 입력해 주세요',
    },
    {
        label: 'SNS',
        name: 'snsUrl',
        placeholder: 'SNS 아이디를 입력해주세요 (@ 제외)',
    },
];

const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
];

const clubIntroList = [
    {
        label: '우리 동아리를 소개합니다',
        name: 'introduction',
        placeholder: '동아리를 소개하는 글을 작성해 주세요.',
    },
    {
        label: '이런 활동을 할 수 있어요!',
        name: 'activity',
        placeholder: '동아리의 주요 활동에 대해 작성해 주세요.',
    },
    {
        label: '너, 내 동료가 돼라!',
        name: 'recruitment',
        placeholder: '동아리가 원하는 동아리원에 대해 작성해주세요.',
    },
];

const recruitNoticeList = [
    {
        label: '모집기간',
        name: 'due',
        placeholder: '동아리의 모집 기간을 작성해 주세요.',
    },
    {
        label: '유의사항',
        name: 'notice',
        placeholder: '동아리 신청 시 유의사항에 대해 작성해 주세요.',
    },
    {
        label: '기타 동아리 모집 안내',
        name: 'etc',
        placeholder: '기타 동아리 모집 안내를 작성해 주세요.',
    },
];

export {
    recruitStatus,
    summaryInfoList,
    months,
    clubIntroList,
    recruitNoticeList,
};
