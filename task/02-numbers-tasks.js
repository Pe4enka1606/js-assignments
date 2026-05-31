'use strict';

function getRectangleArea(width, height) {
    return width * height;
}

function getCicleCircumference(radius) {
    return 2 * Math.PI * radius;
}

function getAverage(value1, value2) {
    return (value1 / 2 + value2 / 2);
}

function getDistanceBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getLinearEquationRoot(a, b) {
    return -b / a;
}

function getAngleBetweenVectors(x1, y1, x2, y2) {
    // Формула: dotProduct = |a|*|b|*cos(angle)
    const dotProduct = x1 * x2 + y1 * y2;
    const mod1 = Math.sqrt(x1 * x1 + y1 * y1);
    const mod2 = Math.sqrt(x2 * x2 + y2 * y2);
    return Math.acos(dotProduct / (mod1 * mod2));
}

function getLastDigit(value) {
    return Math.abs(value % 10);
}

function parseNumberFromString(value) {
    return parseFloat(value);
}

function getParallelipidedDiagonal(a, b, c) {
    return Math.sqrt(a * a + b * b + c * c);
}

function roundToPowerOfTen(num, pow) {
    const factor = Math.pow(10, pow);
    return Math.round(num / factor) * factor;
}

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function toNumber(value, def) {
    const result = Number(value);
    return isNaN(result) ? def : result;
}

module.exports = {
    getRectangleArea,
    getCicleCircumference,
    getAverage,
    getDistanceBetweenPoints,
    getLinearEquationRoot,
    getAngleBetweenVectors,
    getLastDigit,
    parseNumberFromString,
    getParallelipidedDiagonal,
    roundToPowerOfTen,
    isPrime,
    toNumber
};