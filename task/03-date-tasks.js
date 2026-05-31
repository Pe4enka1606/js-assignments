'use strict';

function parseDataFromRfc2822(value) {
    return new Date(value);
}

function parseDataFromIso8601(value) {
    return new Date(value);
}

function isLeapYear(date) {
    const year = date.getFullYear();
    // Год високосный, если он делится на 4,
    // но не на 100, либо делится на 400.
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function timeSpanToString(startDate, endDate) {
    const diff = endDate.getTime() - startDate.getTime();

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const ms = diff % 1000;

    // Приводим к формату HH:mm:ss.sss
    const pad = (num, size) => num.toString().padStart(size, '0');

    return `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}.${pad(ms, 3)}`;
}

function angleBetweenClockHands(date) {
    const hours = date.getUTCHours() % 12;
    const minutes = date.getUTCMinutes();

    // Позиция часовой стрелки: (часы + минуты/60) * 30 градусов
    const hourAngle = (hours + minutes / 60) * 30;
    // Позиция минутной стрелки: минуты * 6 градусов
    const minuteAngle = minutes * 6;

    let angle = Math.abs(hourAngle - minuteAngle);

    // Берем меньший угол между ними
    if (angle > 180) angle = 360 - angle;

    // Переводим в радианы
    return (angle * Math.PI) / 180;
}

module.exports = {
    parseDataFromRfc2822,
    parseDataFromIso8601,
    isLeapYear,
    timeSpanToString,
    angleBetweenClockHands
};