async function getApiResponse(spec) {
    let response = await fetch(`${spec}`);
    return await response.json()
}


function modalPopulate(links) {
    let arrOfLinks = extractLinks(links);
    getApiResponse(arrOfLinks[0])
        .then(function (data) {
            data = [data];
            let selectedKeys = Object.keys(data[0]);
            let newerKeys = [selectedKeys[0], selectedKeys[1],
                selectedKeys[2], selectedKeys[3], selectedKeys[4],
                selectedKeys[5], selectedKeys[6], selectedKeys[7]];
            let landingSite = document.createElement('tr');
            let modalContent = document.querySelector('#modalTable');
            generateHeader(newerKeys, landingSite, modalContent);
        });
    for (link of arrOfLinks) {
        console.log(link);
        getApiResponse(link)
            .then(function (data) {
                data = [data];
                let selectedKeys = Object.keys(data[0]);
                let newerKeys = [selectedKeys[0], selectedKeys[1],
                    selectedKeys[2], selectedKeys[3], selectedKeys[4],
                    selectedKeys[5], selectedKeys[6], selectedKeys[7]];
                let modalContent = document.querySelector('#modalTable');

                generateWithoutHeader(data, newerKeys, modalContent)
                // generateList(newerKeys, landingSite, data, modalContent)
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
    modalContent.appendChild(close);
    modalContent.appendChild(infoTable);
    document.body.appendChild(modal);
    close.addEventListener('click', function () {
        document.body.removeChild(modal)

    });
    return modal
}

function clearTable(table) {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

function navButtons(next, last) {
    let theTable = document.querySelector('#table_to_show');
    let nextButton = document.querySelector('#nextNavButton');
    nextButton.addEventListener('click', function () {
        clearTable(theTable);
        getApiResponse(next)
            .then(function (data) {
                const __ret = declareVariables(data);
                let results = __ret.results;
                const selectedKeys = __ret.selectedKeys;
                let sth = __ret.landingSite;
                let tablePlace = __ret.tablePlace;
                generateList(selectedKeys, sth, results, tablePlace);
                moreInfo();
                next = __ret.nextPage;
                last = __ret.previousPage
            });
    });
    let prevButton = document.querySelector('#lastNavButton');
    prevButton.addEventListener('click', function () {
        clearTable(theTable);
        getApiResponse(last)
            .then(function (data) {
                const __ret = declareVariables(data);
                let results = __ret.results;
                const selectedKeys = __ret.selectedKeys;
                let sth = __ret.landingSite;
                let tablePlace = __ret.tablePlace;
                generateList(selectedKeys, sth, results, tablePlace);
                moreInfo();
                next = __ret.nextPage;
                last = __ret.previousPage
            });
    })
}

function generateInfoButton(planetResidents) {
    let infoButton = document.createElement("button");
    let resNumber = planetResidents[0].length;
    infoButton.innerHTML = resNumber + " residents";
    infoButton.setAttribute('class', 'button');
    infoButton.setAttribute('name', planetResidents);
    return infoButton
}

function generateVoteButton(planetID, planetName) {
    let voteButton = document.createElement('button');
    voteButton.setAttribute('class', planetName);
    voteButton.setAttribute('id', planetID);
    voteButton.innerText = 'vote for ' + planetName;
    return voteButton
}

function voteSetting(planetId, planetName) {
    var voteButton = generateVoteButton(planetId, planetName);
    voteButton.addEventListener('click', function () {
        let planetList = {
            'planetName': planetName,
            'planetId': planetId
        };
        let url = '/';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(planetList),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function (response) {
            if (response.ok) {
                let successAlert = document.createElement('div');
                successAlert.setAttribute('class', 'alert alert-success alert-dismissible');
                let text = document.createTextNode('You have successfully voted for ' + planetName);
                successAlert.appendChild(text);
                document.body.appendChild(successAlert);
                setTimeout(function () {
                    document.body.removeChild(successAlert)
                }, 2000)
            } else if (response.status === 500) {
                let warningAlert = document.createElement('div');
                warningAlert.setAttribute('class', 'alert alert-warning alert-dismissible');
                let text = document.createTextNode('You have already voted for ' + planetName);
                warningAlert.appendChild(text);
                document.body.appendChild(warningAlert);
                setTimeout(function () {
                    document.body.removeChild(warningAlert)
                }, 2000)
            }
        })
    });
    return voteButton;
}

function generateWithoutHeader(results, selectedKeys, tablePlace) {
    for (let planet of results) {
        let elems = document.createElement("tr");
        if (sessionStorage.getItem('user_name') !== undefined) {
            let planetName = planet['name'];
            let planetId = planet['url'];
            planetId = planetId.slice(29).replace('/', '');
            var voteButton = voteSetting(planetId, planetName);
        }
        for (let elem of selectedKeys) {
            let tableElement = document.createElement("td");
            let tableText = document.createTextNode(planet[elem]);
            if (elem === 'surface_water') {
                tableText.textContent = planet[elem] + '%'
            }
            if (planet[elem] === 'unknown') {
                tableText.textContent = planet[elem]
            }
            if (elem === 'population') {
                tableText.textContent = planet[elem] + ' people';
            }
            if (planet[elem] !== [] && elem === 'residents') {
                tableText.textContent = planet[elem].length + ' known resident(s)'
            }
            tableElement.value = planet[elem];
            tableElement.appendChild(tableText);
            elems.appendChild(tableElement);
            tablePlace.appendChild(elems);
        }
        if (planet['residents'] && planet['residents'].length) {
            let infoButton = generateInfoButton([planet['residents']]);
            elems.appendChild(infoButton);
        }

        if (document.querySelector('#user_active')) {
            elems.appendChild(voteButton);
        if (elems.parentNode['id'] !== 'modalTable') {
            elems.appendChild(voteButton);
        }}
    }
}


function generateHeader(selectedKeys, landingSite, tablePlace) {
    selectedKeys.forEach(function (value) {
        let header = document.createElement("th");
        let headerText = document.createTextNode(value);
        header.appendChild(headerText);
        landingSite.appendChild(header);
        tablePlace.appendChild(landingSite);
    });
}

function generateList(selectedKeys, landingSite, results, tablePlace) {
    generateHeader(selectedKeys, landingSite, tablePlace);
    generateWithoutHeader(results, selectedKeys, tablePlace);
}

function declareVariables(data) {
    const tablePlace = document.querySelector("#table_to_show");
    let results = data['results'];
    let nextPage = data['next'];
    let previousPage = data['previous'];
    const allKeys = Object.keys(data.results[0]);
    const selectedKeys = [allKeys[0], allKeys[3], allKeys[4],
        allKeys[6], allKeys[7], allKeys[8], allKeys[9]];
    let sth = document.createElement("tr");
    return {results, selectedKeys, landingSite: sth, nextPage, previousPage, tablePlace};
}


function main(mainUrl) {
    getApiResponse(mainUrl)
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

let mainURL = "https://swapi.co/api/planets/";
main(mainURL);
