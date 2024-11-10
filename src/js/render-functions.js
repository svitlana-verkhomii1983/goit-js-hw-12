import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderGallery(images, append = false) {
  const gallery = document.getElementById('gallery');
  if (!append) gallery.innerHTML = '';

  images.forEach(image => {
    const photoCard = document.createElement('div');
    photoCard.className = 'photo-card';

    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    imgElement.loading = 'lazy';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';

    const likes = document.createElement('div');
    likes.className = 'info-item';
    likes.innerHTML = `<b>Likes</b><p>${image.likes}</p>`;

    const views = document.createElement('div');
    views.className = 'info-item';
    views.innerHTML = `<b>Views</b><p>${image.views}</p>`;

    const comments = document.createElement('div');
    comments.className = 'info-item';
    comments.innerHTML = `<b>Comments</b><p>${image.comments}</p>`;

    const downloads = document.createElement('div');
    downloads.className = 'info-item';
    downloads.innerHTML = `<b>Downloads</b><p>${image.downloads}</p>`;

    infoDiv.appendChild(likes);
    infoDiv.appendChild(views);
    infoDiv.appendChild(comments);
    infoDiv.appendChild(downloads);

    photoCard.appendChild(imgElement);
    photoCard.appendChild(infoDiv);

    gallery.appendChild(photoCard);
  });

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
}