import fetch from 'node-fetch';
import RSSParser from 'rss-parser';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const RSS_URLS = [
    'http://phulkor.tumblr.com/rss',
    'https://banana-waza.tumblr.com/rss',
    'https://manascrwd.tumblr.com/'
];
const LOCAL_XML_PATHS = [
    join(process.cwd(), 'scripts', 'phulkor_rss.xml'),
    join(process.cwd(), 'scripts', 'banana-waza_rss.xml'),
    join(process.cwd(), 'scripts', 'manascrwd_rss.xml'),
];
const OUTPUT_FILE = join(process.cwd(), 'static', 'data', 'feeds.json');

const fetchFeed = async (url) => {
    try {
        // Attempt to fetch the RSS feed from the URL
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch from URL: ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.warn(`Fetching from URL (${url}) failed, falling back to local file if available:`, error.message);
        return null;
    }
};

const parseLocalFile = (localPath) => {
    try {
        // Read the local XML file if it exists
        if (existsSync(localPath)) {
            return readFileSync(localPath, 'utf-8');
        } else {
            throw new Error(`Local XML file (${localPath}) does not exist`);
        }
    } catch (error) {
        console.error('Failed to read local file:', error.message);
        throw error;
    }
};

const main = async () => {
    const parser = new RSSParser();
    let allFeedItems = [];

    for (const url of RSS_URLS) {
        let rssText = await fetchFeed(url);

        // If the remote fetch failed, try parsing the local file instead
        if (!rssText) {
            const localFilePath = LOCAL_XML_PATHS[RSS_URLS.indexOf(url)] || LOCAL_XML_PATHS[0]; // Fallback to the first local file
            rssText = parseLocalFile(localFilePath);
        }

        try {
            // Parse the RSS feed
            const feed = await parser.parseString(rssText);

            // Add the items from this feed to the combined feed items array
            const feedItems = feed.items.map(item => ({
                title: item.title,
                link: item.link,
                date: new Date(item.pubDate), // Convert date to Date object for easier sorting
            }));

            allFeedItems = [...allFeedItems, ...feedItems];
        } catch (error) {
            console.error('Failed to parse RSS feed:', error.message);
        }
    }

    // Sort all items by date (newest first)
    allFeedItems.sort((a, b) => b.date - a.date);

    // Write the JSON data to a file
    writeFileSync(OUTPUT_FILE, JSON.stringify(allFeedItems, null, 2));

    console.log('RSS feeds fetched, merged, and sorted by date successfully.');
};

main();
