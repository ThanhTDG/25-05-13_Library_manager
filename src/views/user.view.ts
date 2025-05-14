import { CreatedUserForm } from "../forms/createdUser.form";

export class UserView {
     setAddBookHandler(handle: (formData: CreatedUserForm) => void): void {
            const form = document.getElementById("create-user-form") as HTMLFormElement
            if (form) {
                form.addEventListener("submit", (event) => {
                    event.preventDefault();
                    const name = ((document.getElementById("name")) as HTMLInputElement).value
                    const formData: CreatedUserForm = { name }
                    handle(formData)
                })
            }
        }
    

}