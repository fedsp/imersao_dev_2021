let initialdrawn = false;
const teams = [
    { name: "Corinthians", logo: "./media/corinthians.png" },
    { name: "Guarani", logo: "./media/guarani.png" },
    { name: "Santos", logo: "./media/santos.png" },
    { name: "São Paulo", logo: "./media/saopaulo.png" },
    { name: "Palmeiras", logo: "./media/palmeiras.png" },
    { name: "Ponte Preta", logo: "./media/pontepreta.png" }
];

const games = [
    { gameDate: '01/JAN/2021', score: { "São Paulo": 1, "Palmeiras": 3 } },
    { gameDate: '02/JAN/2021', score: { "Santos": 3, "Corinthians": 1 } },
    { gameDate: '03/JAN/2021', score: { "Ponte Preta": 1, "Guarani": 1 } },
    { gameDate: '04/JAN/2021', score: { "Palmeiras": 1, "Corinthians": 0 } },
]

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]


function initialDraw() {
    if (!initialdrawn) {
        let homeTeamsSelectorObj = document.getElementById("selectedHomeTeam");
        let VisitorTeamsSelectorObj = document.getElementById("selectedVisitorTeam");
        teams.forEach((team) => {
            let optionObj = document.createElement("option");
            optionObj.value = team.name;
            optionObj.innerHTML = team.name;
            homeTeamsSelectorObj.appendChild(optionObj);
            VisitorTeamsSelectorObj.appendChild(optionObj.cloneNode(true));
        })
        drawTable();
    }
}
initialDraw();

function increment(homeOrVisitor) {

    if (homeOrVisitor == "homeTeam") {
        currentScoreObj = document.getElementById("homeTeamScore");

    }
    else if (homeOrVisitor == "visitorTeam") {
        currentScoreObj = document.getElementById("visitorTeamScore");
    }
    currentScore = parseInt(currentScoreObj.innerHTML);
    currentScoreObj.innerHTML = currentScore + 1;
}

function decrement(homeOrVisitor) {
    if (homeOrVisitor == "homeTeam") {
        currentScoreObj = document.getElementById("homeTeamScore");

    }
    else if (homeOrVisitor == "visitorTeam") {
        currentScoreObj = document.getElementById("visitorTeamScore");
    }
    currentScore = parseInt(currentScoreObj.innerHTML);
    if (currentScore != 0) {
        currentScoreObj.innerHTML = currentScore - 1;
    }

}

function putTeamIcon(homeOrVisitor) {
    let logoObj = null;
    if (homeOrVisitor == "homeTeam") {
        selectedTeam = document.getElementById("selectedHomeTeam").value;
        logoObj = document.getElementById("teamLogoHome");
    }
    else if (homeOrVisitor == "visitorTeam") {
        selectedTeam = document.getElementById("selectedVisitorTeam").value;
        logoObj = document.getElementById("teamLogoVisitor");
    }
    logoObj.src = teams.find(element => element.name == selectedTeam).logo;
}

function updateDate() {
    let informedDate = document.getElementById("gameDate").value;
    let dateDisplayField = document.getElementById("gameDisplayDate");
    let { day, month, year } = dateToBraziliamDate(informedDate);
    dateDisplayField.innerHTML = `${day} de ${month}`;
}

function dateToBraziliamDate(date) {
    let informedDateArray = date.split("-");
    let year = parseInt(informedDateArray[0]);
    let month = months[parseInt(informedDateArray[1] - 1)];
    let day = parseInt(informedDateArray[2]);
    return { day: day, month: month, year: year };
}

function addItemToTable() {
    let informedDate = document.getElementById("gameDate").value;
    let { day, month, year } = dateToBraziliamDate(informedDate);
    let homeTeam = document.getElementById("selectedHomeTeam").value;
    let visitorTeam = document.getElementById("selectedVisitorTeam").value;
    let scoreHomeTeam = parseInt(
        document.getElementById("homeTeamScore").innerHTML
    );
    let scoreVisitorTeam = parseInt(
        document.getElementById("visitorTeamScore").innerHTML
    );
    let inputIsvalid = validateInput(day, year, homeTeam, visitorTeam, scoreHomeTeam, scoreVisitorTeam);
    if (!inputIsvalid) {
        return;
    }
    let tableObj = document.getElementById("mainTable");
    let gameObj = {
        gameDate: `${day}/${month.substring(0, 3).toUpperCase()}/${year}`,
        score: {}
    }
    gameObj.score[homeTeam] = scoreHomeTeam;
    gameObj.score[visitorTeam] = scoreVisitorTeam;
    games.push(gameObj);
    drawTable();
}

async function popUpRender(popUpText, color) {
    window.popupActive = true;
    var popupObj = document.createElement("div");
    var mountedPopUp = `<div class="uniquePopUp" style="background-color:${color}"><p class="spanText">${popUpText}</p></div>`
    popupObj.innerHTML = mountedPopUp;
    var divPopUp = document.getElementById('PopupRenderDiv');
    divPopUp.appendChild(popupObj);
    await sleep(4000);
    popupObj.innerHTML = "";
    window.popupActive = false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function shakeButton() {
    buttonObj = document.getElementById("shakeButton");
    buttonObj.className = "buttonShake";
    await sleep(820);
    buttonObj.className = "";
}


function validateInput(day, year, homeTeam, visitorTeam) {
    if (isNaN(day)) {
        shakeButton();
        popUpRender("Preencha corretamente a data", "#dc0000");
    }
    else if (year != 2021) {
        shakeButton();
        popUpRender("O ano deve ser 2021", "#dc0000");
    }
    else if (homeTeam == "" || visitorTeam == "") {
        shakeButton();
        popUpRender("Preencha os dois times", "#dc0000");
    }
    else if (homeTeam == visitorTeam) {
        shakeButton();
        popUpRender("Os times devem ser diferentes", "#dc0000");
    }
    else {
        return true;
    }
    return false;
}

function drawTable() {
    tableObj = document.getElementById("mainTable");
    tableObj.innerHTML = `<th>&nbsp</th><th>Time</th><th>Pontos</th><th>Jogos</th>`;
    teams.forEach((team) => {
        let tableRow = document.createElement("tr");
        let teamLogo = document.createElement("td");
        teamLogo.innerHTML = `${team.name}`;
        let teamName = document.createElement("td");
        let logoPath = teams.find(element => element.name == team.name).logo;
        teamName.innerHTML = `<img class="smallTeamLogo" src="${logoPath}">`;
        let teamPoints = document.createElement("td");
        teamPoints.innerHTML = calculatePoints(team);
        let teamGames = document.createElement("td");
        teamGames.innerHTML = calculateGames(team);
        tableRow.appendChild(teamLogo);
        tableRow.appendChild(teamName);
        tableRow.appendChild(teamPoints);
        tableRow.appendChild(teamGames);
        tableObj.appendChild(tableRow);
    })
}

function calculatePoints(team) {
    let gamesPlayed = games.filter(item => (team.name in item.score));
    let points = 0;
    gamesPlayed.forEach((item) => {
        const teams = Object.keys(item.score);
        const anotherTeam = teams.find(item => item != team.name);
        if ((item.score[team.name]) > (item.score[anotherTeam])) {
            points = points + 3;
        }
        else if((item.score[team.name]) == (item.score[anotherTeam])){
            points = points+1;
        }
    })

    return points;
}

function calculateGames(team) {
    let gamesPlayed = games.filter(item => (team.name in item.score));
    return gamesPlayed.length;
}