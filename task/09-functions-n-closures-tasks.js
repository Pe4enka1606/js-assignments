'use strict';

/**
 * Возвращает композицию функций f(g(x))
 */
function getComposition(f, g) {
    return function(x) {
        return f(g(x));
    };
}

/**
 * Возвращает функцию возведения в степень
 */
function getPowerFunction(exponent) {
    return function(x) {
        return Math.pow(x, exponent);
    };
}

/**
 * Возвращает полином: y = a0*x^n + a1*x^(n-1) + ... + an
 * coefficients: [a0, a1, ..., an]
 */
function getPolynom(...coefficients) {
    if (coefficients.length === 0) return null;
    return function(x) {
        return coefficients.reduce((acc, coef, index) => {
            const power = coefficients.length - 1 - index;
            return acc + coef * Math.pow(x, power);
        }, 0);
    };
}

/**
 * Мемоизирует функцию (кэширует результат первого вызова)
 */
function memoize(func) {
    let cache;
    let isCached = false;
    return function(...args) {
        if (!isCached) {
            cache = func.apply(this, args);
            isCached = true;
        }
        return cache;
    };
}

/**
 * Повторяет выполнение функции при возникновении ошибки
 */
function retry(func, attempts) {
    return function(...args) {
        let lastError;
        for (let i = 0; i < attempts; i++) {
            try {
                return func.apply(this, args);
            } catch (e) {
                lastError = e;
            }
        }
        throw lastError;
    };
}

/**
 * Логирует вызов функции (старт и окончание)
 */
function logger(func, logFunc) {
    return function(...args) {
        const name = func.name;
        const argsStr = JSON.stringify(args);
        logFunc(`${name}(${argsStr.slice(1, -1)}) starts`);
        const result = func.apply(this, args);
        logFunc(`${name}(${argsStr.slice(1, -1)}) ends`);
        return result;
    };
}

/**
 * Частичное применение аргументов
 */
function partialUsingArguments(fn, ...args1) {
    return function(...args2) {
        return fn.apply(this, args1.concat(args2));
    };
}

/**
 * Генератор ID
 */
function getIdGeneratorFunction(startFrom) {
    let current = startFrom;
    return function() {
        return current++;
    };
}

module.exports = {
    getComposition,
    getPowerFunction,
    getPolynom,
    memoize,
    retry,
    logger,
    partialUsingArguments,
    getIdGeneratorFunction,
};