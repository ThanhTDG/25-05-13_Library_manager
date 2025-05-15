export function getElementById(id: string): HTMLElement | null {
    return document.getElementById(id)
}

export function getInputElementById(id: string): HTMLInputElement {
    const element = getElementById(id);
    if (!(element instanceof HTMLInputElement)) {
        throw new Error(`Element with ID '${id}' is not an HTMLInputElement.`);
    }
    return element;
}
export function getDialogElementById(dialogId: string): HTMLDialogElement {
    const dialog = getElementById(dialogId) as HTMLDialogElement;
    if (!dialog) {
        throw new Error("Dialog not found");
    }
    return dialog;
}
export function getFormElementById(formId: string): HTMLFormElement {
    const form = document.getElementById(formId) as HTMLFormElement
    console.log(form, formId)
    if (!form) {
        throw new Error("Form not found")
    }
    return form
}
export function getButtonById(buttonId: string): HTMLButtonElement {
    return document.getElementById(buttonId) as HTMLButtonElement
}

export function populateDropdowns(items: { id: string; displayString: string }[], idElement: string): void {
    const elementInput = getInputElementById(idElement);
    if (elementInput) {
        elementInput.innerHTML = items
            .map(item => `<option value="${item.id}">${item.displayString}</option>`)
            .join("");
    }
}