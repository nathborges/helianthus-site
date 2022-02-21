window.addEventListener("load", function () {
    let baseprice = sessionStorage.getItem('baseprice');
    let date = sessionStorage.getItem('date');
    let device = '#' + sessionStorage.getItem('device');
    insertDataInElement('base-price', '', baseprice);
    insertDataInElement('device-data', '', date);
    insertDataInElement('device-id', '', device);
})

function insertDataInElement(elementId, unit, content) {
    let element = document.getElementById(elementId);
    element.innerHTML = ''
    let elementText = document.createTextNode(unit + ' ' + content);
    element.appendChild(elementText);
}

function showAndCalculateEstimatePrice(interval) {
    deviceid = sessionStorage.getItem('device')
    let url = generatorUrlPath(deviceid, interval)
    let arrayofaverages = loadData(url)
        .then(r => r.averages.map(i => i.cost))
        .then(r => r.reduce((acc, cost) => acc + cost))
        .then(r => insertDataInElement('estimate-value', 'R$', r.toFixed(2).replace(".", ",")))
}

function getAverages(data) {
    let averages = data.averages
    return averages
}

function getAndSetSumPower(interval) {
    deviceid = sessionStorage.getItem('device')
    let url = generatorUrlPath(deviceid, interval)
    let arrayofaverages = loadData(url)
        .then((data) => getAverages(data))
        .then((averages) => sumPower(averages))
        .then((power) => insertDataInElement('estimate-power', '~', power))
}

function sumPower(data) {
    let sumPower = 0
    data.forEach(element => {
        s = sumPower + element.power
        sumPower = s
    });
    return Math.round(sumPower / 1000) + ' kWh'
}