import { Toast } from './toast'

document.getElementById("seccess")!.addEventListener("click", () => {
Toast.seccess("!operation completed", 5)
})
document.getElementById("error")!.addEventListener("click", () => {
Toast.error("!something went wrong", 5)
})
document.getElementById("info")!.addEventListener("click", () => {
Toast.info("!Here is some information", 5)
})
document.getElementById("alert")!.addEventListener("click", () => {
Toast.alert("!Please be careful", 5)
})