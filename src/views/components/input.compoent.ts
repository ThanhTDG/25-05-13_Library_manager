export enum TypeInputElement {
    DATE = "date",
    NUMBER = "number",
    TEXT = "text",
}

export function createInputElement(label: string, elementId: string, type: TypeInputElement = TypeInputElement.TEXT) {
    const labelElement = document.createElement('label')
    const inputElement = document.createElement('input')
    const containerElement = document.createElement('div')

    switch (type) {
        case TypeInputElement.NUMBER:
            inputElement.setAttribute("type", type)
        default:
            break;
    }
    labelElement.innerHTML = label
    labelElement.setAttribute("id", `label-${elementId}`)
    inputElement.setAttribute("id", `input-${elementId}`)
    containerElement.setAttribute("id", `container-${elementId}`)
    containerElement.append(labelElement, inputElement);
    return containerElement
}