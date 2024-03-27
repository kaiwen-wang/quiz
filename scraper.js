import * as cheerio from 'cheerio';
import * as fs from 'fs';
import RSS from 'rss';

var feed = new RSS(
    {
        title: "FT Top Stories"
    }
);

const url = 'https://ft.com';

async function scrape() {
    const res = await fetch(url);
    const html = await res.text();

    const $ = cheerio.load(html);

    const $mostReads = $('.o-header__mega-column--articles')
    // console.log($mostReads.html());

    const $frontRead = $('.list__items-wrapper').first();

    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    let RSSElement = {
        "title": "FT Most Read: " + formattedDate,
        "description": ""
    };

    $frontRead.find('a').each((index, element) => {
        const href = $(element).attr('href');
        let text = $(element).text();
        text = text.replace('opinion content.', '');
        const link = `<a href="${url}${href}">${text}</a>`;
        RSSElement.description += `${index + 1}. ${link}<br>`;
    });

    feed.item(RSSElement);

    let xml = feed.xml();
    fs.writeFile("rss.xml", xml, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("rss feed saved")
    })

    // const sections = ["World", "Companies", "Markets", "Opinion", "Work/Careers", "Life/Arts"]

    // $mostReads.each((index, element) => {
    //     const allText = $(element).text();
    //     const lines = allText.split('\n');

    //     lines.forEach((line, lineIndex) => {
    //         const trimmedLine = line.trim();
    //         if (trimmedLine) {
    //             console.log(`Line ${lineIndex + 1}: ${trimmedLine}`);
    //         }
    //     });

    //     console.log('\n'); // add a separator between elements
    // });

}

scrape();