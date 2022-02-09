//DOM
const heroSection = document.querySelector(".hero-section");

const renderHero = (news) => {
    const newsTitleSection = document.createElement("div");
    newsTitleSection.classList.add("news-title-section");
    const newsTitle = document.createElement("p");
    newsTitle.classList.add("news-title");
    newsTitle.innerText = news.title;
    const readMore = document.createElement("a");
    readMore.classList.add("read-more");
    readMore.innerText = "Read More";
    readMore.href = news.url;
    readMore.target = "_blank";
    newsTitleSection.appendChild(newsTitle);
    newsTitleSection.appendChild(readMore);
    heroSection.style.backgroundImage = `
linear-gradient(
    to right,
    rgba(245, 246, 252, 0.52),
    rgb(12 11 12 / 73%)
  ),
  url("${news.urlToImage}")`;
    heroSection.appendChild(newsTitleSection);
};

const renderNewsCard = (news) => {};

const apiNewsKey = "df5193cbe8e54b53a2bbd9faad5a8c9a";
window.addEventListener("load", (e) => {
    const newsApi = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiNewsKey}`;
    const casesApi = "https://covid-api.mmediagroup.fr/v1/cases";

    fetch(newsApi, (data) => {
        const { error, status, response } = data;
        if (error) {
            console.log(response);
            console.log(status);
        } else {
            // console.log(response);
            renderHero(response.articles[0]);
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