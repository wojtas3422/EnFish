"use strict"
let kategoria
let slowa
let index
let slowo_pl
let slowo_en
let poprawnaOdp
let ostatniJezykOdp
let slowoPytane
let ctrl
let modalOpen
let proby = 0
let ekran = "main"
let stareVal = ""
let motywSchowany = true
const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
const overlay = document.querySelector(".overlay")
const odpField = document.querySelector("#numer")
const ekranGlowny = document.querySelector(".content")
const pytanie = document.querySelector(".question")
const pytanieTekst = document.querySelector("#pytanie")

fetch('./slowa.json')
    .then((response) => response.json())
    .then((json) => slowa = json);

span.onclick = function () {
    modal.style.display = "none";
    modalOpen = false
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalOpen = false
    }
}

addEventListener("keydown", (event) => {
    let przycisk = event.key.toLowerCase()
    if (przycisk == "control") {
        ctrl = true
    }
})

addEventListener("keyup", (event) => {
    let przycisk = event.key.toLowerCase()
    if (przycisk == "control") {
        ctrl = false
    }
})

function load() {
    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            clearInterval(stateCheck);
            overlay.style.display = "block"
            overlay.style.animation = "load 0.6s"
            setTimeout(() => {
                overlay.style.display = "none"
                overlay.style.animation = ""
            }, 500);
        }
    }, 100);
}

function updateText(ostatniJezykOdp) {
    if (ostatniJezykOdp == "pl") {
        pytanieTekst.innerHTML = `Jak powiedzieć <p class="slowoPytania" style="color:#517aff;"> ${slowoPytane}</p> po polsku?`
        slowoPytane = slowoPytane.toLowerCase()
        poprawnaOdp = poprawnaOdp.toLowerCase()
    } else {
        pytanieTekst.innerHTML = `Jak powiedzieć <p class="slowoPytania" style="color:#f74c4c;"> ${slowoPytane}</p> po angielsku?`
        slowoPytane = slowoPytane.toLowerCase()
        poprawnaOdp = poprawnaOdp.toLowerCase()
    }
}


addEventListener("keydown", (event) => {
    let przycisk = event.key.toLowerCase()
    if (przycisk == "/") {
        if (ctrl == true) {
            modal.style.display = "block";
            modalOpen = true
        }
    }
    if (ekran == "main") {
        switch (przycisk) {
            case "1":
                odpField.value = ""
                wybierzKategorie("ti")
                ekran = "pytania"
                break;
            case "2":
                odpField.value = ""
                wybierzKategorie("tziug")
                ekran = "pytania"
            case "3":
                odpField.value = ""
                wybierzKategorie("tmr")
                ekran = "pytania"
            case "4":
                odpField.value = ""
                wybierzKategorie("th")
                ekran = "pytania"
            case "escape":
                modal.style.display = "none";
        }
    } else if (ekran == "pytania") {
        switch (przycisk) {
            case "escape":
                if (modalOpen == false) {
                    odpField.blur()
                    menu()
                }
                else {
                    modal.style.display = "none";
                    modalOpen = false
                }
                break;
            case ".":
                setTimeout(() => {
                    odpField.focus()
                }, 5);
                break;
            case "arrowup":
                let koniec = odpField.value.length
                odpField.style.width = "300px"
                odpField.blur()
                odpField.setSelectionRange(koniec, koniec)
                odpField.value = stareVal
                setTimeout(() => {
                    odpField.focus()
                }, 10);
                break
        }
    }
});

function menu() {
    overlay.style.animation = "transition 0.6s"
    overlay.style.display = "block"
    
    setTimeout(() => {
        ekranGlowny.style.display = 'block'
        pytanie.style.display = 'none'
        ekran = "main"
    }, 300);
    setTimeout(() => {
        overlay.style.display = "none"
        proby = 0
        let probyTekst = document.querySelector(".proby")
        probyTekst.innerHTML = `Pozostało prób: ${4 - proby}`
    }, 500);

}


function nowyIndex(indexStary, kategoria) {
    while (indexStary == index) {
        if (kategoria == "ti") {
            index = Math.floor(Math.random() * (slowa.ti.pl).length)
        } else if (kategoria == "tziug") {
            index = Math.floor(Math.random() * (slowa.tziug.pl).length)
        } else if (kategoria == "tmr") {
            index = Math.floor(Math.random() * (slowa.tmr.pl).length)
        } else if (kategoria == "th") {
            index = Math.floor(Math.random() * (slowa.th.pl).length)
        }
    }
}

function zmienJezyk() {
    if (ostatniJezykOdp == "en") {
        ostatniJezykOdp = "pl"
        poprawnaOdp = slowo_pl
        slowoPytane = slowo_en
        slowoPytane = slowoPytane.toLowerCase()
        poprawnaOdp = poprawnaOdp.toLowerCase()
    } else {
        ostatniJezykOdp = "en"
        poprawnaOdp = slowo_en
        slowoPytane = slowo_pl
        slowoPytane = slowoPytane.toLowerCase()
        poprawnaOdp = poprawnaOdp.toLowerCase()
    }
}

