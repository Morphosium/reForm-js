import { IElementField } from "../../Definitions/index";
import { Reflection } from "./Reflection";
import { Reflector } from "../Reflector";
import { SectionReflection } from "./SectionReflection";
export declare class ElementReflection extends Reflection {
    elementField: IElementField;
    reflector: Reflector;
    private baseElement;
    parentSectionReflection: SectionReflection;
    element: HTMLElement;
    subReflections: Reflection[];
    constructor(elementField: IElementField, reflector: Reflector, baseElement: HTMLElement, parentSectionReflection: SectionReflection);
    constructReflection(): void;
    getElementByName(name: string): Reflection;
    setErrorMessageVisibility(value: boolean): void;
}
//# sourceMappingURL=ElementReflection.d.ts.map