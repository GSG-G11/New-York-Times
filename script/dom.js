//api
const apiNewsKey = "df5193cbe8e54b53a2bbd9faad5a8c9a";
const newsApi = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiNewsKey}`;

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
  readMore.href = news.url;
  readMore.target = "_blank";
  newsCard.appendChild(readMore);
};

window.addEventListener("load", (e) => {
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
});
