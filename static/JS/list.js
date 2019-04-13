const tablePlace = document.querySelector("#table_to_show");

async function getApiResponse(spec) {
    let response = await fetch(`https://swapi.co/api/${spec}`);
    let data = await response.json();
    return data;
}


function modalPopulate(links) {
    // if (links.slice(',') === links) {
    //     let parse = document.createElement('a');
    //     parse.href = links;
    //     let path = parse.pathname;
    //     console.log(path)
    // }else{
    // for (let link of [links]) {
    //     let parse = document.createElement('a');
    //     parse.href = link;
    //     let path = parse.pathname;
    //     console.log(path)
    // }}
    //
    // links = links.match(/people/g);
    // console.log(links)
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
    let infoText = document.createElement('table');
    modalContent.appendChild(infoText);
    modalContent.appendChild(close);
    document.body.appendChild(modal);
    close.addEventListener('click', function () {
        modal.style.display = 'none'
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

function generateList(selectedKeys, landingSite, results) {
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
    let results = data['results'];
    let nextPage = data['next'];
    let previousPage = data['previous'];
    const allKeys = Object.keys(data.results[0]);
    const selectedKeys = [allKeys[0], allKeys[3], allKeys[4],
        allKeys[6], allKeys[7], allKeys[8]];
    let sth = document.createElement("tr");
    return {results, selectedKeys, sth, nextPage, previousPage};
}

function secondaryFetch(link) {

}

function main() {
    getApiResponse("planets/")
        .then(function (data) {
            let nextPage = function () {
                return data['next']
            };
            const __ret = declareVariables(data);
            let results = __ret.results;
            const selectedKeys = __ret.selectedKeys;
            let sth = __ret.sth;
            let nextPage = __ret.nextPage;
            let prevP = __ret.previousPage;
            generateList(selectedKeys, sth, results);
            moreInfo()
            navButtons(nextPage,prevP )
        });
}

main();