function wybierzKategorie(category) {
    kategoria = category
    switch (kategoria) {
        case 'ti':
            index = Math.floor(Math.random() * (slowa.ti.pl).length)
            slowo_pl = slowa.ti.pl[index]
            slowo_en = slowa.ti.en[index]
            poprawnaOdp = slowo_en
            ostatniJezykOdp = "en"
            break;
        case 'tziug':
            index = Math.floor(Math.random() * (slowa.tziug.pl).length)
            slowo_pl = slowa.tziug.pl[index]
            slowo_en = slowa.tziug.en[index]
            poprawnaOdp = slowo_en
            ostatniJezykOdp = "en"
            break;
        case "tmr":
            index = Math.floor(Math.random() * (slowa.tmr.pl).length)
            slowo_pl = slowa.tmr.pl[index]
            slowo_en = slowa.tmr.en[index]
            poprawnaOdp = slowo_en
            ostatniJezykOdp = "en"
            break;
        case "th":
            index = Math.floor(Math.random() * (slowa.th.pl).length)
            slowo_pl = slowa.th.pl[index]
            slowo_en = slowa.th.en[index]
            poprawnaOdp = slowo_en
            ostatniJezykOdp = "en"
            break;
    }
    pytanieTekst.innerHTML = `Jak powiedzieć <p class="slowoPytania" style="color:#f74c4c;"> ${slowo_pl}</p> po angielsku?`
    let overlay = document.querySelector(".overlay")
    overlay.style.animation = "transition 0.6s"
    overlay.style.display = "block"
    setTimeout(() => {
        ekranGlowny.style.display = 'none'
        pytanie.style.display = 'grid'
        ekran = "main"
    }, 300);
    setTimeout(() => {
        overlay.style.display = "none"
    }, 500);
    setTimeout(() => {
        odpField.focus()
        ekran = "pytania"
    }, 400);
}

function check(slowo_pl, slowo_en, odp, jezyk) {
    if (jezyk == "en") {
        let x = 0
        slowo_en = slowo_en.split(" lub ")
        if (typeof (slowo_en) == "object") {
            slowo_en.forEach(element => {
                if (element == odp) {
                    x++
                }
            });
            if (x >= 1) {
                x = 0
                return true
            }
            if (x < 1) {
                x = 0
                return false
            }
        } else {
            if (odp == slowo_en)
                return true
        }
    } else if (jezyk == "pl") {
        let x = 0
        slowo_pl = slowo_pl.split(" lub ")
        if (typeof (slowo_pl) == "object") {
            slowo_pl.forEach(element => {
                if (element == odp) {
                    x++
                }
            });
            if (x >= 1) {
                x = 0
                return true
            }
            if (x < 1) {
                x = 0
                return false
            }
        } else {
            if (odp == slowo_pl)
                return true
        }
    }
}

function odpowiedz() {
    console.log(slowo_en, slowo_pl)
    let odp = odpField
    function handleForm(e) { e.preventDefault(); }
    form.addEventListener('submit', handleForm);

    let odpValue = odp.value.trim()
    odpValue = odpValue.toLowerCase()

    if (odp.value.length != 0) {
        if (check(slowo_pl, slowo_en, odpValue, ostatniJezykOdp)) {
            let indexStary = index
            if (kategoria == "ti") {
                nowyIndex(indexStary, kategoria)
                slowo_pl = slowa.ti.pl[index]
                slowo_en = slowa.ti.en[index]
                zmienJezyk()
            } else if (kategoria == "tziug") {
                nowyIndex(indexStary, kategoria)
                slowo_pl = slowa.tziug.pl[index]
                slowo_en = slowa.tziug.en[index]
                zmienJezyk()
            } else if (kategoria == "tmr") {
                nowyIndex(indexStary, kategoria)
                slowo_pl = slowa.tmr.pl[index]
                slowo_en = slowa.tmr.en[index]
                zmienJezyk()
            } else if (kategoria == "th") {
                nowyIndex(indexStary, kategoria)
                slowo_pl = slowa.th.pl[index]
                slowo_en = slowa.th.en[index]
                zmienJezyk()
            }
            odpField.style.animation = "dobraOdp 0.4s"
            stareVal = ''
            odp.value = ''
            setTimeout(function () {

                odpField.style.animation = ""
            }, 400)
            updateText(ostatniJezykOdp)

        } else {
            odpField.style.animation = "zlaOdp 0.3s"
            stareVal = odpField.value
            proby++
            let probyTekst = document.querySelector(".proby")
            probyTekst.innerHTML = `Pozostało prób: ${4 - proby}`
            console.log(proby)
            if (proby == 4) {
                proby = 0
                let indexStary = index
                probyTekst.innerHTML = `Poprawną odpowiedzią było: <span>${poprawnaOdp}</span>`
                if (kategoria == "ti") {
                    nowyIndex(indexStary, kategoria)
                    slowo_pl = slowa.ti.pl[index]
                    slowo_en = slowa.ti.en[index]
                    zmienJezyk()
                } else if (kategoria == "tziug") {
                    nowyIndex(indexStary, kategoria)
                    slowo_pl = slowa.tziug.pl[index]
                    slowo_en = slowa.tziug.en[index]
                    zmienJezyk()
                } else if (kategoria == "tmr") {
                    nowyIndex(indexStary, kategoria)
                    slowo_pl = slowa.tmr.pl[index]
                    slowo_en = slowa.tmr.en[index]
                    zmienJezyk()
                } else if (kategoria == "th") {
                    nowyIndex(indexStary, kategoria)
                    slowo_pl = slowa.th.pl[index]
                    slowo_en = slowa.th.en[index]
                    zmienJezyk()
                }
                updateText(ostatniJezykOdp)
                setTimeout(() => {
                    probyTekst.innerHTML = `Pozostało prób: ${4 - proby}`
                }, 3000);
            }
            odpField.value = ""
            setTimeout(function () {
                odpField.style.animation = ""
            }, 300)

        }
    } else {
        odpField.style.animation = "zlaOdp 0.3s"
        setTimeout(function () {
            odpField.style.animation = ""
        }, 300)
    }
}