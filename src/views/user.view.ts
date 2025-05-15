import { IUser } from "../models/user.model";

export class UserView {
    static readonly ELEMENTS_ID = {
        USER_DIALOG: "user-dialog",
        USER_FORM: "create-user-form",
        FORM_NAME: "name",
        BTN_TRIGGER_CREATE_USER: "btn-trigger-create-user",
        BTN_SAVE_USER_FORM: "btn-save-user-form",
        BTN_CANCEL_USER_FORM: "btn-cancel-user-form",
    };

    getUserDialog(): HTMLDialogElement {
        const dialog = document.getElementById(UserView.ELEMENTS_ID.USER_DIALOG) as HTMLDialogElement;
        if (!dialog) throw new Error("User dialog not found");
        return dialog;
    }
    renderUsers(users: IUser[], handleRowClick: (user: IUser) => void, handleDeleteUser: (userId: string) => void): void {
        const userTableBody = document.getElementById("user-table-body") as HTMLTableSectionElement;
        userTableBody.innerHTML = "";
        users.forEach((user) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.dayCreated.toLocaleDateString()}</td>
                <td>
                    <button class="delete-user-button" data-id="${user.id}">Delete</button>
                </td>
            `;
            row.addEventListener("click", () => handleRowClick(user));
            userTableBody.appendChild(row);
        });
        const deleteButtons = document.querySelectorAll(`.${UserView.ELEMENTS_ID.BTN_DELETE_USER}`);
        deleteButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                const userId = (event.target as HTMLButtonElement).dataset.id;
                if (userId) handleDeleteUser(userId);
            });
        });
    }

    getUserForm(): HTMLFormElement {
        const form = document.getElementById(UserView.ELEMENTS_ID.USER_FORM) as HTMLFormElement;
        if (!form) throw new Error("User form not found");
        return form;
    }

    getInputElementById(id: string): HTMLInputElement {
        return document.getElementById(id) as HTMLInputElement;
    }

   setAddUserHandler(handle: (formData: IUser) => void): void {
        const form = this.getUserForm();
        const dialog = this.getUserDialog();
        form.onsubmit = null;
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = this.getInputElementById(UserView.ELEMENTS_ID.FORM_NAME).value.trim();
            if (!name) {
                alert("Name is required!");
                return;
            }
            const formData: IUser = {
                id: Date.now().toString(),
                name,
                dayCreated: new Date(),
                borrowedBookIds: []
            };
            handle(formData);
            dialog.close();
        }, { once: true });
    }

    handleShowCreateUserForm(): void {
        const dialog = this.getUserDialog();
        const form = this.getUserForm();
        if (form) form.reset();
        dialog.showModal();
    }

    bindCreateUserFormEvent(): void {
        const btnOpenFormCreate = document.getElementById(UserView.ELEMENTS_ID.BTN_TRIGGER_CREATE_USER) as HTMLButtonElement;
        btnOpenFormCreate?.addEventListener('click', () => {
            this.handleShowCreateUserForm();
        });
    }

    bindCancelUserFormEvent(): void {
        const cancelDialogButton = document.getElementById(UserView.ELEMENTS_ID.BTN_CANCEL_USER_FORM) as HTMLButtonElement;
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