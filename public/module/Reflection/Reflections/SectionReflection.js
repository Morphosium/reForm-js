"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionReflection = void 0;
const Subject_class_1 = require("../../Utils/Reactivity/Base/Subject.class");
class SectionReflection {
    constructor(initialField, reflector, baseParentalElement, parentSectionReflection) {
        this.initialField = initialField;
        this.reflector = reflector;
        this.baseParentalElement = baseParentalElement;
        this.parentSectionReflection = parentSectionReflection;
        this.subReflections = [];
        this.constructReflection();
    }
    /** @inheritDoc */
    constructReflection() {
        const sectionField = this.initialField, reflector = this.reflector;
        this.onValueChange = new Subject_class_1.Subject();
        this.initialField = sectionField;
        reflector.expand(this.baseParentalElement, sectionField, this);
    }
    /** @inheritDoc */
    valueChanged() {
        this.rawValue = this.collectSectionData();
        if (this.parentSectionReflection) {
            this.parentSectionReflection.valueChanged();
        }
        else {
            this.onValueChange.notify();
        }
    }
    /**
     * Returns value by compiled from child reflections currently filled
     * @param mode sets returned value according to ready for submit (final) or not (raw)
     */
    getValue(mode) {
        return this.collectSectionData(mode);
    }
    /**
     * Collects data under that's subsections
     * @param mode Final or Raw mode
     * @param callback callback that triggered with fetched data
     */
    dataCollection(mode, callback) {
        const usefulReflections = this.subReflections.filter(a => a.initialField.isInput || a.initialField.isSection);
        for (let reflectionIndex = 0; reflectionIndex < usefulReflections.length; reflectionIndex++) {
            const reflection = usefulReflections[reflectionIndex];
            if (reflection.initialField.isInput) {
                const inputReflection = reflection;
                if (inputReflection.value)
                    callback(inputReflection.value, inputReflection.initialField.name);
            }
            else if (reflection.initialField.isSection) {
                const sectionReflection = reflection;
                const value = sectionReflection.collectSectionData(mode);
                if (value && ((typeof value != "object") || Object.keys(value).length > 0))
                    callback(value, sectionReflection.initialField.name);
            }
        }
    }
    /**
     * Converts raw data into intended value specified in initial field
     * */
    convertDataByMode(data, mode) {
        if ((mode === "final") && (this.initialField.convertToFinalValue)) {
            return this.initialField.convertToFinalValue(data);
        }
        else
            return data;
    }
    /**
     * Collects data under this sections and converts depending mode is final or not
     */
    collectSectionData(mode = "final") {
        if (this.initialField.arraySectionRaw) {
            const array = [];
            this.dataCollection(mode, (value) => {
                array.push(value);
            });
            return this.convertDataByMode(array, mode);
        }
        else {
            const objectMap = {};
            this.dataCollection(mode, (value, name) => {
                objectMap[name] = value;
            });
            return this.convertDataByMode(objectMap, mode);
        }
    }
    /**
    * Collects all validation error and presents them like:
    * {
    *   'age': {atLeast: ...},
    *   'name': {required: ...},
    *   'email': {required: ...},
    *   'address.city': {required: ...}
    * }
    * (3 input and 1 section field contains 'city' input)
    */
    collectValidationErrors() {
        const fieldNameHeader = this.initialField.name ? `${this.initialField.name}.` : '';
        const errorList = {};
        for (let subFieldIndex = 0; subFieldIndex < this.subReflections.length; subFieldIndex++) {
            const subReflection = this.subReflections[subFieldIndex];
            if (subReflection.initialField.isInput) {
                const inputReflection = subReflection;
                inputReflection.validate();
                errorList[fieldNameHeader + subReflection.initialField.name] = inputReflection.validationErrors;
            }
            else if (subReflection.initialField.isSection) {
                const subReflectionValidationErrors = subReflection.collectValidationErrors();
                for (const key in subReflectionValidationErrors) {
                    if (Object.prototype.hasOwnProperty.call(subReflectionValidationErrors, key)) {
                        const validationErrorMap = subReflectionValidationErrors[key];
                        if (validationErrorMap != null && (Object.keys(validationErrorMap).length > 0))
                            errorList[fieldNameHeader + key] = validationErrorMap;
                    }
                }
            }
        }
        return errorList;
    }
    /**
     * Sets corresponding values of section
     * @param data incoming new data
     */
    setValue(data) {
        if (data instanceof Object) {
            const dataAsObj = data;
            for (const key in dataAsObj) {
                if (Object.prototype.hasOwnProperty.call(dataAsObj, key)) {
                    const value = dataAsObj[key];
                    if ((typeof value != "function") &&
                        (key != "__proto__")) {
                        const reflection = this.findSubReflectionByName(key);
                        if (reflection.initialField.isSection) {
                            reflection.setValue(value);
                        }
                        else if (reflection.initialField.isInput) {
                            reflection.setValueExternal(value);
                        }
                    }
                }
            }
        }
        else {
        }
    }
    /**
     * Finds reflection under this' first level sub reflections
     * @param key name of reflection/field
     */
    findSubReflectionByName(key) {
        var _a;
        return (_a = this.subReflections) === null || _a === void 0 ? void 0 : _a.find(refl => refl.initialField.name === key);
    }
    /**
     * Sets error message visibilities of the inputs
     * */
    setErrorMessageVisibility(value) {
        for (let reflectionIndex = 0; reflectionIndex < this.subReflections.length; reflectionIndex++) {
            const reflection = this.subReflections[reflectionIndex];
            reflection.setErrorMessageVisibility(value);
        }
    }
}
exports.SectionReflection = SectionReflection;
