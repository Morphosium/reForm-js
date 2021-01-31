"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyValue = exports.KeyValue = void 0;
class KeyValue {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
exports.KeyValue = KeyValue;
function keyValue(key, value) {
    return new KeyValue(key, value);
}
exports.keyValue = keyValue;
