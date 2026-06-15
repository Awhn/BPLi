// Server-side share card rendering (CLAUDE.md §10.1). SVG keeps fonts and
// emoji consistent across devices without a headless browser; raster export
// can layer on top later via resvg/sharp.
import type { Quote, Book } from '$lib/types';

export type CardRatio = 'story' | 'square';

const SIZES: Record<CardRatio, { width: number; height: number }> = {
	story: { width: 1080, height: 1920 },
	square: { width: 1080, height: 1080 }
};

function escapeXml(text: string): string {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

// Greedy line wrap tuned for CJK: roughly equal-width glyphs
function wrapText(text: string, maxChars: number): string[] {
	const lines: string[] = [];
	let current = '';
	for (const word of text.split(' ')) {
		const candidate = current ? `${current} ${word}` : word;
		if (candidate.length > maxChars && current) {
			lines.push(current);
			current = word;
		} else {
			current = candidate;
		}
	}
	if (current) lines.push(current);
	return lines;
}

export function renderQuoteCardSvg(
	quote: Quote,
	book: Book | null,
	comment: string | null,
	ratio: CardRatio = 'story'
): string {
	const { width, height } = SIZES[ratio];
	const padding = 96;
	const quoteFontSize = 52;
	const lineHeight = quoteFontSize * 1.7;

	const quoteLines = wrapText(`“${quote.text}”`, 18);
	const commentLines = comment ? wrapText(comment, 26) : [];

	const blockHeight =
		quoteLines.length * lineHeight + (commentLines.length ? commentLines.length * 48 + 60 : 0);
	let y = (height - blockHeight) / 2;

	const quoteTspans = quoteLines
		.map(
			(line, i) =>
				`<tspan x="${padding}" y="${y + i * lineHeight}">${escapeXml(line)}</tspan>`
		)
		.join('');

	y += quoteLines.length * lineHeight + 60;
	const commentTspans = commentLines
		.map((line, i) => `<tspan x="${padding + 36}" y="${y + i * 48}">${escapeXml(line)}</tspan>`)
		.join('');

	const footerY = height - padding - 70;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
	<rect width="${width}" height="${height}" fill="#f4efe6"/>
	<text font-family="'Noto Serif KR', Georgia, serif" font-size="${quoteFontSize}" font-weight="600" fill="#2a2433">${quoteTspans}</text>
	${
		commentLines.length
			? `<rect x="${padding}" y="${y - 36}" width="6" height="${commentLines.length * 48 + 12}" fill="#2a243333"/>
	<text font-family="'Pretendard', sans-serif" font-size="34" fill="#2a2433b3">${commentTspans}</text>`
			: ''
	}
	${
		book
			? `<text x="${padding}" y="${footerY}" font-family="'Pretendard', sans-serif" font-size="36" font-weight="700" fill="#2a2433">${escapeXml(book.title)}</text>
	<text x="${padding}" y="${footerY + 50}" font-family="'Pretendard', sans-serif" font-size="30" fill="#2a243399">${escapeXml(book.author)}</text>`
			: ''
	}
	<text x="${width - padding}" y="${height - padding}" text-anchor="end" font-family="'Pretendard', sans-serif" font-size="32" font-weight="700" letter-spacing="6" fill="#8e6aff">B PLi</text>
</svg>`;
}
