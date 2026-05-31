'use strict';

function concatenateStrings(value1, value2) {
    return value1 + value2;
}

function getStringLength(value) {
    return value.length;
}

function getStringFromTemplate(firstName, lastName) {
    return `Hello, ${firstName} ${lastName}!`;
}

function extractNameFromTemplate(value) {
    return value.slice(7, -1);
}

function getFirstChar(value) {
    return value.charAt(0);
}

function removeLeadingAndTrailingWhitespaces(value) {
    return value.trim();
}

function repeatString(value, count) {
    return value.repeat(count);
}

function removeFirstOccurrences(str, value) {
    return str.replace(value, '');
}

function unbracketTag(str) {
    return str.slice(1, -1);
}

function convertToUpperCase(str) {
    return str.toUpperCase();
}

function extractEmails(str) {
    return str.split(';');
}

function getRectangleString(width, height) {
    if (width < 2 || height < 2) return '';

    const top = '┌' + '─'.repeat(width - 2) + '┐\n';
    const mid = '│' + ' '.repeat(width - 2) + '│\n';
    const bottom = '└' + '─'.repeat(width - 2) + '┘\n';

    return top + mid.repeat(height - 2) + bottom;
}

function encodeToRot13(str) {
    return str.replace(/[a-zA-Z]/g, (char) => {
        const base = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
    });
}

function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

function getCardId(value) {
    const suits = ['♣', '♦', '♥', '♠'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    const suit = value.slice(-1);
    const rank = value.slice(0, -1);

    return suits.indexOf(suit) * 13 + ranks.indexOf(rank);
}

module.exports = {
    concatenateStrings,
    getStringLength,
    getStringFromTemplate,
    extractNameFromTemplate,
    getFirstChar,
    removeLeadingAndTrailingWhitespaces,
    repeatString,
    removeFirstOccurrences,
    unbracketTag,
    convertToUpperCase,
    extractEmails,
    getRectangleString,
    encodeToRot13,
    isString,
    getCardId
};