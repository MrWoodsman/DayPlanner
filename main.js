function GenerateHoursBox() {
    const content = `
            <div class='box'></div>
            <div class='box'></div>
            <div class='box'></div>
            <div class='box'></div>
            <div class='box'></div>
            <div class='box'></div>
            <div class='box'></div>
    `
    for (let hours = 0; hours < 24; hours++) {
        // 1
        const hour = document.createElement('div')
        hour.setAttribute('class','row')
        hour.innerHTML = content
        hour.setAttribute('hours',hours)
        document.querySelector('#hours_day').appendChild(hour)
        // 2
        const indicator = document.createElement('div')
        indicator.setAttribute('class','indicator')
        if (hours < 10) {
            indicator.innerHTML = `<div class='hour_box'><p>${'0'+hours}:00</p><div class='minutes'></div></div>`
        } else {
            indicator.innerHTML = `<div class='hour_box'><p>${hours}:00</p><div class='minutes'></div></div>`
        }
        document.querySelector('#hours').appendChild(indicator)

    }
}
GenerateHoursBox()

var plan = [
    {'date':'14-11-2022','name':'Test Event','start':'4','duration':'1.5','repet_destinition':'everyday'},
    {'date':'17-11-2022','name':'Test Event','start':'4','duration':'1','repet_destinition':'everyday'},
    {'date':'17-11-2022','name':'Test Event','start':'0','duration':'4','repet_destinition':'everyday'},
    {'date':'18-11-2022','name':'Test Event','start':'4','duration':'1.5','repet_destinition':'everyday'},
    {'date':'18-11-2022','name':'Test Event','start':'14','duration':'2','repet_destinition':'everyday'},
    {'date':'19-11-2022','name':'Test Event','start':'15','duration':'1.25','repet_destinition':'everyday'},
    {'date':'15-11-2022','name':'Test Event','start':'15','duration':'3.75','repet_destinition':'everyday'},
    {'date':'16-11-2022','name':'Test Event','start':'16.5','duration':'2.25','repet_destinition':'everyday'},
    {'date':'16-11-2022','name':'Test Event','start':'18.75','duration':'1','repet_destinition':'everyday'},
    {'date':'21-11-2022','name':'Test Event','start':'18.5','duration':'1','repet_destinition':'everyday'},
    {'date':'23-11-2022','name':'Test Event','start':'13.5','duration':'3','repet_destinition':'everyday'},
]

var a_day, a_month, a_year, a_week
var change_week = 0
var backup_change_week = 0
var month_change = 0
const topMenu = document.querySelector('#top_menu')
const timeIndicator = document.querySelector('#time_indicator')
var rowSize = 100    // Wysokość kafelków w { px }

