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

  fetch(newsApi, (data) => {
    const { error, status, response } = data;
    if (error) {
      console.log(response);
      console.log(status);
    } else {
      console.log(response);
      renderHero(response.articles[0]);
    }
  });
});
