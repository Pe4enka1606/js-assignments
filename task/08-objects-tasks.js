'use strict';

/**
 * 1. Rectangle
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

Rectangle.prototype.getArea = function() {
    return this.width * this.height;
};

/**
 * 2. JSON Helpers
 */
function getJSON(obj) {
    return JSON.stringify(obj);
}

function fromJSON(proto, json) {
    const obj = JSON.parse(json);
    Object.setPrototypeOf(obj, proto);
    return obj;
}

/**
 * 3. CssSelectorBuilder
 * Класс-помощник для построения селектора с валидацией порядка и уникальности
 */
class Selector {
    constructor() {
        this.parts = {
            element: null,
            id: null,
            classes: [],
            attrs: [],
            pseudoClasses: [],
            pseudoElement: null
        };
        // Порядок, определенный спецификацией CSS
        this.order = ['element', 'id', 'classes', 'attrs', 'pseudoClasses', 'pseudoElement'];
    }

    _checkOrder(type) {
        const currentIndex = this.order.indexOf(type);
        // Проверяем, не были ли добавлены элементы, которые должны идти ПОСЛЕ текущего
        for (let i = currentIndex + 1; i < this.order.length; i++) {
            const partName = this.order[i];
            const part = this.parts[partName];
            if ((Array.isArray(part) && part.length > 0) || (!Array.isArray(part) && part !== null)) {
                throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
            }
        }
    }

    _checkUnique(type) {
        if (this.parts[type] !== null) {
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
    }

    element(value) { this._checkUnique('element'); this._checkOrder('element'); this.parts.element = value; return this; }
    id(value) { this._checkUnique('id'); this._checkOrder('id'); this.parts.id = value; return this; }
    class(value) { this._checkOrder('classes'); this.parts.classes.push(value); return this; }
    attr(value) { this._checkOrder('attrs'); this.parts.attrs.push(value); return this; }
    pseudoClass(value) { this._checkOrder('pseudoClasses'); this.parts.pseudoClasses.push(value); return this; }
    pseudoElement(value) { this._checkUnique('pseudoElement'); this._checkOrder('pseudoElement'); this.parts.pseudoElement = value; return this; }

    stringify() {
        let res = '';
        if (this.parts.element) res += this.parts.element;
        if (this.parts.id) res += '#' + this.parts.id;
        res += this.parts.classes.map(c => '.' + c).join('');
        res += this.parts.attrs.map(a => '[' + a + ']').join('');
        res += this.parts.pseudoClasses.map(pc => ':' + pc).join('');
        if (this.parts.pseudoElement) res += '::' + this.parts.pseudoElement;
        return res;
    }
}

/**
 * Фасад для построения селекторов
 */
const cssSelectorBuilder = {
    element: (v) => new Selector().element(v),
    id: (v) => new Selector().id(v),
    class: (v) => new Selector().class(v),
    attr: (v) => new Selector().attr(v),
    pseudoClass: (v) => new Selector().pseudoClass(v),
    pseudoElement: (v) => new Selector().pseudoElement(v),
    combine: (s1, comb, s2) => ({
        stringify: () => `${s1.stringify()} ${comb} ${s2.stringify()}`
    })
};

module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};