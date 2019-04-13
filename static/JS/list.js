const tablePlace = document.querySelector("#table_place");

async function getApiResponse(spec) {
    let response = await fetch(`https://swapi.co/api/planets/${spec}`);
    let data = await response.json();
    return data;
}

function moreInfo() {
    return null

}

function nextButton() {
    return null
    // getApiResponse.then.nextPage
}

var id = 0;

function generateInfoButton() {
    let infoButton = document.createElement("button");
    infoButton.innerHTML = "residents";
    infoButton.setAttribute('name', id);
    id++;
    return infoButton
}

function generateList(selectedKeys, sth, results, elems) {
    selectedKeys.forEach(function (value) {
        let header = document.createElement("th");
        let headerText = document.createTextNode(value);
        header.appendChild(headerText);
        sth.appendChild(header);
        tablePlace.appendChild(sth);
        console.log(value);
        for (let planet of results) {
            console.log(planet);
            let tableElement = document.createElement("td");
            let tableText = document.createTextNode(planet[value]);
            tableElement.value = planet[value];
            tableElement.appendChild(tableText);
            elems.appendChild(tableElement);
        }
        sth.appendChild(elems);
        let infoButton = generateInfoButton();
        elems.appendChild(infoButton);
    });
}

function declareVariables(data) {
    let results = data['results'];
    const allKeys = Object.keys(data.results[0]);
    const selectedKeys = [allKeys[0], allKeys[3], allKeys[4],
        allKeys[6], allKeys[7], allKeys[8]];
    let sth = document.createElement("tr");
    let elems = document.createElement("tr");
    return {results, selectedKeys, sth, elems};
}

getApiResponse(" ")
    .then(function (data) {
        let nextPage = function () {
            return data['next']
        };
        const __ret = declareVariables(data);
        let results = __ret.results;
        const selectedKeys = __ret.selectedKeys;
        let sth = __ret.sth;
        let elems = __ret.elems;
        generateList(selectedKeys, sth, results, elems);
    });


