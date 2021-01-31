"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementField = void 0;
const InitialField_1 = require("../InitialField/InitialField");
const ObjectFieldTransfer_1 = require("../../../Utils/ObjectFieldTransfer");
class ElementField extends InitialField_1.InitialFied {
    constructor(base) {
        super(base);
        this.isElement = true;
        this.attributes = [];
        this.tag = "";
        this.id = "";
        this.class = "";
        ObjectFieldTransfer_1.ObjectFieldTransfer(base, this);
    }
}
exports.ElementField = ElementField;