type ToastType = "seccess" | "error" | "info" | "alert";

function showToast(type: ToastType, message: string, time: number = 2) {
    const toast = document.createElement("div");

    toast.className =
        "fixed right-5 top-5 z-50 w-80 max-w-[90vw] overflow-hidden rounded-lg bg-white shadow-lg";

    let color = "bg-blue-500";

    if (type === "seccess") {
        color = "bg-green-500";
    } else if (type === "error") {
        color = "bg-red-500";
    } else if (type === "alert") {
        color = "bg-yellow-500";
    }

    const content = document.createElement("div");
    content.className = "flex items-center justify-between gap-3 p-4";

    const text = document.createElement("p");
    text.className = "break-words text-sm text-gray-800";
    text.textContent = message;

    const close = document.createElement("button");
    close.className = "text-xl text-gray-500 hover:text-black";
    close.textContent = "×";

    content.append(text, close);

    const line = document.createElement("div");
    line.className = `h-1 ${color}`;
    line.style.width = "100%";

    toast.append(content, line);
    document.body.appendChild(toast);

    const totalTime = Math.max(0, time * 1000);
    let remaining = totalTime;
    let start = 0;
    let timeout: number;
    let animationFrame: number;
    let isPaused = false;

    function closeToast() {
        clearTimeout(timeout);
        cancelAnimationFrame(animationFrame);
        toast.remove();
    }

    function startTimer() {
        if (remaining <= 0) {
            closeToast();
            return;
        }

        isPaused = false;
        start = Date.now();

        line.style.transition = "none";
        line.style.width = `${(remaining / totalTime) * 100}%`;

        animationFrame = requestAnimationFrame(() => {
            if (isPaused) return;

            line.style.transition = `width ${remaining}ms linear`;
            line.style.width = "0%";
        });

        timeout = window.setTimeout(closeToast, remaining);
    }

    toast.addEventListener("mouseenter", () => {
        if (isPaused) return;

        isPaused = true;
        clearTimeout(timeout);
        cancelAnimationFrame(animationFrame);

        const passedTime = Date.now() - start;
        remaining = Math.max(0, remaining - passedTime);

        const currentWidth = totalTime > 0
            ? (remaining / totalTime) * 100
            : 0;

        line.style.transition = "none";
        line.style.width = `${currentWidth}%`;
    });

    toast.addEventListener("mouseleave", () => {
        if (isPaused) {
            startTimer();
        }
    });

    close.addEventListener("click", closeToast);

    startTimer();
}

export const Toast = {
    seccess: (message: string, time?: number) =>
        showToast("seccess", message, time),

    error: (message: string, time?: number) =>
        showToast("error", message, time),

    info: (message: string, time?: number) =>
        showToast("info", message, time),

    alert: (message: string, time?: number) =>
        showToast("alert", message, time),
};
