'use strict';

/**
 * GUID: '{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}'
 */
function getRegexForGuid() {
    // ^\{ начало, [0-9a-fA-F]{8} - 8 символов, дальше группы по 4,4,4,12 с дефисами
    return /^\{[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}$/;
}

/**
 * Ограничение по длине < 13 символов.
 * Подходит под: 'pit', 'spot', 'spate', 'slap two', 'respite'
 * Не подходит: ' pt', 'Pot', 'peat', 'part'
 */
/**
 * Returns the regexp that matches all the strings from first column
 * but of them from the second
 */
function getRegexForPitSpot() {
    // /[pt]it|sp|la/ - это слишком коротко, но нам нужно покрыть все слова.
    // Лучший вариант, который проходит тесты и короче 13 символов:
    return /pi|sp|la|re/;
}

/**
 * IPv4: 0-255.0-255.0-255.0-255
 */
function getRegexForIPv4() {

    const octet = '(?:0*([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))';
    return new RegExp(`^${octet}\\.${octet}\\.${octet}\\.${octet}$`);
}

/**
 * SSN: XXX-XX-XXXX, где группы не могут быть 000, 00, 0000
 */
function getRegexForSSN() {
    // (?!000)\d{3} - негативный просмотр, чтобы группа не была 000
    return /^(?!000)\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;
}

/**
 * Валидатор пароля: minLength, нижний регистр, верхний, цифра, только буквы и цифры.
 */
function getPasswordValidator(minLength) {
    // (?=.*[a-z]) - хотя бы одна строчная
    // (?=.*[A-Z]) - хотя бы одна заглавная
    // (?=.*\d) - хотя бы одна цифра
    // ^[a-zA-Z0-9]{minLength,}$ - проверка на длину и состав
    return new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9]{${minLength},}$`);
}

module.exports = {
    getRegexForGuid,
    getRegexForPitSpot,
    getRegexForIPv4,
    getRegexForSSN,
    getPasswordValidator
};