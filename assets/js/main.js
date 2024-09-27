import {callToasts,callNoti} from "./Message.js"
import {loadConfig,saveConfig,loadBgWeb} from "./loadConfig.js"
function $(id){return document.querySelector(id)}
function $$(id) {return document.querySelectorAll(id)}
const isnotNumber = (num) => !((typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num));
function main() {
    loadConfig()
    setTimeout(()=>{
        document.querySelector("body").style.overflowY = "unset"
        document.querySelector(".loading__page").style.display = "none"
        addEvent()
        settingWeb()
        if (document.querySelector(".app").classList.value.includes("mslNormal")) {datasampleNormalEvent()}
        if (document.querySelector(".app").classList.value.includes("results-Normal")) {loadResultsNormal()}
    },150)
}


main()

function addEvent() {
    if (document.querySelector(".nav__setting__btn")) {
        document.querySelector(".nav__setting__btn").addEventListener("click",()=>{
            document.querySelector(".body").style.display = "none"
            document.querySelector(".setting").style.display = "block"
            document.querySelector(".home__btn__box").style.display = "flex"
            document.querySelector(".setting__btn__box").style.display = "none"
        })
        document.querySelector(".home_btn").addEventListener("click",()=>{
            document.querySelector(".body").style.display = "block"
            document.querySelector(".setting").style.display = "none"
            document.querySelector(".home__btn__box").style.display = "none"
            document.querySelector(".setting__btn__box").style.display = "flex"
        })
    }
    document.querySelector(".nav__help__btn").addEventListener("click",()=>{
        callNoti({content:"Liên hệ ADMIN <br> <a class='nav__help__link' href='https://fb.com/hmc27tricker'>FB: fb.com/hmc27tricker</a>",name:"Help",type:"info",yes_btn:"OK"})
    })
}


function settingWeb() {
    bgWeb()
    musicWeb()
}
function bgWeb() {
    var bgSettingBtn = document.querySelector(".setting__bg__btn")
    bgSettingBtn.addEventListener("click",()=>{
        if (bgSettingBtn.classList.value.includes("setting__btn--off")) {
            bgSettingBtn.classList.remove("setting__btn--off")
            bgSettingBtn.classList.add("setting__btn--on")
        } else {
            bgSettingBtn.classList.remove("setting__btn--on")
            bgSettingBtn.classList.add("setting__btn--off")
        }
        loadBgWeb()
        saveConfig()
        callToasts({name:"Đổi bg Thành Công!"})
    })
}
function musicWeb() {
    var homeAudio = document.querySelector(".home__audio")
    var musicSettingBtn = document.querySelector(".setting__music__btn")
    musicSettingBtn.addEventListener("click",()=>{
        if (musicSettingBtn.classList.value.includes("setting__btn--off")) {
            musicSettingBtn.classList.remove("setting__btn--off")
            musicSettingBtn.classList.add("setting__btn--on")
            musicSettingBtn.textContent = "on"
            homeAudio.play()
            callToasts({name:"Bật Nhạc nền Thành Công!"})
        } else {
            musicSettingBtn.classList.remove("setting__btn--on")
            musicSettingBtn.classList.add("setting__btn--off")
            musicSettingBtn.textContent = "off"
            homeAudio.pause()
            callToasts({name:"Tắt Nhạc nền Thành Công!"})
        }
    })
    homeAudio.addEventListener("ended",()=>{
        homeAudio.play()
    })
}

// MSL Normal js

