const tablePlace = document.querySelector("#table_place");
const listElem = document.createElement("li");

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


getApiResponse(" ")
    .then(function (data) {
        let id = 0;
        let nextPage = function () {
            return data['next']
        };
        let results = data['results'];
        const allKeys = Object.keys(data.results[0]);
        const selectedKeys = [allKeys[0], allKeys[3], allKeys[4],
        allKeys[6], allKeys[7], allKeys[8]];
        selectedKeys.forEach(function (value) {

            let sth = document.createElement("tr");
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
                sth.appendChild(tableElement);
            }
            let infoButton = document.createElement("button");
                infoButton.innerHTML = "residents";
                infoButton.setAttribute('name', id);
                sth.appendChild(infoButton);
                id++
        });
    });


