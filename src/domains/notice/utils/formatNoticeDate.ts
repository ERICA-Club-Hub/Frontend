export const formatNoticeDate = (isoString: string): string =>
    new Date(isoString)
        .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        .replace(/\. /g, '.')
        .replace(/\.$/, '');
