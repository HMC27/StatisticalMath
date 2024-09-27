function $(id){return document.querySelector(id)}
function loadConfig() {
    if (!localStorage.getItem("userData")) {localStorage.setItem("userData",JSON.stringify({dataNormal:{}}))}
    var UserConfig = JSON.parse(localStorage.getItem("UserConfig"))
    var homeAudio = $(".home__audio")
    homeAudio.volume = 0.05
    if (!UserConfig) {return}
    if (UserConfig.bgSetting) {
        $(".setting__bg__btn").classList.add("setting__btn--on")
        $(".setting__bg__btn").classList.remove("setting__btn--off")
    }
    loadBgWeb()
}
function saveConfig() {
    var UserConfig = {
        bgSetting : $(".setting__bg__btn").classList.value.includes("setting__btn--on")
    } 
    localStorage.setItem("UserConfig",JSON.stringify(UserConfig))
}
function loadBgWeb() {
    var bgSettingBtn = $(".setting__bg__btn")
    if (bgSettingBtn.classList.value.includes("setting__btn--on")) {
        $("html").style.background = "black"
        $(".app").classList.add("theme-black")
        bgSettingBtn.textContent = "on"
        if ($(".banner__img")) {$(".banner__img").src = "./assets/image/svg/Banner_2.svg"}
    } else {
        $("html").style.background = "white"
        $(".app").classList.remove("theme-black")
        bgSettingBtn.textContent = "off"
        if ($(".banner__img")) {$(".banner__img").src = "./assets/image/svg/Banner_1.svg"}
    }
}
export {loadConfig,saveConfig,loadBgWeb}