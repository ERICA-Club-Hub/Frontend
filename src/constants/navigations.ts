const adminNavigationMenus = [
    {
        title: '어드민 페이지',
        adminType: ['union', 'service'],
        url: '/admin/union',
    },
    {
        title: '어드민 페이지',
        adminType: ['club'],
        url: '/admin/club',
    },
];

const navigationMenus = [
    // {
    //     title: '총동연 공지사항',
    //     adminType: ['user'],
    //     url: '/union/notice',
    // },
    {
        title: '자료실',
        adminType: ['user'],
        url: '/resources',
    },
    {
        title: '서비스 공지사항',
        adminType: ['user'],
        url: '/club/notice',
    },
    {
        title: '자주 묻는 질문',
        adminType: ['user'],
        url: '/faq',
    },
];

const clubDetailNavigations = [
    { id: 1, nav: '동아리 소개' },
    { id: 2, nav: '모집안내' },
    { id: 3, nav: '활동로그' },
];

const clubDetailRegisterNavigations = [
    { id: 1, nav: '요약 정보' },
    { id: 2, nav: '동아리 소개' },
    { id: 3, nav: '모집안내' },
];

// const loginNavigations = [
//     { id: 1, nav: '동아리 대표 로그인' },
//     { id: 2, nav: '총동연 로그인' },
// ];

const clubCategory = [
    { label: '봉사분과', name: 'VOLUNTEER' },
    { label: '예술분과', name: 'ART' },
    { label: '종교분과', name: 'RELIGION' },
    { label: '체육분과', name: 'SPORTS' },
    { label: '학술교양분과', name: 'ACADEMIC' },
    { label: '연합동아리', name: 'UNION' },
];

export {
    adminNavigationMenus,
    navigationMenus,
    clubDetailNavigations,
    clubDetailRegisterNavigations,
    clubCategory,
};
