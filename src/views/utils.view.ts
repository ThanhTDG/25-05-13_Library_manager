import { ISelectOption } from "../interfaces/select.interface";

export function getElementById(id: string): HTMLElement | null {
	return document.getElementById(id);
}
export function getSelectElementById(id: string): HTMLSelectElement | null {
	const element = document.getElementById(id);
	if (!(element instanceof HTMLSelectElement)) {
		throw new Error(`Element with ID '${id}' is not an HTMLSelectElement.`);
	}
	return element;
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
	const form = document.getElementById(formId) as HTMLFormElement;
	console.log(form, formId);
	if (!form) {
		throw new Error("Form not found");
	}
	return form;
}
export function getButtonById(buttonId: string): HTMLButtonElement {
	return document.getElementById(buttonId) as HTMLButtonElement;
}

export function fillOption(option: ISelectOption): string {
	return `<option value="${option.id}">${option.displayString}</option>`;
}
export function fillOptions(
	options: ISelectOption[],
	defaultOption?: ISelectOption
): string {
	let optionsString = "";
	if (defaultOption) {
		optionsString += `<option value="${defaultOption.id}">${defaultOption.displayString}</option>`;
	}
	options.forEach((option) => {
		optionsString += fillOption(option);
	});
	return optionsString;
}

export function enumToOptions(
	enumObj: { [key: string]: string },
	defaultOption?: ISelectOption,
	sameKeyValue: boolean = false
): string {
	const options = Object.entries(enumObj).map(([key, value]) => {
		if (sameKeyValue) {
			return { id: key, displayString: value };
		}
		return { id: value, displayString: value };
	});
	return fillOptions(options, defaultOption);
}

export function loadSelectOption(
	idElement: string,
	value: string,
	displayString: string,
	disabled: boolean = true
): void {
	const selectElement = getSelectElementById(idElement);
	if (selectElement) {
		selectElement.value = value;
		selectElement.innerHTML = fillOption(<ISelectOption>{
			id: value,
			displayString: displayString,
		});
		selectElement.disabled = disabled;
	}
}
export function loadSelectOptions(
	idElement: string,
	options: ISelectOption[],
	defaultOption?: ISelectOption
): void {
	const selectElement = getSelectElementById(idElement);
	if (selectElement) {
		selectElement.innerHTML = fillOptions(options, defaultOption);
	}
	selectElement?.focus();
}
