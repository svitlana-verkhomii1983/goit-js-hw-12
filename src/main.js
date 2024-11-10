import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.getElementById('search-form');
const loadMoreButton = document.getElementById('load-more-button');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('search-input');

let currentPage = 1;
const perPage = 15;
let currentQuery = '';
let totalPages = 0;

searchInput.addEventListener('focus', () => {
  searchInput.value = '';
});


function toggleLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  currentQuery = searchInput.value.trim();
  if (currentQuery === '') return;

  currentPage = 1;
  clearGallery();
  toggleLoader(true);

  try {
    const { hits, totalHits } = await fetchImages(currentQuery, currentPage, perPage);
    toggleLoader(false);

    if (totalHits === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
      return;
    }

    renderGallery(hits);
    totalPages = Math.ceil(totalHits / perPage);

    if (currentPage < totalPages) {
      loadMoreButton.style.display = 'block';
    } else {
      loadMoreButton.style.display = 'none';
    }

    iziToast.success({
      title: 'Success',
      message: `Hooray! We found ${totalHits} images.`,
      position: 'topRight',
    });

  } catch (error) {
    toggleLoader(false);
    iziToast.error({
      title: 'Error',
      message: `Failed to fetch images: ${error.message}`,
      position: 'topRight',
    });
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  toggleLoader(true);

  try {
    const { hits } = await fetchImages(currentQuery, currentPage, perPage);
    toggleLoader(false); //
    renderGallery(hits, true);

    // Smooth scroll
    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (currentPage >= totalPages) {
      loadMoreButton.style.display = 'none';
    }

  } catch (error) {
    toggleLoader(false);
    iziToast.error({
      title: 'Error',
      message: `Failed to fetch images: ${error.message}`,
      position: 'topRight',
    });
  }
});