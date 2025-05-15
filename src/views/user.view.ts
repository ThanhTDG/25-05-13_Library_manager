import { IUser, User } from "../models/user.model";
import { dateToString, stringToDate } from "../utils";
import {
	getButtonById,
	getDialogElementById,
	getElementById,
	getFormElementById,
	getInputElementById,
} from "./utils.view";

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
	};

	getUserDialog(): HTMLDialogElement {
		return getDialogElementById(UserView.ELEMENTS_IDS.DIALOG_USER);
	}

	getUserForm(): HTMLFormElement {
		return getFormElementById(UserView.ELEMENTS_IDS.FORM_USER);
	}

	renderUsers(
		users: User[],
		handleRowClick: (user: User) => void,
		handleDeleteUser: (userId: string) => void
	): void {
		const userTable = getElementById(UserView.ELEMENTS_IDS.TABLE_USER);
		if (!userTable) return;

		const userTableBody =
			userTable.querySelector("tbody") || document.createElement("tbody");
		userTableBody.innerHTML = users
			.map(
				(user) => `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${dateToString(user.dayCreated)}</td>
                    <td>
                        <button class="${
													UserView.ELEMENT_CLASSES.BTN_DELETE_USER
												}" data-id="${user.id}">Delete</button>
                    </td>
                </tr>
            `
			)
			.join("");

		userTableBody.querySelectorAll("tr").forEach((row, index) => {
			const deleteButton = row.querySelector(
				`.${UserView.ELEMENT_CLASSES.BTN_DELETE_USER}`
			) as HTMLButtonElement;

			deleteButton.addEventListener("click", (event) => {
				event.stopPropagation();
				handleDeleteUser(users[index].id);
			});

			row.addEventListener("click", () => handleRowClick(users[index]));
		});

		userTable.appendChild(userTableBody);
	}

	populateForm(user: User): void {
		const ELEMENTS_ID = UserView.ELEMENTS_IDS;
		getInputElementById(ELEMENTS_ID.FROM_USER_ID).value = user.id;
		getInputElementById(ELEMENTS_ID.FORM_NAME).value = user.name;
		getInputElementById(ELEMENTS_ID.FORM_DATE_USER_CREATED).value =
			dateToString(user.dayCreated);
		this.getUserDialog().showModal();
	}

	setAddUserHandler(handle: (formData: User) => void): void {
		const form = this.getUserForm();
		if (!form) return;

		const ELEMENTS_IDS = UserView.ELEMENTS_IDS;
		form.onsubmit = null; // Clear previous handlers
		form.addEventListener("submit", (event) => {
			event.preventDefault();
			const formData: Partial<IUser> = {
				id: getInputElementById(ELEMENTS_IDS.FROM_USER_ID).value,
				name: getInputElementById(ELEMENTS_IDS.FORM_NAME).value.trim(),
				dayCreated: stringToDate(
					getInputElementById(ELEMENTS_IDS.FORM_DATE_USER_CREATED).value
				),
			};
			handle(User.formIUser(formData));
			this.getUserDialog().close();
		});
	}

	handleShowCreateUserForm(): void {
		const form = this.getUserForm();
		if (form) form.reset();

		const dayCreateElement = getInputElementById(
			UserView.ELEMENTS_IDS.FORM_DATE_USER_CREATED
		);
		dayCreateElement.value = dateToString(new Date());
		this.getUserDialog().showModal();
	}

	bindCreateUserFormEvent(): void {
		const btnOpenFormCreate = getButtonById(
			UserView.ELEMENTS_IDS.BTN_TRIGGER_CREATE_USER
		);
		btnOpenFormCreate?.addEventListener("click", () =>
			this.handleShowCreateUserForm()
		);
	}

	bindCancelUserFormEvent(): void {
		const cancelDialogButton = getButtonById(
			UserView.ELEMENTS_IDS.BTN_CANCEL_USER_FORM
		);
		if (!cancelDialogButton) return;

		cancelDialogButton.addEventListener("click", () => {
			const form = this.getUserForm();
			if (form) form.reset();
			this.getUserDialog().close();
		});
	}
}
