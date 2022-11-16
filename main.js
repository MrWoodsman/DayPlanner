function GenerateHoursBox() {
    const content = `
            <div class='box'>1</div>
            <div class='box'>2</div>
            <div class='box'>3</div>
            <div class='box'>4</div>
            <div class='box'>5</div>
            <div class='box'>6</div>
            <div class='box'>7</div>
    `
    for (let hours = 0; hours < 24; hours++) {
        // 1
        const hour = document.createElement('div')
        hour.setAttribute('class','row')
        hour.innerHTML = content
        document.querySelector('#hours_day').appendChild(hour)
        // 2
        const indicator = document.createElement('div')
        indicator.setAttribute('class','indicator')
        if (hours < 10) {
            indicator.innerHTML = `<div class='hour_box'><p>${'0'+hours}:00</p></div>`
        } else {
            indicator.innerHTML = `<div class='hour_box'><p>${hours}:00</p></div>`
        }
        document.querySelector('#hours').appendChild(indicator)

    }
}
GenerateHoursBox()