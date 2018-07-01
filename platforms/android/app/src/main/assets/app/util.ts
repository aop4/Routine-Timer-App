import fastClone = require('fast-clone');
import deepEqual = require('deep-equal');

/* Pads a number to have a minimum length of 2 */
export function padTwoDigits(val: number) {
    if (val.toString().length === 1) {
        return "0" + val;
    }
    return val;
}

export function deepEquals(obj1, obj2) {
    return deepEqual(obj1, obj2);
}

export function isNonnegativeInteger(num: number) {
    return (Number.isInteger(num) && num >= 0);
}

export function clone(obj: Object) {
    return fastClone(obj);
}