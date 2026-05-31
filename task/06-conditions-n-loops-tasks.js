'use strict';

function getFizzBuzz(num) {
    if (num % 3 === 0 && num % 5 === 0) return 'FizzBuzz';
    if (num % 3 === 0) return 'Fizz';
    if (num % 5 === 0) return 'Buzz';
    return num;
}

function getFactorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function getSumBetweenNumbers(n1, n2) {
    let sum = 0;
    const min = Math.min(n1, n2);
    const max = Math.max(n1, n2);
    for (let i = min; i <= max; i++) sum += i;
    return sum;
}

function isTriangle(a, b, c) {
    return (a + b > c) && (a + c > b) && (b + c > a);
}

function doRectanglesOverlap(rect1, rect2) {
    return !(rect1.left + rect1.width <= rect2.left ||
        rect2.left + rect2.width <= rect1.left ||
        rect1.top + rect1.height <= rect2.top ||
        rect2.top + rect2.height <= rect1.top);
}

function isInsideCircle(circle, point) {
    const dx = point.x - circle.center.x;
    const dy = point.y - circle.center.y;
    return Math.sqrt(dx * dx + dy * dy) < circle.radius;
}

function findFirstSingleChar(str) {
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (str.indexOf(char) === str.lastIndexOf(char)) return char;
    }
    return null;
}

function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    const start = isStartIncluded ? '[' : '(';
    const end = isEndIncluded ? ']' : ')';
    return `${start}${min}, ${max}${end}`;
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

function reverseInteger(num) {
    const reversed = parseInt(num.toString().split('').reverse().join(''));
    return num < 0 ? -reversed : reversed;
}

function isCreditCardNumber(ccn) {
    const digits = ccn.toString().split('').map(Number);
    let sum = 0;
    for (let i = digits.length - 2; i >= 0; i -= 2) {
        let doubled = digits[i] * 2;
        digits[i] = doubled > 9 ? doubled - 9 : doubled;
    }
    for (let digit of digits) sum += digit;
    return sum % 10 === 0;
}

function getDigitalRoot(num) {
    return (num - 1) % 9 + 1;
}

function isBracketsBalanced(str) {
    const stack = [];
    const map = { ')': '(', ']': '[', '}': '{', '>': '<' };
    for (let char of str) {
        if ('([{<'.includes(char)) {
            stack.push(char);
        } else if (map[char]) {
            if (stack.pop() !== map[char]) return false;
        }
    }
    return stack.length === 0;
}

function timespanToHumanString(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffMs = end - start;
    const diffSec = diffMs / 1000;
    const diffMin = diffSec / 60;
    const diffHour = diffMin / 60;
    const diffDay = diffHour / 24;

    // 1. Секунды
    if (diffSec <= 45) return 'a few seconds ago';
    if (diffSec <= 90) return 'a minute ago';

    // 2. Минуты
    if (diffMin < 45) return Math.floor(diffMin) + ' minutes ago';
    if (diffMin <= 90) return 'an hour ago';

    // 3. Часы
    if (diffHour < 22) return Math.floor(diffHour) + ' hours ago';
    if (diffHour <= 36) return 'a day ago';

    // 4. Дни
    if (diffDay < 25) return Math.floor(diffDay) + ' days ago';

    // 5. Месяцы (приблизительный расчет)
    // Тесты показывают, что переход к "2 months" происходит около 45-46 дня
    const diffMonth = diffDay / 30.44; // Среднее количество дней в месяце
    if (diffMonth < 1.5) return 'a month ago';
    if (diffMonth < 11.5) return Math.floor(diffMonth) + ' months ago';

    // 6. Годы
    if (diffMonth < 18) return 'a year ago';
    return Math.floor(diffMonth / 12) + ' years ago';
}

function toNaryString(num, n) {
    return num.toString(n);
}

function getCommonDirectoryPath(pathes) {
    if (!pathes || pathes.length === 0) return '';

    // Если любой путь не является абсолютным (не начинается с /),
    // общего пути быть не может (согласно тестам)
    if (pathes.some(p => !p.startsWith('/'))) return '';

    // Разрезаем пути на части
    const partsList = pathes.map(path => path.split('/').filter(p => p !== ''));

    let common = [];
    const firstPathParts = partsList[0];

    // Проходим по частям первого пути
    for (let i = 0; i < firstPathParts.length; i++) {
        const segment = firstPathParts[i];

        // Проверяем, есть ли этот сегмент во всех остальных путях на той же позиции
        if (pathes.every(path => {
            const parts = path.split('/').filter(p => p !== '');
            return parts[i] === segment;
        })) {
            common.push(segment);
        } else {
            break;
        }
    }

    // Если нашли общие папки, возвращаем их, иначе - просто корень
    return '/' + common.join('/') + (common.length > 0 ? '/' : '');
}

function getMatrixProduct(m1, m2) {
    const result = new Array(m1.length).fill(0).map(() => new Array(m2[0].length).fill(0));
    return result.map((row, i) =>
        row.map((val, j) =>
            m1[i].reduce((sum, elm, k) => sum + (elm * m2[k][j]), 0)
        )
    );
}

function evaluateTicTacToePosition(pos) {
    const lines = [
        ...pos,
        [pos[0][0], pos[1][0], pos[2][0]], [pos[0][1], pos[1][1], pos[2][1]], [pos[0][2], pos[1][2], pos[2][2]],
        [pos[0][0], pos[1][1], pos[2][2]], [pos[0][2], pos[1][1], pos[2][0]]
    ];
    for (let line of lines) {
        if (line[0] && line[0] === line[1] && line[1] === line[2]) return line[0];
    }
}
module.exports = {
    getFizzBuzz: getFizzBuzz,
    getFactorial: getFactorial,
    getSumBetweenNumbers: getSumBetweenNumbers,
    isTriangle: isTriangle,
    doRectanglesOverlap: doRectanglesOverlap,
    isInsideCircle: isInsideCircle,
    findFirstSingleChar: findFirstSingleChar,
    getIntervalString : getIntervalString,
    reverseString: reverseString,
    reverseInteger: reverseInteger,
    isCreditCardNumber: isCreditCardNumber,
    getDigitalRoot: getDigitalRoot,
    isBracketsBalanced: isBracketsBalanced,
    timespanToHumanString : timespanToHumanString,
    toNaryString: toNaryString,
    getCommonDirectoryPath: getCommonDirectoryPath,
    getMatrixProduct: getMatrixProduct,
    evaluateTicTacToePosition : evaluateTicTacToePosition
};
