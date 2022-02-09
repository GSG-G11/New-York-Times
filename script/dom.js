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
            // casesCount(data.response); //Get Count of cases Statistics section
            getTopCases(data.response);
            // renderHero(response.articles[0]);
        }
    });
});

const getTopCases = (data) => {
        Object.entries(data).forEach((entry) => {


                    (function iterate(data) {
                        var arr = [];
                        for (var prop in data) {
                            if (data.hasOwnProperty(prop)) {
                                var obj = {};
                                obj[prop] = data[prop];
                                obj.tempSortName = data[prop].customer.toLowerCase();
                                arr.push(obj);
                            }
                        }
                        arr.sort(function(a, b) {
                            var at = a.tempSortName,
                                bt = b.tempSortName;
                            return at > bt ? 1 : (at < bt ? -1 : 0);
                        })();

                        console.log(entry[1].All)
                            // var newValues = entry[].All.sort((a, b) => b - a).slice(0, 5);
                            // console.log(newValues);
                            // console.log(entry[1].All.confirmed)
                            // entry.forEach(element => {
                            // console.log(element)
                            // console.log(element.All.confirmed)
                            // element.forEach(item => {
                            //     console.log(item)
                            // });

                        // element['All'].forEach(item => {
                        //     console.log(item)
                        // });
                        // });

                    });
                }

                const casesCount = (data) => {
                    let count = 0;
                    let confirmedCases = [];
                    Object.entries(data).forEach((entry) => { // insert confirmed cases to array 
                        confirmedCases.push(entry[1].All.confirmed);
                        for (let i = 0; i < confirmedCases.length; i++) {
                            count += confirmedCases[i]
                        }
                    });
                    return count;
                }