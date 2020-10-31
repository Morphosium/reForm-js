import { IElementField } from "../ElementField/IElementField";
import { IManifestoField } from "../ManifestoField/index";
import { IInputFieldInitial } from "./IInputFieldInitial";


export interface IInputField<V extends any> extends IManifestoField, IInputFieldInitial<V> {
    isInput: boolean;
}
