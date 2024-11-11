import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import iziToast from 'izitoast';

const searchForm = document.getElementById('search-form');
const loadMoreButton = document.getElementById('load-more-button');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('search-input');
let currentPage = 1;
const perPage = 18;
let currentQuery = '';

searchInput.addEventListener('focus', () => {
  searchInput.value = '';
});

searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreButton.addEventListener('click', onLoadMoreButtonClick);

async function onSearchFormSubmit(event) {
  event.preventDefault();
  currentQuery = searchInput.value.trim();
  if (currentQuery === '') {
    showToast('Please enter a search query', 'info');
    return;
  }
  currentPage = 1;
  await fetchAndRenderImages();
}

async function onLoadMoreButtonClick() {
  currentPage += 1;
  await fetchAndRenderImages(true);
  smoothScroll();
}

async function fetchAndRenderImages(append = false) {
  loader.style.display = 'block';
  try {
    const { hits, totalHits } = await fetchImages(currentQuery, currentPage, perPage);
    renderGallery(hits, append);
    loader.style.display = 'none';

    if (hits.length < perPage || currentPage * perPage >= totalHits) {
      loadMoreButton.style.display = 'none';
    } else {
      loadMoreButton.style.display = 'block';
    }

    if (currentPage === 1 && hits.length > 0) {
      showToast(`Hooray! We found ${totalHits} images.`, 'success');
    }

    if (hits.length === 0) {
      showToast('Sorry, there are no images matching your search query. Please try again.', 'info');
    }

  } catch (error) {
    loader.style.display = 'none';
    showToast(`Error fetching images: ${error.message}`, 'error');
  }
}

function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function showToast(message, type) {
  iziToast[type]({
    title: message,
    position: 'topRight'
  });
}