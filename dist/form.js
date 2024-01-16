"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = exports.toStringField = void 0;
function toStringField(field) {
    if (Array.isArray(field)) {
        field = field[0];
    }
    if (field)
        return field;
}
exports.toStringField = toStringField;
function toArray(data) {
    if (Array.isArray(data))
        return data;
    if (data)
        return [data];
    return [];
}
exports.toArray = toArray;
