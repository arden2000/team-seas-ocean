const trashContainer = document.querySelector(".trash-container");
const moneyText = document.querySelector(".money");
const currenyFormatter = new Intl.NumberFormat("en-us", { 
    style: "currency", 
    currency: "USD", 
    maximumFractionDigits: 0,
});

const trashFormatter = new Intl.NumberFormat("en-us", { 
    minimumIntegerDigits: 8, 
    maximumFractionDigits: 0,
    useGrouping: false, 
});

const MONEY_GOAL = 30000000;
setupTrash();

async function setupTrash(){
    const amountRaised = await 
        fetch("https://tscache.com/donation_total.json")
        .then(res => res.json()).then(data => data.count);
    moneyText.innerText = currenyFormatter.format(amountRaised);
    const amountLefttoRaise = Math.max(MONEY_GOAL - amountRaised, 0);
    const stringAmount = trashFormatter.format(amountLefttoRaise);
    const trashAmount = {
        xxl: {
            amount: parseInt(`${stringAmount[0]}${stringAmount[1]}`),
            icon: "shopping_bag_black",
        },
        xl: {
            amount: parseInt(`${stringAmount[2]}`),
            icon: "takeout_dining_black",
        },
        l: {
            amount: parseInt(`${stringAmount[3]}`),
            icon: "headphones_black",
        },
        m: {
            amount: parseInt(`${stringAmount[4]}`),
            icon: "smartphone_black",
        },
        s: {
            amount: parseInt(`${stringAmount[5]}`),
            icon: "toys_black",
        },
        xs: {
            amount: parseInt(`${stringAmount[6]}`),
            icon: "liquor_black",
        },
    }
    Object.values(trashAmount).forEach(({amount, icon}) => {
        for (let i = 0; i < amount; i++){
            createTrash(icon)
        }
    });
}

function createTrash(icon) {
    const img = document.createElement('img');
    const top = randomNumberBetween(0, 50);
    const left = randomNumberBetween(0, 100);
    const size = top / 5 + 1;
    img.src = `/images/${icon}.svg`;
    img.classList.add("trash");
    img.style.width = `${size}vmin`;
    img.style.height = `${size}vmin`;
    img.style.top = `${top}vh`;
    img.style.left = `${left}vw`;
    img.style.setProperty("--rotation", `${randomNumberBetween(-30, 30)}deg`);
    trashContainer.appendChild(img);
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
