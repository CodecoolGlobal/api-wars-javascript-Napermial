const tablePlace = document.querySelector("#table_to_show");

async function getApiResponse(spec) {
    let response = await fetch(`https://swapi.co/api/planets/${spec}`);
    let data = await response.json();
    return data;
}

function moreInfo() {
    let buttons = document.querySelectorAll('button.button');
    for(button of buttons){
        button.addEventListener('click', function () {
            alert(button['name'])
        })

    }
}

function nextButton() {
    return null
    // getApiResponse.then.nextPage
}

function generateInfoButton(planetResidents) {
    let infoButton = document.createElement("button");
    infoButton.innerHTML = "residents";
    infoButton.setAttribute('class','button');
    infoButton.setAttribute('name', planetResidents);
    return infoButton
}

function generateList(selectedKeys, sth, results) {
    selectedKeys.forEach(function (value) {
        let header = document.createElement("th");
        let headerText = document.createTextNode(value);
        header.appendChild(headerText);
        sth.appendChild(header);
        tablePlace.appendChild(sth);
        console.log(value);

    });
    for (let planet of results) {
        let elems = document.createElement("tr");
        console.log(planet);
        for (let elem of selectedKeys) {
            let tableElement = document.createElement("td");
            let tableText = document.createTextNode(planet[elem]);
            tableElement.value = planet[elem];
            tableElement.appendChild(tableText);
            elems.appendChild(tableElement);
            tablePlace.appendChild(elems);
        }
        if (planet['residents'] && planet['residents'].length) {
            let infoButton = generateInfoButton(planet['residents']);
            elems.appendChild(infoButton);
        }
    }
}

function declareVariables(data) {
    let results = data['results'];
    const allKeys = Object.keys(data.results[0]);
    const selectedKeys = [allKeys[0], allKeys[3], allKeys[4],
        allKeys[6], allKeys[7], allKeys[8]];
    let sth = document.createElement("tr");
    return {results, selectedKeys, sth};
}



function main() {
    getApiResponse(" ")
        .then(function (data) {
            let nextPage = function () {
                return data['next']
            };
            const __ret = declareVariables(data);
            let results = __ret.results;
            const selectedKeys = __ret.selectedKeys;
            let sth = __ret.sth;
            generateList(selectedKeys, sth, results);
            moreInfo()
        });
}

main();