function datasampleNormalEvent() {
    renderNormal()
    document.querySelector(".input__btn--add").addEventListener("click",inputNormal)
    document.querySelector(".input__nofrequen__btn").addEventListener("click",settingNormal)
    document.addEventListener("keydown",e=>{
        if (e.target.closest(".input__box")) {return}
        switch (e.keyCode) {
            case 13:
                if (document.querySelector(".alert").textContent.trim() != "") {return}
                inputNormal()
        }
    })
    document.querySelector(".input__data").addEventListener("keydown",e=>{
        switch (e.keyCode) {
            case 13:
                if (document.querySelector(".alert").textContent.trim() != "") {return}
                document.querySelector(".input__data").classList.remove("input__erorr")
                document.querySelector(".input__frequen").classList.remove("input__erorr")
                document.querySelector(".input__erorr__text").textContent=""
                if (isnotNumber(document.querySelector(".input__data").value)||!(isnotNumber(document.querySelector(".input__frequen").value)||document.querySelector(".input__frequen").value<=0)) {
                    inputNormal()
                } else {
                    document.querySelector(".input__frequen").focus()
                }
        }
    })
    document.querySelector(".input__frequen").addEventListener("keydown",e=>{
        switch (e.keyCode) {
            case 13:
                if (document.querySelector(".alert").textContent.trim() != "") {return}
                document.querySelector(".input__data").classList.remove("input__erorr")
                document.querySelector(".input__frequen").classList.remove("input__erorr")
                document.querySelector(".input__erorr__text").textContent=""
                inputNormal()
        }
    })
    document.querySelector(".show__delAll__btn").addEventListener("click",delAlltemNormal)
    document.querySelector(".fix__btn__close").addEventListener("click",()=>{
        document.querySelector(".input__box").style.display = "block"
        document.querySelector(".fix__box").style.display = "none"
        document.querySelectorAll(`.show__del__btn`).forEach(e=>{
            e.style.display = "block"
        })
    })
    document.querySelector(".fix__btn").addEventListener("click",fixDataNormal)
    document.querySelector(".input__btn--startpg").addEventListener("click",StartProgNormal)
}
function renderNormal() {
    var datas = Object.keys(JSON.parse(localStorage.getItem("userData")).dataNormal)
    datas.forEach(data=>{
        var frequen = JSON.parse(localStorage.getItem("userData")).dataNormal[data]
        document.querySelector(".show__content").innerHTML += `
        <div class="show__items" data="${data}" frequen="${frequen}">
            <div class="show__data show__data--color">${data}</div>
            <div class="show__frequen show__frequen--color">${frequen}</div>
            <div class="show__fix__btn">sửa</div>
            <div class="show__del__btn show__del__btn--${data}" data="${data}">x</div>
        </div>
        `
    })
    document.querySelectorAll(`.show__del__btn`).forEach(show_del_btn=>{
        show_del_btn.addEventListener("click",delItemNormal)
    })
    document.querySelectorAll(`.show__fix__btn`).forEach(show_fix_btn=>{
        show_fix_btn.addEventListener("click",fixBtnDataNormal)
    })
    borderDataNormal()
}
function inputNormal() {
    var inputdata = document.querySelector(".input__data")
    var inputfrequen = document.querySelector(".input__frequen")
    inputdata.classList.remove("input__erorr")
    inputfrequen.classList.remove("input__erorr")
    document.querySelector(".input__erorr__text").textContent=""
    var data = inputdata.value
    var frequen = inputfrequen.value
    if (isnotNumber(data)&&isnotNumber(frequen)) {
        document.querySelector(".input__erorr__text").textContent = "Vui lòng nhập đúng số liệu và tần số."
        inputdata.classList.add("input__erorr")
        inputfrequen.classList.add("input__erorr")
        document.querySelector(".input__data").focus()
        return
    } else if (isnotNumber(data)) {
        document.querySelector(".input__erorr__text").textContent = "Vui lòng nhập đúng số liệu."
        inputdata.classList.add("input__erorr")
        document.querySelector(".input__data").focus()
        return
    } else if (isnotNumber(frequen)||frequen<=0) {
        document.querySelector(".input__erorr__text").textContent = "Vui lòng nhập đúng tần số."
        inputfrequen.classList.add("input__erorr")
        document.querySelector(".input__frequen").focus()
        return
    }
    if (Object.keys(JSON.parse(localStorage.getItem("userData")).dataNormal).includes(data)) {
        callNoti({type:"warning",name:"Trùng lặp!",content:`Số liệu ${data} đã tồn tại`,yes_btn:"Thay thế",no_btn:"Hủy"})
        .then(()=>{
            document.querySelector(`.show__del__btn--${data}`).closest(".show__items").innerHTML = `
            <div class="show__data show__data--color">${data}</div>
            <div class="show__frequen show__frequen--color">${frequen}</div>
            <div class="show__fix__btn">sửa</div>
            <div class="show__del__btn show__del__btn--${data}" data="${data}">x</div>
            `
            document.querySelector(`.show__del__btn--${data}`).closest(".show__items").setAttribute("frequen",`${frequen}`)
            var newData = JSON.parse(localStorage.getItem("userData")).dataNormal
            newData[data] = frequen
            localStorage.setItem("userData",JSON.stringify({dataNormal:newData}))
            document.querySelectorAll(`.show__del__btn`).forEach(show_del_btn=>{
                show_del_btn.addEventListener("click",delItemNormal)
            })
            document.querySelectorAll(`.show__fix__btn`).forEach(show_fix_btn=>{
                show_fix_btn.addEventListener("click",fixBtnDataNormal)
            })
            document.querySelector(".input__data").focus()
            inputdata.value=""
            if (document.querySelector(".input__nofrequen__btn").classList.value.includes("input__nofrequen__btn--off")) {
                inputfrequen.value=""
            }
        })
        .catch(()=>{
            inputdata.value=""
            if (document.querySelector(".input__nofrequen__btn").classList.value.includes("input__nofrequen__btn--off")) {
                inputfrequen.value=""
            }
        })
    } else {
        showDataNormal(data,frequen)
        document.querySelectorAll(`.show__del__btn`).forEach(show_del_btn=>{
            show_del_btn.addEventListener("click",delItemNormal)
        })
        document.querySelectorAll(`.show__fix__btn`).forEach(show_fix_btn=>{
            show_fix_btn.addEventListener("click",fixBtnDataNormal)
        })
        document.querySelector(".input__data").focus()
        inputdata.value=""
        if (document.querySelector(".input__nofrequen__btn").classList.value.includes("input__nofrequen__btn--off")) {
            inputfrequen.value=""
        }
    }
}
function settingNormal(e) {
    if (e.target.classList.value.includes("input__nofrequen__btn--off")) {
        e.target.classList.remove("input__nofrequen__btn--off")
        e.target.classList.add("input__nofrequen__btn--on")
        e.target.textContent = "on"
        document.querySelector(".fix__frequen").value = 1
        document.querySelector(".fix__frequen").setAttribute("disabled","disabled")
        document.querySelector(".input__frequen").value = 1
        document.querySelector(".input__frequen").setAttribute("disabled","disabled")
    } else {
        e.target.classList.add("input__nofrequen__btn--off")
        e.target.classList.remove("input__nofrequen__btn--on")
        e.target.textContent = "off"
        document.querySelector(".fix__frequen").value = ""
        document.querySelector(".fix__frequen").removeAttribute("disabled")
        document.querySelector(".input__frequen").value = ""
        document.querySelector(".input__frequen").removeAttribute("disabled")
    }
}
function delItemNormal(e) {
    callNoti({type:"warning",content:`Bạn có muốn xoá số liệu : ${e.target.getAttribute("data")}`})
    .then(()=>{
        var deldata = e.target.getAttribute("data")
        var newData = JSON.parse(localStorage.getItem("userData")).dataNormal
        delete newData[deldata]
        localStorage.setItem("userData",JSON.stringify({dataNormal:newData}))
        e.target.closest(".show__items").remove()
        callToasts({name:"Xoá thành công!",duration:1500})
        borderDataNormal()
    })
    .catch(()=>{
        return false
    })
}
function delAlltemNormal() {
    callNoti({type:"warning",content:`Bạn có muốn xoá tất cả các số liệu ?`})
    .then(()=>{
        localStorage.setItem("userData",JSON.stringify({dataNormal:{}}))
        document.querySelector(".show__content").innerHTML = ""
        borderDataNormal()
    })
    .catch(()=>{})
}
function showDataNormal(data,frequen) {
    document.querySelector(".show__content").innerHTML += `
    <div class="show__items" data="${data}" frequen="${frequen}">
        <div class="show__data show__data--color">${data}</div>
        <div class="show__frequen show__frequen--color">${frequen}</div>
        <div class="show__fix__btn">sửa</div>
        <div class="show__del__btn show__del__btn--${data}" data="${data}">x</div>
    </div>
    `
    var newData = JSON.parse(localStorage.getItem("userData")).dataNormal
    newData[data] = frequen
    localStorage.setItem("userData",JSON.stringify({dataNormal:newData}))
    borderDataNormal()
}
function borderDataNormal() {
    if (Object.values(JSON.parse(localStorage.getItem("userData")).dataNormal).length==0) {
        document.querySelector(".show__content").style.border = "none"
    } else {
        document.querySelector(".show__content").style.border = "1px solid var(--text-color)"
    }
}
function fixBtnDataNormal(e) {
    var data = e.target.closest(".show__items").getAttribute("data")
    var frequen = e.target.closest(".show__items").getAttribute("frequen")
    document.querySelector(".fix__frequen").placeholder = frequen
    if (document.querySelector(".input__nofrequen__btn").classList.value.includes("input__nofrequen__btn--on")) {
        document.querySelector(".fix__frequen").value = 1
    } else {
        document.querySelector(".fix__frequen").value = frequen
    }
    document.querySelector(".fix__data").value = data
    document.querySelector(".fix__data").placeholder = data
    document.querySelector(".input__box").style.display = "none"
    document.querySelector(".fix__box").style.display = "block"
    document.querySelectorAll(`.show__del__btn`).forEach(e=>{
        e.style.display = "block"
    })
    document.querySelector(`.show__del__btn--${data}`).style.display = "none"
}
function fixDataNormal(e) {
    var data = document.querySelector(".fix__data").value
    var frequen = document.querySelector(".fix__frequen").value
    if (isnotNumber(data)||isnotNumber(frequen)||frequen<=0) {
        callNoti({type:"erorr",content:"Nhập sai dữ liệu"})
        return
    } else if (Object.keys(JSON.parse(localStorage.getItem("userData")).dataNormal).includes(data)
    && data != document.querySelector(".fix__data").placeholder) {
        callNoti({type:"warning",name:"Trùng lặp!",content:`Số liệu ${data} đã tồn tại`,yes_btn:"Thay thế",no_btn:"Hủy"})
        .then(()=>{
            var newItems = document.querySelector(`.show__del__btn--${data}`).closest(".show__items")
            newItems.setAttribute("frequen",`${frequen}`)
            document.querySelector(`.show__del__btn--${data}`).closest(".show__items").innerHTML = `
            <div class="show__data show__data--color">${data}</div>
            <div class="show__frequen show__frequen--color">${frequen}</div>
            <div class="show__fix__btn">sửa</div>
            <div class="show__del__btn show__del__btn--${data}" data="${data}">x</div>
            `
            document.querySelector(".input__box").style.display = "block"
            document.querySelector(".fix__box").style.display = "none"
            document.querySelectorAll(`.show__del__btn`).forEach(e=>{
                e.style.display = "block"
            })
            document.querySelector(`.show__del__btn--${document.querySelector(".fix__data").placeholder}`).closest(".show__items").remove()
            document.querySelectorAll(`.show__del__btn`).forEach(show_del_btn=>{
                show_del_btn.addEventListener("click",delItemNormal)
            })
            document.querySelectorAll(`.show__fix__btn`).forEach(show_fix_btn=>{
                show_fix_btn.addEventListener("click",fixBtnDataNormal)
            })
            var newData = JSON.parse(localStorage.getItem("userData")).dataNormal
            delete newData[document.querySelector(".fix__data").placeholder]
            newData[data] = frequen
            localStorage.setItem("userData",JSON.stringify({dataNormal:newData}))
            callToasts({name:"Sửa thành công!"})
        })
        .catch(()=>{})
        return
    }
    document.querySelector(".input__box").style.display = "block"
    document.querySelector(".fix__box").style.display = "none"
    document.querySelectorAll(`.show__del__btn`).forEach(e=>{
        e.style.display = "block"
    })
    var oldData = document.querySelector(".fix__data").placeholder
    var newItems = document.querySelector(`.show__del__btn--${oldData}`).closest(".show__items")
    newItems.setAttribute("data",`${data}`)
    newItems.setAttribute("frequen",`${frequen}`)
    newItems.innerHTML = `
    <div class="show__data show__data--color">${data}</div>
    <div class="show__frequen show__frequen--color">${frequen}</div>
    <div class="show__fix__btn">sửa</div>
    <div class="show__del__btn show__del__btn--${data}" data="${data}">x</div>
    `
    document.querySelectorAll(`.show__del__btn`).forEach(show_del_btn=>{
        show_del_btn.addEventListener("click",delItemNormal)
    })
    document.querySelectorAll(`.show__fix__btn`).forEach(show_fix_btn=>{
        show_fix_btn.addEventListener("click",fixBtnDataNormal)
    })
    var newData = JSON.parse(localStorage.getItem("userData")).dataNormal
    delete newData[oldData]
    newData[data] = frequen
    localStorage.setItem("userData",JSON.stringify({dataNormal:newData}))
    callToasts({name:"Sửa thành công!"})
}
function StartProgNormal() {
    if (Object.values(JSON.parse(localStorage.getItem("userData")).dataNormal).length <= 3) {
        callToasts({name:"Opps!",type:"error",content:"Nhập dữ liệu nhiều hơn 5!"})
        return
    }
    window.location = "../../MSL-binh-thuong/results-Normal"
}

