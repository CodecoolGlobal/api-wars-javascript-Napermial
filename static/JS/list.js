async function getApiResponse(spec) {
    let response = await fetch(`${spec}`);
    return await response.json()
}


function modalPopulate(links) {
    let arrOfLinks = extractLinks(links);
    for (link of arrOfLinks) {
        console.log(link);
        getApiResponse(link)
            .then(function (data) {
                console.log(data);
                data = [data];
                let selectedKeys = Object.keys(data[0]);
                let newerKeys = [selectedKeys[0], selectedKeys[1],
                    selectedKeys[2], selectedKeys[3], selectedKeys[4],
                    selectedKeys[5], selectedKeys[6], selectedKeys[7]];
                let landingSite = document.createElement('tr');
                let modalContent = document.querySelector('#modalTable');
                generateList(newerKeys, landingSite, data,modalContent)

            });
    }

}

function extractLinks(links) {
    let linkNumber = (links.match(/,/g) || []).length + 1;
    let linkArray = [];
    for (let i = 0; i < linkNumber; i++) {
        let link = links.match('https?:\/\/(www\.)?[a-z]{2,256}\.[a-z]{2,4}\/([a-z0-9]*)\/([a-z]*)\/([0-9]*)\/')[0];
        linkArray.push(link);
        links = links.replace(link, '')
    }
    return linkArray
}

function moreInfo() {
    let buttons = document.querySelectorAll('button.button');
    for (button of buttons) {
        button.addEventListener('click', function () {
            let links = this['name'];
            let modal = renderModal();
            modalPopulate(links);
            modal.style.display = 'block';
        })
    }
}

function renderModal() {
    let modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    modal.setAttribute('id', 'myModal');
    let modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modalContent');
    modal.appendChild(modalContent);
    let close = document.createElement('span');
    close.setAttribute('class', 'close');
    close.innerHTML = '&times;';
    let infoTable = document.createElement('table');
    infoTable.setAttribute('id', 'modalTable');
    modalContent.appendChild(infoTable);
    modalContent.appendChild(close);
    document.body.appendChild(modal);
    close.addEventListener('click', function () {
        document.body.removeChild(modal)

    });
    return modal
}

function navButtons(next, last) {
    let nextPage = next;
    let prevPage = last;
    let nextButton = document.getElementById('#nextNavButton');
    let prevButton = document.getElementById('lastNavButton')
}

function generateInfoButton(planetResidents) {
    let infoButton = document.createElement("button");
    infoButton.innerHTML = "residents";
    infoButton.setAttribute('class', 'button');
    infoButton.setAttribute('name', planetResidents);
    return infoButton

}

function generateList(selectedKeys, landingSite, results, tablePlace) {
    selectedKeys.forEach(function (value) {
        let header = document.createElement("th");
        let headerText = document.createTextNode(value);
        header.appendChild(headerText);
        landingSite.appendChild(header);
        tablePlace.appendChild(landingSite);
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
            let infoButton = generateInfoButton([planet['residents']]);
            elems.appendChild(infoButton);
        }
    }
}

function declareVariables(data) {
    const tablePlace = document.querySelector("#table_to_show");
    let results = data['results'];
    let nextPage = data['next'];
    let previousPage = data['previous'];
    const allKeys = Object.keys(data.results[0]);
    const selectedKeys = [allKeys[0], allKeys[3], allKeys[4],
        allKeys[6], allKeys[7], allKeys[8]];
    let sth = document.createElement("tr");
    return {results, selectedKeys, landingSite: sth, nextPage, previousPage, tablePlace};
}


function main() {
    getApiResponse("https://swapi.co/api/planets/")
        .then(function (data) {
            const __ret = declareVariables(data);
            let results = __ret.results;
            const selectedKeys = __ret.selectedKeys;
            let sth = __ret.landingSite;
            let tablePlace = __ret.tablePlace;
            generateList(selectedKeys, sth, results, tablePlace);
            moreInfo();
            navButtons(__ret.nextPage, __ret.previousPage)
        });
}

main();
