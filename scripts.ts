import { Toast } from "./toastify/toast.ts"

const registerForm = document.getElementById("registerForm") as HTMLFormElement;

registerForm.addEventListener("submit", function (event: SubmitEvent) {
    event.preventDefault();

    const firstName = (registerForm.elements.namedItem("firstName") as HTMLInputElement).value.trim();
    const lastName = (registerForm.elements.namedItem("lastName") as HTMLInputElement).value.trim();
    const phone = (registerForm.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const email = (registerForm.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (registerForm.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (registerForm.elements.namedItem("confirmPassword") as HTMLInputElement).value;

    if (password !== confirmPassword) {
        Toast.error("پسورد و تکرار پسورد یکسان نیست");
        return;
    }

    const userData = {
        firstName,
        lastName,
        phone,
        email,
        password,
        confirmPassword
    };

    console.log(userData);
});
