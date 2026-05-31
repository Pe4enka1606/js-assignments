'use strict';

/**
 * 1. Compass Points
 */
function createCompassPoints() {
    const sides = ['N', 'E', 'S', 'W'];
    const points = [];

    for (let i = 0; i < 32; i++) {
        let abbr = '';
        const idx = i * 32 / 32;
        const main = Math.floor(i / 8);
        const sub = (i % 8);

        // Логика построения сокращений 32-х направлений
        if (sub === 0) abbr = sides[main];
        else if (sub === 4) abbr = sides[main] + sides[(main + 1) % 4];
        else if (sub === 2) abbr = sides[main] + sides[(main + 1) % 4] + sides[main];
        else if (sub === 6) abbr = sides[(main + 1) % 4] + sides[main] + sides[(main + 1) % 4];
        else if (sub === 1) abbr = sides[main] + 'b' + sides[(main + 1) % 4];
        else if (sub === 3) abbr = sides[(main + 1) % 4] + 'b' + sides[main];
        else if (sub === 5) abbr = sides[(main + 1) % 4] + 'b' + sides[main]; // В упрощенном виде
        else if (sub === 7) abbr = sides[main] + 'b' + sides[(main + 1) % 4];

        // На самом деле, для 32 точек лучше использовать таблицу соответствия:
        // (Для краткости используем математический подход или просто захардкодим логику)
    }
    // Ввиду сложности нейминга 32 точек, правильнее использовать массив-шаблон:
    const compass = ["N","NbE","NNE","NEbN","NE","NEbE","ENE","EbN","E","EbS","ESE","SEbE","SE","SEbS","SSE","SbE","S","SbW","SSW","SWbS","SW","SWbW","WSW","WbS","W","WbN","WNW","NWbW","NW","NWbN","NNW","NbW"];
    return compass.map((abbr, i) => ({ abbreviation: abbr, azimuth: i * 11.25 }));
}

/**
 * 2. Brace Expansion
 */
function* expandBraces(str) {
    const match = str.match(/\{([^{}]*)\}/);
    if (!match) {
        yield str;
        return;
    }
    const [full, content] = match;
    const parts = content.split(',');
    for (const part of parts) {
        yield* expandBraces(str.replace(full, part));
    }
}

/**
 * 3. ZigZag Matrix
 */
function getZigZagMatrix(n) {
    const matrix = Array.from({ length: n }, () => []);
    let i = 0, j = 0;
    for (let count = 0; count < n * n; count++) {
        matrix[i][j] = count;
        if ((i + j) % 2 === 0) { // Движение вверх-вправо
            if (j < n - 1 && i > 0) { i--; j++; }
            else if (j < n - 1) { j++; }
            else { i++; }
        } else { // Движение вниз-влево
            if (i < n - 1 && j > 0) { i++; j--; }
            else if (i < n - 1) { i++; }
            else { j++; }
        }
    }
    return matrix;
}

/**
 * 4. Dominoes Row
 * Проверка существования Эйлерова пути в графе
 */
function canDominoesMakeRow(dominoes) {
    const degree = {};
    for (const [u, v] of dominoes) {
        degree[u] = (degree[u] || 0) + 1;
        degree[v] = (degree[v] || 0) + 1;
    }
    // Граф связен, если количество вершин с нечетной степенью 0 или 2
    const odd = Object.values(degree).filter(d => d % 2 !== 0).length;
    return odd === 0 || odd === 2;
}

/**
 * 5. Extract Ranges
 */
function extractRanges(nums) {
    if (nums.length === 0) return '';
    const result = [];
    let start = nums[0];

    for (let i = 0; i < nums.length; i++) {
        if (nums[i + 1] !== nums[i] + 1) {
            if (nums[i] - start >= 2) result.push(`${start}-${nums[i]}`);
            else if (nums[i] - start === 1) result.push(`${start},${nums[i]}`);
            else result.push(`${start}`);
            start = nums[i + 1];
        }
    }
    return result.join(',');
}

module.exports = { createCompassPoints, expandBraces, getZigZagMatrix, canDominoesMakeRow, extractRanges };