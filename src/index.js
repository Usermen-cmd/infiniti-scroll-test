import './styles.css';
const body = document.body;

let page = 1;

function getFetch(pageNumber) {
  fetch(
    `https://pixabay.com/api/?key=21737862-f939f5808a7d35114eed75822&page=${pageNumber}&per_page=30&category=industry`,
  )
    .then(r => r.json())
    .then(getData);
}

function getData(data) {
  const imgMarkup = data.hits
    .map(e => `<img src='${e.largeImageURL}' alt='image'>`)
    .join('');

  body.insertAdjacentHTML('beforeend', imgMarkup);
  window.addEventListener('scroll', handler);
}

function handler(e) {
  if (window.innerHeight + window.scrollY > document.body.clientHeight) {
    console.log(page);
    page += 1;
    getFetch(page);
    window.removeEventListener('scroll', handler);
  }
}
getFetch(page);
