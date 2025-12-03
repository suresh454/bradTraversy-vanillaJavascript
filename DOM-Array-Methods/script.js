const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const showMillionaireBtn = document.getElementById("show-millionaires");
const sortWealthBtn = document.getElementById("sort");
const calculateEntireWealth = document.getElementById("calculate-wealth");

let data = [];

async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
}

function addData(obj) {
    data.push(obj);
    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML =  "<h2><strong>Person</strong> Wealth</h2>";

    providedData.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney(){
    data = data.map(item => {
        return{...item, money: item.money *2}
    });
    updateDOM();
}

function sortByRichest(){
    data.sort((a,b) => {
        return b.money - a.money;
    });
    updateDOM();
}


function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

function calculateWealth() {
    const totalWealth = data.reduce((acc, user)=> (acc += user.money), 0);
    const element = document.createElement("div");
    element.innerHTML = `<h3> Total Wealth: <strong> ${formatMoney(totalWealth)} </stong></h3>`;
    main.appendChild(element);

}
//EventListeners
addUserBtn.addEventListener("click", getRandomUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
sortWealthBtn.addEventListener("click", sortByRichest);
showMillionaireBtn.addEventListener("click", showMillionaires);
calculateEntireWealth.addEventListener("click", calculateWealth);