function GetActualData() {
    // Ustalanie daty dla indykatorów dni
    // Robiłem to z 1,5H 🤯
    // Jednak coś nie działało i robiółem to 2H a może i więcej
    const boxes = document.querySelectorAll('.day_box')
    for (let index = 0; index < 7; index++) {
        const w0 = new Date()
        const w1 = new Date(w0.getFullYear(),w0.getMonth(),w0.getDate()+change_week)
        const firstDay5 = new Date(w1.setDate(w1.getDate() - w1.getDay() + 1))
        const t = firstDay5.getDate()+index
        w1.setDate(t)
        boxes[index].setAttribute('day_num',w1.getDate())
        boxes[index].setAttribute('month_num',w1.getMonth()+1)
        boxes[index].setAttribute('year_num',w1.getFullYear())
    }
    const actual = new Date()
    const date = new Date(actual.getFullYear(),actual.getMonth(),actual.getDate()+parseInt(change_week))
    // 
    a_day = date.getDate()
    a_month = date.getMonth() + 1   
    a_year = date.getFullYear()   
    // Set first and last day of week
    const firstDay = new Date(date.setDate(date.getDate() - date.getDay() + 1))
    const lastDay  = new Date(date.setDate(date.getDate() - date.getDay() + 7))
    // Setting atribues with date
    // ACTUAL
    topMenu.setAttribute('a_day',actual.getDate())
    topMenu.setAttribute('a_month',actual.getMonth()+1)
    topMenu.setAttribute('a_year',actual.getFullYear())
    // SELECTED
    topMenu.setAttribute('day',a_day)
    topMenu.setAttribute('month',a_month)
    topMenu.setAttribute('year',a_year)
    topMenu.setAttribute('first',firstDay.getDate())
    topMenu.setAttribute('last',lastDay.getDate())
    // Wyświetlanie aktualnego tygodnia, miesiąca i roku
    document.querySelector('#display_week').innerHTML = `${firstDay.getDate()} - ${lastDay.getDate()} ${GetMonth(a_month)} ${a_year}`
    // Wyświetlanie aktualnego dnia jeśli istnieje
    DisplayActualWeekDay()
    // DEV
    // console.warn('start: ' + firstDay.getDate(),'end: ' + lastDay.getDate());
    GetPlanData()
}
GetActualData()

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function GetMonth(x) {
    const monthName = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']
    return monthName[x-1]
}
function DisplayActualWeekDay() {
    // DEV
    // console.log(topMenu.getAttribute('a_day'))
    if(topMenu.getAttribute('month') === topMenu.getAttribute('a_month') && topMenu.getAttribute('year') === topMenu.getAttribute('a_year')) {
        document.querySelectorAll('.day_box').forEach((e) => {
            if(e.getAttribute('day_num') == topMenu.getAttribute('a_day')) {
                e.classList.add('actual_day')
            } else {
                e.classList.remove('actual_day')
            }
        })
    }
}
function DisplayActualTime() {
    const t = new Date()
    // console.warn(t.getHours(), t.getMinutes());
    timeIndicator.style.top = `${t.getHours()*rowSize + t.getMinutes()*(rowSize/60)}px`
}
const updateInterval = setInterval(DisplayActualTime, 500)  // Tworzenie interwału
DisplayActualTime()



function GetPlanData() {
    document.querySelectorAll('.box').forEach((e) => {
        for (let index = 0; index < e.children.length; index++) {
            const element = e.children[index];
            element.remove()
        }
    })
    document.querySelectorAll('.day_box').forEach((e) => {
        // console.warn(e.getAttribute('day_num'),e.getAttribute('month_num'),e.getAttribute('year_num'));
        const da = `${e.getAttribute('day_num')}-${e.getAttribute('month_num')}-${e.getAttribute('year_num')}`
        plan.filter(x => x.date == da).forEach((e) => {
            const [ Tday, Tmonth, Tyear ] = e.date.split("-")
            var TestDay     // Zmienna
            if (Tday.length == 1) {
                TestDay = new Date(`${Tyear}-${Tmonth}-0${Tday}T03:12:00`);
            } else {
                TestDay = new Date(`${Tyear}-${Tmonth}-${Tday}T03:12:00`);
            }
            var weekDay = TestDay.getDay()-1;     // Numer dnia tygodnia
            // 
            const event = document.createElement('div')
            event.setAttribute('class','event')
            var difrent = e.start - Math.floor(e.start) 
            event.style.height = `calc(${e.duration*100}%)`
            event.style.top = difrent*100+'%'
            // document.querySelector('#hours_day')
            var parent 
            document.querySelectorAll('.row').forEach((x) => {
                if(x.getAttribute('hours')==Math.floor(e.start)) {
                    parent = x
                }
            })
            parent.children[weekDay].appendChild(event)
        })
    })
}
// GetPlanData()

// Poprzedni tydzien
document.querySelector('#previous_week').addEventListener('click',(e) => {
    backup_change_week = change_week
    change_week += 7
    GetActualData()
})
// Następny tydzien
document.querySelector('#next_week').addEventListener('click',(e) => {
    backup_change_week = change_week
    change_week -= 7
    GetActualData()
})

// Przewijanie do kreski wskazującej aktualny czas
window.scroll({
    top: timeIndicator.offsetTop-500,
    behavior: 'smooth'
});