//api
const apiNewsKey = "KINWCqfOXaOflRlqwmizbOpaMIo85MFYp_CpbJAg144";
const newsApi = `https://api.newscatcherapi.com
/v2/latest_headlines?countries=AE&topic=business&page_size=10`;

//DOM
const heroSection = document.querySelector(".hero-section");
const globalStats = document.querySelector("#global-stats");

// Cards Info
const covidCards = document.querySelector(".covid-cards");
const card = document.querySelector(".card");
const cardContainer = document.querySelector(".card-container");
const cardTitle = document.querySelector("#title");
const cardConfirmed = document.querySelector("#confirmed");
const cardDeaths = document.querySelector("#deaths");
const cardLife = document.querySelector("#life");
const cardLocation = document.querySelector("#location");

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
      // console.log(response);
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
      globalCount(data.response); //Get Count of cases Statistics section
      getTopCases(data.response);

      // renderHero(response.articles[0]);
    }
  });
});

globalCount = (data, cb) => {
  let global = getTopCases(data);
  const text = document.createTextNode(
    `There's ${global[0].confirmed} confirmed cases of Coronavirus around the world today.`
  );
  return globalStats.appendChild(text);
};

// Count all confirmed cases of covid globally
const getTopCases = (data) => {
  let sorted = [];
  Object.entries(data).forEach((entry) => {
    sorted.push(entry[1].All);
    sorted = sorted.sort((a, b) => b.confirmed - a.confirmed).slice(0, 6); // Get six sorted items
  });
  sorted.forEach((element) => {
    const cardDiv = document.createElement("div");
    covidCards.appendChild(cardDiv);
    const confirmedText = document.createElement("p");
    confirmedText.textContent = `confirmed : ${element.confirmed}`;
    cardDiv.appendChild(confirmedText);

    const deathsText = document.createElement("p");
    deathsText.textContent = `Deaths : ${element.deaths}`;
    cardDiv.appendChild(deathsText);

    const lifeText = document.createElement("p");
    lifeText.textContent = `Life expectany : ${element.life_expectancy}`;
    cardDiv.appendChild(lifeText);
    const locationText = document.createElement("p");
    locationText.textContent = `Location : ${element.location}`;
    cardDiv.appendChild(locationText);
    cardDiv.classList.add("card");
  });
};
