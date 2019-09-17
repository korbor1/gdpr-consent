function setCookie(name, value, expiresTimeInHours) {
    const maxAge = expiresTimeInHours * 3600;
    document.cookie = `${name}=${value};max-age=${maxAge};path=/`;
}

function isCookieSet(name) {
    if (document.cookie.split(";").filter((value) => value.includes(`${name}=`)).length) {
        return true;
    }
    return false;
}
  
  
function getCookie(name) {
    if(!isCookieSet(name)) {
        createGDPRBox();
        setBodyScrollVisibility(false);
    } 
}

function createGDPRBox() {
    const body = document.querySelector("body");
    const container = document.createElement("div");
    const box = document.createElement("div");
    const title = document.createElement("h3");
    const style = document.createElement("style");
    const buttonContainer = document.createElement("div");
    const buttonAccept = document.createElement("span");
    const buttonCancel = document.createElement("span");

    container.classList.add("gdpr-container");
    box.classList.add("gdpr-box");
    buttonAccept.classList.add("button-accept");
    buttonCancel.classList.add("button-cancel");

    style.innerHTML =
        ".gdpr-container {" +
            "position: fixed;" +
            "background-color: rgba(0.1, 0.1, 0.1, 0.7);" +
            "width: 100%;" +
            "height: 100%;" +
            "top: 0;" +
            "left: 0;" +
            "z-index: 99999;" +
            "color: #059;" +
        "}" +
        ".gdpr-box {" +
            "display: flex;" +
            "flex-direction: column;" +
            "justify-content: space-between;" +
            "align-items: center;" +
            "background-color: #fff;" +
            "width: 600px;" +
            "height: 300px;" +
            "position: fixed;" + 
            "top: calc(50% - 150px);" +
            "left: calc(50% - 300px);" +
            "border-radius: 5px;" +
            "padding: 20px;" +
        "}" +
        ".gdpr-box h3 {" +
            "text-align: center;" +
        "}" +
        ".gdpr-box span {" +
            "display: inline-flex;" +
            "justify-content: center;" +
            "align-items: center;" +
            "width: 130px;" +
            "height: 40px;" +
            "border-radius: 3px;" +
            "transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;" +
        "}" +
        ".gdpr-box span:hover {" +
            "cursor: pointer;" +
            "opacity: 0.9;" +
        "}" +
        ".button-accept {" +
            "background-color: #059;" +
            "color: #fff;" +
            "margin-right: 20px;" +
        "}" +
        ".button-cancel {" +
            "background-color: #fff;" +
            "border: 1px solid #059;" +
        "}";

    title.textContent = "GDPR Consent";
    buttonAccept.textContent = "Accept";
    buttonAccept.dataset.value = "true";
    buttonCancel.textContent = "Cancel";
    buttonCancel.dataset.value = "false";
    box.append(title);
    buttonContainer.append(buttonAccept);
    buttonContainer.append(buttonCancel);
    box.append(buttonContainer);
    container.append(box);
    body.append(container);
    body.append(style);

    initializeButtonsListeners(buttonAccept, buttonCancel);
}

function initializeButtonsListeners(...nodeButtons) {
    nodeButtons.forEach(button => button.addEventListener("click", function(){
        setCookie("gdpr-consent", this.dataset.value, 24); // cookie name, cookie value, max-age in hours
        dismissBox();
    }));
}

function setBodyScrollVisibility(visible) {
    const body = document.querySelector("body");
    body.style.overflow = visible ? "auto" : "hidden";
}

function dismissBox() {
    const container = document.querySelector(".gdpr-container");

    container.parentNode.removeChild(container);
    setBodyScrollVisibility(true);
}

document.addEventListener("DOMContentLoaded", function() {     
    getCookie("gdpr-consent");
 });
