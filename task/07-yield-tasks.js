'use strict';

/**
 * Возвращает последовательность строк песни "99 Bottles of Beer"
 */
function* get99BottlesOfBeer() {
    for (let i = 99; i >= 1; i--) {
        const current = i > 1 ? `${i} bottles` : '1 bottle';
        const next = i - 1 > 1 ? `${i - 1} bottles` : (i - 1 === 1 ? '1 bottle' : 'no more bottles');

        yield `${current} of beer on the wall, ${current} of beer.`;
        yield `Take one down and pass it around, ${next} of beer on the wall.`;
    }
    yield 'No more bottles of beer on the wall, no more bottles of beer.';
    yield 'Go to the store and buy some more, 99 bottles of beer on the wall.';
}

/**
 * Возвращает последовательность Фибоначчи: 0, 1, 1, 2, 3, 5, 8...
 */
function* getFibonacciSequence() {
    let a = 0, b = 1;
    yield a;
    yield b;
    while (true) {
        let next = a + b;
        yield next;
        a = b;
        b = next;
    }
}

/**
 * Обход дерева в глубину (DFS)
 */
/**
 * Traverses a tree using the depth-first strategy (Iterative approach)
 */
function* depthTraversalTree(root) {
    if (!root) return;

    // Используем стек для хранения узлов
    const stack = [root];

    while (stack.length > 0) {
        const node = stack.pop();
        yield node;

        // Добавляем детей в стек в обратном порядке,
        // чтобы сохранить порядок обхода слева направо
        if (node.children && node.children.length > 0) {
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i]);
            }
        }
    }
}

/**
 * Обход дерева в ширину (BFS)
 */
function* breadthTraversalTree(root) {
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        yield node;
        if (node.children) {
            queue.push(...node.children);
        }
    }
}

/**
 * Объединение двух отсортированных последовательностей
 */
function* mergeSortedSequences(source1, source2) {
    const gen1 = source1();
    const gen2 = source2();

    let val1 = gen1.next();
    let val2 = gen2.next();

    while (!val1.done || !val2.done) {
        if (!val1.done && (val2.done || val1.value <= val2.value)) {
            yield val1.value;
            val1 = gen1.next();
        } else {
            yield val2.value;
            val2 = gen2.next();
        }
    }
}

module.exports = {
    get99BottlesOfBeer,
    getFibonacciSequence,
    depthTraversalTree,
    breadthTraversalTree,
    mergeSortedSequences
};