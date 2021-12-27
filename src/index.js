import './css/styles.css';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import GalleryImageService from './js/api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  searchForm: document.querySelector('#search-form'),
  cardsImages: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
}

const galleryImageService = new GalleryImageService();
const lightbox = new SimpleLightbox('.gallery a');

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore)



function onFormSubmit(e) {
  
  e.preventDefault()
  galleryImageService.query = e.currentTarget.elements.searchQuery.value;
 

  galleryImageService.resetPage();
  galleryImageService.searchImages().then(({hits, totalHits}) => {
    if (hits.length === 0) {
          refs.loadMoreBtn.classList.add('visually-hidden')
          return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
          
    }
    Notify.success(`Hooray! We found ${totalHits} images.`)
    console.log(hits)
    refs.loadMoreBtn.classList.remove('visually-hidden')
    galleryImageService.incrementPage()
    renderImages(hits)

    const { height: cardHeight } = document
      .querySelector(".gallery")
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

    lightbox.refresh()
  });
  
  clearImages();

}

function onLoadMore() {
  galleryImageService.searchImages().then(({hits}) => {
    
      if (hits.length < 40) {
          refs.loadMoreBtn.classList.add('visually-hidden')
          return Notify.warning("We're sorry, but you've reached the end of search results.")
          
      }
    galleryImageService.incrementPage()
    renderImages(hits)

    const { height: cardHeight } = document
      .querySelector(".gallery")
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });


    lightbox.refresh()
  });
}


function renderImages(el) {
  
  const markup = el
    
    .map((hit) => {
     
     return `<a class="gallery-item" href=${hit.largeImageURL}>
    <div class="photo-card">
    <div class="image-box">
    <img class="gallery-image" src=${hit.webformatURL} alt=${hit.tags}  loading="lazy" />
    </div>
    <div class="info">
    <p class="info-item">
      <b class="description">Likes</b>
      <span class="description-value">${hit.likes}</span>
    </p>
    <p class="info-item">
      <b class="description">Views</b>
      <span class="description-value">${hit.views}</span>
    </p>
    <p class="info-item">
      <b class="description">Comments</b>
      <span class="description-value">${hit.comments}</span>
    </p>
    <p class="info-item">
      <b class="description">Downloads</b>
      <span class="description-value">${hit.downloads}</span>
    </p>
  </div>
</div></a>`}).join("");
  
  refs.cardsImages.insertAdjacentHTML('beforeend', markup);
  
}
function clearImages() {
  refs.cardsImages.innerHTML = ''
}












 