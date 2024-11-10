import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';

const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const loader = document.getElementById('loader');
const gallery = document.getElementById('gallery');
const loadMoreButton = document.createElement('button');
loadMoreButton.id = 'load-more-button';
loadMoreButton.textContent = 'Load more';
loadMoreButton.style.display = 'none';
document.body.appendChild(loadMoreButton);

let query = '';
let page = 1;
const perPage = 15;

function toggleLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}

function toggleLoadMoreButton(show) {
  loadMoreButton.style.display = show ? 'block' : 'none';
}

searchInput.addEventListener('focus', () => {
  searchInput.value = '';
});

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  query = searchInput.value.trim();
  page = 1;

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    return;
  }

  clearGallery();
  toggleLoader(true);
  toggleLoadMoreButton(false);

  try {
    const images = await fetchImages(query, page, perPage);
    
      
    if (images.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderGallery(images);
      toggleLoadMoreButton(true);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images. Please try again later.',
    });
  } finally {
    toggleLoader(false);
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  toggleLoader(true);

  try {
    const images = await fetchImages(query, page, perPage);

    if (images.length === 0) {
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
      toggleLoadMoreButton(false);
    } else {
      renderGallery(images, true);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images. Please try again later.',
    });
  } finally {
    toggleLoader(false);

    // Smooth scroll
    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
});