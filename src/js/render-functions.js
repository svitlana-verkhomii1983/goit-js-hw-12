import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderGallery(images, append = false) {
  const gallery = document.getElementById('gallery');
  const galleryHTML = images.map(image => 
    `<div class="photo-card">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <b>Likes</b>
          <p>${image.likes}</p>
        </div>
        <div class="info-item">
          <b>Views</b>
          <p>${image.views}</p>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <p>${image.comments}</p>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <p>${image.downloads}</p>
        </div>
      </div>
    </div>`
  ).join('');

  if (append) {
    gallery.insertAdjacentHTML('beforeend', galleryHTML);
  } else {
    gallery.innerHTML = galleryHTML;
  }

  if (lightbox) {
    lightbox.destroy();
  }

  lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
}

export function clearGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
}