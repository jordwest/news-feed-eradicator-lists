import { regionId, siteId, type Site } from "../types/sitelist";

export const site: Site = {
			id: siteId('twitter'),
			title: 'Twitter/X',
			hosts: ['x.com'],
			paths: ['/home', '/'],
			regions: [
				{
					id: regionId('home-timeline'),
					title: 'Main feed',
					type: 'hide',
					paths: 'inherit',
					selectors: [
						// New X web app (late 2026): no data-testid attributes; timelines are rendered inside a div with id "urt:<timeline>"
						'main section[aria-labelledby]:has([id^="urt:"])',
						// Legacy X web app
						'div[data-testid="primaryColumn"] > div > div > section[role="region"]',
						'div[aria-label="Home timeline"] > div > section[role="region"]', // Fallback but only works if X is set to English
					],
					inject: {
						mode: 'overlay',
					}
				},
				{
					id: regionId('explore-posts'),
					title: 'Explore "Posts For You"',
					type: 'remove',
					paths: ['/explore'],
					selectors: [
						'main li[data-index]:has(article)',
						'div[data-testid="primaryColumn"] div[data-testid="cellInnerDiv"]:has(article[data-testid="tweet"])',
					],
				},
				{
					id: regionId('todays-news'),
					title: "Today's News",
					type: 'remove',
					paths: '*',
					selectors: [
						'aside section:has(a[href^="/i/trending/"])',
						'div:has(> div[data-testid="news_sidebar"])',
						'div:has(> div[data-testid^="news_sidebar_article_"])'
					],
				},
				{
					id: regionId('trending'),
					title: "Trending now/What's happening",
					type: 'remove',
					paths: '*',
					selectors: [
						'aside section:has([id^="urt:explore-sidebar"])',
						'section:has(div[aria-label="Timeline: Trending now"])',
						'div[aria-label="Timeline: Trending now"]'
					],

				}
			]
		}

export default site;
