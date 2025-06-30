import * as cheerio from 'cheerio';

export type TocItem = {
  id: string;
  tag: 'h1' | 'h2' | 'h3';
  text: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove punctuation
    .trim()
    .replace(/\s+/g, '-');
}

export function extractTocFromHtml(html: string): { toc: TocItem[]; html: string } {
  const $ = cheerio.load(html);
  const toc: TocItem[] = [];
  const usedIds = new Set<string>();

  $('h1, h2, h3').each((_, el) => {
    const tag = el.tagName as TocItem['tag'];
    const text = $(el).text().trim();
    if (!text) return;

    let id = slugify(text);
    let suffix = 1;
    while (usedIds.has(id)) {
      id = `${id}-${suffix++}`;
    }
    usedIds.add(id);

    $(el).attr('id', id); // ⬅️ Add the id to the element
    toc.push({ id, tag, text });
  });

  return {
    toc,
   html: $('body').html() || ''
// return modified HTML with heading IDs
  };
}
