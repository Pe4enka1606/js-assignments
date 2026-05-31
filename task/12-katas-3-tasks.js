'use strict';

/**
 * 1. Find String in Snaking Puzzle (DFS/Backtracking)
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    const rows = puzzle.length;
    const cols = puzzle[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    function dfs(r, c, index) {
        if (index === searchStr.length) return true;
        if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r][c] || puzzle[r][c] !== searchStr[index]) return false;

        visited[r][c] = true;
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        for (const [dr, dc] of directions) {
            if (dfs(r + dr, c + dc, index + 1)) return true;
        }
        visited[r][c] = false;
        return false;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (dfs(r, c, 0)) return true;
        }
    }
    return false;
}

/**
 * 2. Get Permutations (Recursive Generator)
 */
function* getPermutations(chars) {
    if (chars.length <= 1) {
        yield chars;
        return;
    }
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const remainingChars = chars.slice(0, i) + chars.slice(i + 1);
        for (const p of getPermutations(remainingChars)) {
            yield char + p;
        }
    }
}

/**
 * 3. Most Profit from Stock Quotes (Greedy from back to front)
 */
function getMostProfitFromStockQuotes(quotes) {
    let profit = 0;
    let maxPrice = 0;
    for (let i = quotes.length - 1; i >= 0; i--) {
        if (quotes[i] > maxPrice) {
            maxPrice = quotes[i];
        } else {
            profit += (maxPrice - quotes[i]);
        }
    }
    return profit;
}

/**
 * 4. URL Shortener (Base64-like encoding)
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {
    encode: function(url) {
        // Превращаем строку в массив символов, а затем перекодируем в base64 или аналог
        return btoa(encodeURIComponent(url)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    },
    decode: function(code) {
        code = code.replace(/-/g, '+').replace(/_/g, '/');
        // Добавляем паддинг '=' для корректного btoa
        while (code.length % 4 !== 0) code += '=';
        return decodeURIComponent(atob(code));
    }
};

module.exports = {
    findStringInSnakingPuzzle,
    getPermutations,
    getMostProfitFromStockQuotes,
    UrlShortener
};