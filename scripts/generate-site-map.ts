import type { ApiResponseClubIdResponse } from '../src/api/data-contracts';
import fs from 'fs';

const STATIC_PAGES = [
    { loc: 'https://hanjari.site', priority: 1.0, changefreq: 'daily' },
    {
        loc: 'https://hanjari.site/club/search',
        priority: 0.9,
        changefreq: 'weekly',
    },
    { loc: 'https://hanjari.site/notice', priority: 0.7, changefreq: 'weekly' },
    {
        loc: 'https://hanjari.site/resources',
        priority: 0.7,
        changefreq: 'monthly',
    },
    { loc: 'https://hanjari.site/faq', priority: 0.7, changefreq: 'monthly' },
    {
        loc: 'https://hanjari.site/official-accounts',
        priority: 0.7,
        changefreq: 'monthly',
    },
] as const;

const BASE_URL = process.env.VITE_BASE_URL;

interface SitemapUrl {
    loc: string;
    priority: number;
    changefreq:
        | 'always'
        | 'hourly'
        | 'daily'
        | 'weekly'
        | 'monthly'
        | 'yearly'
        | 'never';
    lastmod?: string;
}

function generateSitemapXML(pages: readonly SitemapUrl[]): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
    .map(
        (page) => `\t<url>
\t\t<loc>${page.loc}</loc>
\t\t<changefreq>${page.changefreq}</changefreq>
\t\t<priority>${page.priority}</priority>${
            page.lastmod
                ? `
\t\t<lastmod>${page.lastmod}</lastmod>`
                : ''
        }
\t</url>`,
    )
    .join('\n')}
</urlset>`;
}

async function generateSitemap(): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/clubs/ids`);

        if (!response.ok) {
            throw new Error(`API 호출 실패: ${response.status}`);
        }

        const data: ApiResponseClubIdResponse = await response.json();

        if (!data.isSuccess || !data.result?.clubIds) {
            throw new Error(
                `API 에러: ${
                    data.message || '동아리 목록을 가져올 수 없습니다'
                }`,
            );
        }
        const clubIds = data.result.clubIds;

        const clubPages: SitemapUrl[] = clubIds.map((id) => ({
            loc: `https://hanjari.site/club/${id}`,
            priority: 0.8,
            changefreq: 'monthly',
        }));

        const allPages = [...STATIC_PAGES, ...clubPages];

        const sitemap = generateSitemapXML(allPages);
        fs.writeFileSync('public/sitemap.xml', sitemap);
    } catch {
        const sitemap = generateSitemapXML(STATIC_PAGES);
        fs.writeFileSync('public/sitemap.xml', sitemap);
    }
}

generateSitemap();
