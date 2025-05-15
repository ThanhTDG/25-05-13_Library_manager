import { IUser, User } from "../models/user.model";
import { dateToString, stringToDate } from "../utils";
import { getButtonById, getDialogElementById, getElementById, getFormElementById, getInputElementById } from "./utils.view";

export class UserView {
    static readonly ELEMENTS_IDS = {
        DIALOG_USER: "dialog-user",
        TABLE_USER: "table-user",
        FORM_USER: "form-user",
        FROM_USER_ID: "form-user-id",
        FORM_NAME: "form-user-name",
        FORM_DATE_USER_CREATED: "form-date-create-user",
        BTN_TRIGGER_CREATE_USER: "btn-trigger-create-user",
        BTN_SAVE_USER_FORM: "btn-save-form-user",
        BTN_CANCEL_USER_FORM: "btn-cancel-form-user",
    };
    static readonly ELEMENT_CLASSES = {
        BTN_DELETE_USER: "btn-delete-user",
    }

    getUserDialog(): HTMLDialogElement {
        return getDialogElementById(UserView.ELEMENTS_IDS.DIALOG_USER);
    }
    getUserForm(): HTMLFormElement {
        return getFormElementById(UserView.ELEMENTS_IDS.FORM_USER)
    }

    renderUsers(users: User[], handleRowClick: (user: User) => void, handleDeleteUser: (userId: string) => void): void {
        const ELEMENTS_CLASS = UserView.ELEMENT_CLASSES;
        const ELEMENT_IDS = UserView.ELEMENTS_IDS;
        const userTable = getElementById(ELEMENT_IDS.TABLE_USER)
        if (!userTable) return;
        let userTableBody = userTable.querySelector("tbody")
        if (!userTableBody)
            userTableBody = new HTMLTableSectionElement()
        userTableBody.innerHTML = ""
        users.forEach((user) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${dateToString(user.dayCreated)}</td>
                <td>
                    <button class=${ELEMENTS_CLASS.BTN_DELETE_USER} data-id="${user.id}">Delete</button>
                </td>
            `;
            const deleteButton = row.querySelector(`.${ELEMENTS_CLASS.BTN_DELETE_USER}`) as HTMLButtonElement;
            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation();
                handleDeleteUser(user.id);
            });
            row.addEventListener("click", () => handleRowClick(user));
            userTableBody.appendChild(row);
        });

    }
    populateForm(user: User): void {
        const ELEMENT_IDS = UserView.ELEMENTS_IDS;
        const dialog = this.getUserDialog();
        getInputElementById(ELEMENT_IDS.FROM_USER_ID).value = user.id
        getInputElementById(ELEMENT_IDS.FORM_NAME).value = user.name
        getInputElementById(ELEMENT_IDS.FORM_DATE_USER_CREATED).value = dateToString(user.dayCreated)
        dialog.showModal()
    }


    setAddUserHandler(handle: (formData: User) => void): void {
        const ELEMENTS_ID = UserView.ELEMENTS_IDS
        const form = this.getUserForm();
        const dialog = this.getUserDialog();
        form.onsubmit = null;
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let formData: Partial<IUser> = {};
            formData.id = getInputElementById(ELEMENTS_ID.FROM_USER_ID).value
            formData.name = getInputElementById(ELEMENTS_ID.FORM_NAME).value.trim();
            const dayCreatedInput = getInputElementById(ELEMENTS_ID.FORM_DATE_USER_CREATED).value;
            formData.dayCreated = stringToDate(dayCreatedInput)
            handle(User.formIUser(formData));
            dialog.close();
        });
    }

    handleShowCreateUserForm(): void {
        const DayCreateElementId = UserView.ELEMENTS_IDS.FORM_DATE_USER_CREATED
        const dialog = this.getUserDialog();
        const form = this.getUserForm();
        if (form) form.reset();
        const dayCreateElement: HTMLInputElement = getInputElementById(DayCreateElementId);
        dayCreateElement.value = dateToString(new Date(Date.now()))
        dialog.showModal();
    }

    bindCreateUserFormEvent(): void {
        const btnOpenFormCreate = getButtonById(UserView.ELEMENTS_IDS.BTN_TRIGGER_CREATE_USER);
        btnOpenFormCreate?.addEventListener('click', () => {
            this.handleShowCreateUserForm();
        });
    }

    bindCancelUserFormEvent(): void {
        const cancelDialogButton = getButtonById(UserView.ELEMENTS_IDS.BTN_CANCEL_USER_FORM);
        const form = this.getUserForm();
        if (cancelDialogButton) {
            cancelDialogButton.addEventListener('click', () => {
                const dialog = this.getUserDialog();
                if (form) form.reset();
                dialog.close();
            });
        }
    }
}