// results - Normal

function loadResultsNormal() {
    if (Object.values(JSON.parse(localStorage.getItem("userData")).dataNormal).length <= 3) {
        document.querySelector(".results__box").style.display = "none"
        document.querySelector(".results__erorr").style.display = "block"
    }
    ProgramResultsNormal()
}
function ProgramResultsNormal() {
    var dataNormal = JSON.parse(localStorage.getItem("userData")).dataNormal
    var program1 = new Promise((resolve)=>{
        var sumX = Object.keys(dataNormal).reduce((initValue,key)=>{
            return initValue+key*dataNormal[key]
        },0)
        var nX = Object.values(dataNormal).reduce((initValue,frequen)=>{return initValue+Number(frequen)},0)
        var psX = Number((Object.keys(dataNormal).reduce((initValue,e)=>{
            return initValue += dataNormal[e]*((Number(e)-(sumX/nX))**2)
        },0)/nX).toFixed(2))
        var tbX = Number((sumX/nX).toFixed(2))
        resolve({"tbX":tbX,"nX":nX,"sumX":sumX,"S^2":psX,"S":Number((Math.sqrt(psX)).toFixed(8))})
    })
    var program2 = new Promise((resolve)=>{
        resolve({"sumX^2":Object.keys(dataNormal).reduce((initValue,key)=>{
            return initValue+(key)**2*dataNormal[key]
        },0)})
    })
    var program3 = new Promise((resolve)=>{
        var mostX = Object.keys(dataNormal)[0]
        Object.keys(dataNormal).forEach((data)=>{
            mostX = Number(dataNormal[Number(data)])>=Number(dataNormal[Number(mostX)]) ? data : mostX
        })
        resolve({"mostX":Number(mostX)})
    })
    var program4 = new Promise((resolve)=>{
        resolve({"minX":Math.min(...Object.keys(dataNormal)),"maxX":Math.max(...Object.keys(dataNormal))})
    })
    var program5 = new Promise((resolve)=>{
        var lengthData = Object.values(dataNormal).reduce((initValue,frequen)=>{return initValue+Number(frequen)},0)
        if (lengthData % 2 == 0) {
            var xk = findData(lengthData/2)
            var xk1 = findData(lengthData/2+1)
            var Me = (Number(xk)+Number(xk1))/2
        } else {
            var Me = findData(lengthData/2+1)
        }
        if (Math.floor(lengthData/2)%2 != 0) {
            var Q1 = findData(Math.floor(lengthData/4)+1)
            var Q3 = findData(Math.floor(lengthData*3/4)+1)
        } else {
            var q1xk1 = findData(Math.floor(lengthData/4)+1)
            var q1xk2 = findData(Math.floor(lengthData/4))
            var Q1 = (Number(q1xk1)+Number(q1xk2))/2
            var q3xk1 = findData(Math.floor(lengthData*3/4)+1)
            var q3xk2 = findData(Math.floor(lengthData*3/4))
            var Q3 = (Number(q3xk1)+Number(q3xk2))/2
        }
        resolve({"Q1":Q1,"Q2":Me,"Q3":Q3})
    })
    function findData(frequen) {
        var a = frequen
        return Number(Object.keys(dataNormal).find((e)=>{
            a-=dataNormal[e]
            if (a<=0) {
                return e
            }
        }))
    }
    Promise.all([program1,program2,program3,program4,program5])
    .then((results)=>{
        var resultsObject = {}
        results.forEach((e)=>{
            resultsObject = {...resultsObject,...e}
        })
        showResultsNormal(resultsObject)
    })
    .catch(()=>{
        document.querySelector(".results__box").style.display = "none"
        document.querySelector(".results__erorr").style.display = "block"
    })
}
function showResultsNormal(objectData) {
    document.querySelector(".results__TB").innerHTML = objectData["tbX"]
    document.querySelector(".results__Sum").innerHTML = objectData["sumX"]
    document.querySelector(".results__Sum2").innerHTML = objectData["sumX^2"]
    document.querySelector(".results__Most").innerHTML = objectData["mostX"]
    document.querySelector(".results__n").innerHTML = objectData["nX"]
    document.querySelector(".results__min").innerHTML = objectData["minX"]
    document.querySelector(".results__max").innerHTML = objectData["maxX"]
    document.querySelector(".results__Q1").innerHTML = objectData["Q1"]
    document.querySelector(".results__Q2").innerHTML = objectData["Q2"]
    document.querySelector(".results__Q3").innerHTML = objectData["Q3"]
    document.querySelector(".results__S2").innerHTML = objectData["S^2"]
    document.querySelector(".results__S").innerHTML = objectData["S"]
}
