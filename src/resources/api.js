const params = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const URL = "https://pwa-news-api.herokuapp.com/api";

function getNews(subject) {
  return fetch(`${URL}/${subject}`, params)
    .then((response) => response.json())
    .catch((err) => {
      console.error(`Failed retrieving information: ${err}`);
    });
}

function getNewsById(subject, id) {
  return fetch(`${URL}/${subject}/${id}`, params)
    .then((response) => response.json())
    .catch((err) => {
      console.error(`Failed retrieving information: ${err}`);
    });
}

export { getNews, getNewsById };
