//api
const apiNewsKey = "KINWCqfOXaOflRlqwmizbOpaMIo85MFYp_CpbJAg144";
const newsApi = `https://api.newscatcherapi.com
/v2/latest_headlines?countries=AE&topic=business&page_size=10`;

//DOM
const heroSection = document.querySelector(".hero-section");

// render hero
const renderHero = (news) => {
    const newsTitleSection = document.createElement("div");
    newsTitleSection.classList.add("news-title-section");
    const newsTitle = document.createElement("p");
    newsTitle.classList.add("news-title");
    newsTitle.innerText = news.title;
    const readMore = document.createElement("a");
    readMore.classList.add("read-more");
    readMore.innerText = "Read More";
    readMore.href = news.link;
    readMore.target = "_blank";
    newsTitleSection.appendChild(newsTitle);
    newsTitleSection.appendChild(readMore);
    heroSection.style.backgroundImage = `
linear-gradient(
    to right,
    rgba(245, 246, 252, 0.52),
    rgb(12 11 12 / 73%)
  ),
  url("${news.media}")`;
    heroSection.appendChild(newsTitleSection);
};

// to render news card
const renderNewsCard = (news) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");
    latsetNews.appendChild(newsCard);
    const newsDiscription = document.createElement("p");
    newsDiscription.classList.add("news-discription");
    newsDiscription.innerText = news.title;
    newsCard.appendChild(newsDiscription);
    const readMore = document.createElement("a");
    readMore.classList.add("read-more-card-section");
    readMore.innerText = "Read More";
    readMore.href = news.link;
    readMore.target = "_blank";
    newsCard.appendChild(readMore);
};

window.addEventListener("load", (e) => {
    const casesApi = "https://covid-api.mmediagroup.fr/v1/cases";

    fetch(newsApi, (data) => {
        const { error, status, response } = data;
        if (error) {
            console.log(response);
            console.log(status);
        } else {
            console.log(response);
            renderHero(response.articles[0]);
        }
        for (let i = 1; i < 6; i++) {
            renderNewsCard(response.articles[i]);
        }
    });
    fetch(casesApi, (data) => {
        const { error, status, response } = data;
        if (error) {
            console.log(response);
            console.log(status);
        } else {
            // console.log(response);
            casesCount(data.response); //Get Count of cases Statistics section
            renderTable(data.response);
            console.log(getTopCases(data.response));

            // renderHero(response.articles[0]);
        }
    });
});

const getTopCases = (data) => {
    let sorted = [];
    Object.entries(data).forEach((entry) => {
        sorted.push(entry[1].All);
        sorted = sorted.sort((a, b) => b.confirmed - a.confirmed).slice(0, 6); // Get six sorted items
    });
    return sorted;
};

const casesCount = (data) => {
    return Object.entries(data).forEach((entry) => {
        console.log(entry);
    });
};

const renderTable = (data) => {
    const tbody = document
        .getElementById("covid-table")
        .getElementsByTagName("tbody")[0];
    let count = 1;
    Object.entries(data).forEach((entry) => {
        // entry[0] for country name
        // entry[1] for rest of data
        const newRow = tbody.insertRow();
        const idCell = newRow.insertCell();
        const id = document.createTextNode("" + count++);
        idCell.appendChild(id);

        const countryCell = newRow.insertCell();
        const country = document.createTextNode(entry[1].All.country);
        countryCell.appendChild(country);

        const totalCell = newRow.insertCell();
        const total = document.createTextNode(entry[1].All.confirmed);
        totalCell.appendChild(total);

        const deathCell = newRow.insertCell();
        const death = document.createTextNode(entry[1].All.deaths);
        deathCell.appendChild(death);

        const populationCell = newRow.insertCell();
        const population = document.createTextNode(entry[1].All.population);
        populationCell.appendChild(population);

        const lifeCell = newRow.insertCell();
        const life = document.createTextNode(entry[1].All.life_expectancy);
        lifeCell.appendChild(life);

        const locationCell = newRow.insertCell();
        const location = document.createTextNode(entry[1].All.location);
        locationCell.appendChild(location);
    });
};

renderTable();