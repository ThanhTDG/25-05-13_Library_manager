import { getButtonById, getDialogElementById, getFormElementById, getInputElementById } from "../views/utils.view";

export abstract class BaseView {
    protected getDialogElementById(id: string): HTMLDialogElement {
        return getDialogElementById(id);
    }

    protected getFormElementById(id: string): HTMLFormElement {
        return getFormElementById(id);
    }

    protected getInputElementById(id: string): HTMLInputElement {
        return getInputElementById(id);
    }

    protected getButtonById(id: string): HTMLButtonElement {
        return getButtonById(id);
    }
}