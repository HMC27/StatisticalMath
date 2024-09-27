function $(id){return document.querySelector(id)}
function $$(id) {return document.querySelectorAll(id)}
function renderHTML() {
    $("body").innerHTML += `
    <div class="toasts__list">
    </div>
    <div class="alert">
    </div>
    `
}
renderHTML()

function callToasts({
    name="",
    content="",
    type="success",
    duration = 3000
}) {
    var toast_main = $(".toasts__list")
    var toast = document.createElement("div")
    toast.classList.add("toasts__items",`toast__items--${type}`)
    toast.style.animation = `toastsIn .3s linear , toastsOut .5s ${duration}ms linear forwards`
    const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle"
    }
    var iconE = icons[type]
    var contentDiv=content=="" ? "":`<div class="toasts__items__content">${content}</div>`  
    toast.innerHTML = `
    <div class="toasts__items__icon"><i class="${iconE}"></i></div>
    <div class="toasts__items__body">
        <h3 class="toasts__items__name">${name}</h3>
        ${contentDiv}
        </div>
    <div class="toasts__items__closeBtn"><i class="toasts__items__closeBtn__icon fa-solid fa-xmark"></i></div>
        `
    toast_main.appendChild(toast)
    var removeAuto = setTimeout(function() {
        toast_main.removeChild(toast)
    },duration+1200)
    toast.onclick = function(e) {
        if (e.target.closest(".toasts__items__closeBtn")) {
            toast_main.removeChild(e.target.closest(".toasts__items"))
            clearTimeout(removeAuto)
        }
    }
}
export {callToasts}

// alert js

function callNoti({name=null,type="success",content="",yes_btn=null,no_btn="Cancel"}) {
    if (!"success warning erorr info".includes(type)) {return Error}
    return new Promise ((resolve,reject)=>{
        var body = $("body")
        body.addEventListener("all",e=>{
            e.preventDefault()
        })
        body.style.overflowY = "hidden"
        if (type == "success") {
            if (!name) {name = "Success"}
            var iconDiv = `<i class="fa-solid fa-check alert__icon"></i>`
            if (!yes_btn) {yes_btn="Close"}
        } else if (type == "warning") {
            if (!name) {name = "Warning"}
            var iconDiv = `<i class="fa-solid fa-exclamation alert__icon"></i>`
            if (!yes_btn) {yes_btn="Yes"}
        } else if (type == "error") {
            if (!name) {name = "Opps !"}
            var iconDiv = `<i class="fa-solid fa-xmark alert__icon"></i>`
            if (!yes_btn) {yes_btn="Close"}
        } else {
            if (!name) {name = "Info"}
            var iconDiv = `<i class="fa-solid fa-info alert__icon"></i>`
            if (!yes_btn) {yes_btn="Close"}
        }
        $(".alert").innerHTML+=`
            <div class="alert__bg">
                <div class="alert__box alert__box--${type}">
                    <div class="alert__icon__box">${iconDiv}</div>
                    <h1 class="alert__head">${name}</h1>
                    <div class="alert__content">${content}</div>
                    <div class="alert__btn__box">
                        <div class="alert__btn alert__btn--no">${no_btn}</div>
                        <div class="alert__btn alert__btn--yes">${yes_btn}</div>
                    </div>
                </div>
            </div>
        `
        $(".alert__btn--no").addEventListener("click",()=>{
            reject()
            body.style.overflowY = "unset"
            $(".alert__bg").style.animation = "notiOut .15s linear forwards"
            setTimeout(()=>{$(".alert").removeChild($(".alert__bg"))},150)
        })
        $(".alert__bg").addEventListener("click",e=>{
            if (e.target.closest(".alert__box")) {return}
            if (!(type == "success" || type == "erorr" || type == "info")) {reject()}
            body.style.overflowY = "unset"
            $(".alert__bg").style.animation = "notiOut .15s linear forwards"
            setTimeout(()=>{$(".alert").removeChild($(".alert__bg"))},150)
        })
        $(".alert__btn--yes").addEventListener("click",()=>{
            resolve()
            body.style.overflowY = "unset"
            $(".alert__bg").style.animation = "notiOut .15s linear forwards"
            setTimeout(()=>{$(".alert").removeChild($(".alert__bg"))},150)
        })
    })
}
export {callNoti}