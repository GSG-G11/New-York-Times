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
