window.addEventListener("load", function () {
    let deviceid = sessionStorage.getItem('device')
    let url = generatorUrlPath(deviceid, 'day')
    let a = loadData(url)
        .then((data) => setDataOnsessionStorage(data))
        .catch(() => window.location.href = "./device-id.html?device_not_found=true");
    sessionStorage.setItem('metrics', a)
    setTimeout(function () {
        window.location.href = "./chart.html";
    }, 3000);
})

function setDataOnsessionStorage(data) {
    sessionStorage.clear
    sessionStorage.setItem('date', getAndSetActivatedData(data))
    sessionStorage.setItem('baseprice', getAndSetBasePrice(data))
    sessionStorage.setItem('estimateprice', getAndSetEstimatePrice(data))
}

function getAndSetBasePrice(data) {
    let price = data.price_per_kwh
    price = price.toFixed(2).toString().replace(".", ",")
    return price
}

function getAndSetEstimatePrice(data) {
    let valueRaw = data.averages[0].cost
    value = valueRaw.toFixed(2)
    value = value.toString().replace(".", ",")
    return value
}

function getAndSetActivatedData(data) {
    let dateRaw = data.activated_at
    let createdDateTime = new Date(dateRaw)
    let date = createdDateTime.toLocaleDateString('en-GB')
    return date
}

