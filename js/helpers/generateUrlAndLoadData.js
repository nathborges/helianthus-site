function generatorUrlPath(input, interval) {
    let baseurl = 'https://helianthus.vito.io/metrics/'
    let newurl = baseurl + input + '?interval=' + interval
    return newurl
}

function loadData(url) {
    return fetch(url)
        .then((resp) => {
            let json = resp.json();
            if (resp.status >= 200 && resp.status < 300) {
                return json;
            } else {
                return json.then(Promise.reject.bind(Promise));
            }
        })
}