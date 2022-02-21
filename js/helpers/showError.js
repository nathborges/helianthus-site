window.addEventListener("load", function () {
    const isNotFound = window.location.search.substr(1).split("&").map(s => s.split('=')).some(params => params[0] === "device_not_found")
    const elem = document.querySelector("#device-not-found")
    const form = document.querySelectorAll(".form")
    if (isNotFound) {
        elem.style.display = "inline"
        form.forEach(elem => {
            elem.style.border = "1px solid red"
        });
    }
})