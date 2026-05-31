'use strict';

/**
 * 1. Bank Account Parser
 */
function parseBankAccount(bankAccount) {
    const lines = bankAccount.split('\n');
    const digitsMap = [
        [' _ ', '| |', '|_|'], // 0
        ['   ', '  |', '  |'], // 1
        [' _ ', ' _|', '|_ '], // 2
        [' _ ', ' _|', ' _|'], // 3
        ['   ', '|_|', '  |'], // 4
        [' _ ', '|_ ', ' _|'], // 5
        [' _ ', '|_ ', '|_|'], // 6
        [' _ ', '  |', '  |'], // 7
        [' _ ', '|_|', '|_|'], // 8
        [' _ ', '|_|', ' _|']  // 9
    ];

    let result = '';
    for (let i = 0; i < 9; i++) {
        const chunk = [
            lines[0].substring(i * 3, i * 3 + 3),
            lines[1].substring(i * 3, i * 3 + 3),
            lines[2].substring(i * 3, i * 3 + 3)
        ];
        result += digitsMap.findIndex(d => d[0] === chunk[0] && d[1] === chunk[1] && d[2] === chunk[2]);
    }
    return parseInt(result, 10);
}

/**
 * 2. Text Wrapper
 */
function* wrapText(text, columns) {
    const words = text.split(' ');
    let currentLine = [];
    let currentLen = 0;

    for (const word of words) {
        const space = currentLine.length > 0 ? 1 : 0;
        if (currentLen + word.length + space <= columns) {
            currentLine.push(word);
            currentLen += word.length + space;
        } else {
            yield currentLine.join(' ');
            currentLine = [word];
            currentLen = word.length;
        }
    }
    if (currentLine.length > 0) yield currentLine.join(' ');
}

/**
 * 3. Poker Hand Rank
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
};

function getPokerHandRank(hand) {
    const values = hand.map(c => {
        const v = c.slice(0, -1);
        if (v === 'A') return 14;
        if (v === 'K') return 13;
        if (v === 'Q') return 12;
        if (v === 'J') return 11;
        return parseInt(v, 10);
    }).sort((a, b) => a - b);

    const suits = hand.map(c => c.slice(-1));
    const counts = {};
    values.forEach(v => counts[v] = (counts[v] || 0) + 1);

    const valCounts = Object.values(counts).sort((a, b) => b - a);
    const isFlush = new Set(suits).size === 1;
    // Проверка на Straight (включая туз как 1)
    const isStraight = values.every((v, i) => i === 0 || v === values[i - 1] + 1) ||
        JSON.stringify(values) === '[2,3,4,5,14]';

    if (isFlush && isStraight) return PokerRank.StraightFlush;
    if (valCounts[0] === 4) return PokerRank.FourOfKind;
    if (valCounts[0] === 3 && valCounts[1] === 2) return PokerRank.FullHouse;
    if (isFlush) return PokerRank.Flush;
    if (isStraight) return PokerRank.Straight;
    if (valCounts[0] === 3) return PokerRank.ThreeOfKind;
    if (valCounts[0] === 2 && valCounts[1] === 2) return PokerRank.TwoPairs;
    if (valCounts[0] === 2) return PokerRank.OnePair;
    return PokerRank.HighCard;
}

/**
 * 4. Figure Rectangles
 */
function* getFigureRectangles(figure) {
    const lines = figure.split('\n');
    const points = [];
    for (let r = 0; r < lines.length; r++) {
        for (let c = 0; c < lines[r].length; c++) {
            if (lines[r][c] === '+') points.push({ r, c });
        }
    }

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const p1 = points[i], p2 = points[j];
            if (p2.r > p1.r && p2.c > p1.c && lines[p1.r][p2.c] === '+' && lines[p2.r][p1.c] === '+') {
                let rect = '';
                for (let r = p1.r; r <= p2.r; r++) {
                    for (let c = p1.c; c <= p2.c; c++) {
                        if (r === p1.r || r === p2.r) rect += (c === p1.c || c === p2.c) ? '+' : '-';
                        else rect += (c === p1.c || c === p2.c) ? '|' : ' ';
                    }
                    rect += '\n';
                }
                yield rect;
            }
        }
    }
}

module.exports = {
    parseBankAccount: parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};