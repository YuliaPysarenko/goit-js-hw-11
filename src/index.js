
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiServis from './newApiServis';

import SimpleLightbox  from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// import axios from "axios";
// axios.defaults.headers.common["x-api-key"] = "твой ключ";
// const axios = require('axios/dist/node/axios.cjs');


const searchForm = document.querySelector(`.search-form`);
const submitForm = document.querySelector(`.submit-form`);
const gallery = document.querySelector(`.gallery`);

const newApiServis = new NewApiServis();

submitForm.setAttribute(`disabled`, true);

searchForm.addEventListener(`submit`, onSubmitForm);
submitForm.addEventListener(`click`, onLoadMoreButton )

function onSubmitForm(e) {
 e.preventDefault();
  newApiServis.inputValue = e.currentTarget.elements.searchQuery.value;
  clearForm();
  newApiServis.resetPage();
  onLoadMoreButton();
};
 
async function onLoadMoreButton() {
  buttonRemoveClass();
    const render = await newApiServis.fetchPixabay();
    const renderRes = await renderResponse(render);
    await totalImage(render);
    buttonAddClass();
 
  for (let i = 0; i >= render.length; i++) {
   const error = await errorFetch(render); 
   return error;
  }

  return renderRes;
  }


function buttonAddClass() { 
  submitForm.classList.add(`is-visible`);
  submitForm.removeAttribute(`disabled`);
}

function buttonRemoveClass() {
  submitForm.classList.remove(`is-visible`);
}

function buttonIsHidden() {
  submitForm.classList.add(`is-hidden`);
  buttonRemoveClass();
}

async function errorFetch() {
      const notifyError = await Notify.failure(`Sorry, there are no images matching your search query. Please try again.`); 
}
 
async function renderResponse(hits) {
    const markup = await hits.map((hit) => {
      return `
    <div class="photo-card"> 
       <a class= "photo-link"> 
  <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" ${hit.largeImageURL}/>
  <div class="info">
    <p class="info-item">
      <b>Likes ${hit.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${hit.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${hit.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${hit.downloads}</b>
    </p>
  </div>
   </a>
</div>
`
    })
    .join(""); 
  gallery.insertAdjacentHTML('beforeend', markup);
}
  
async function totalImage() {
  if (newApiServis.total === 0) {
   buttonIsHidden();
 const isTotalImg = await window.alert("We're sorry, but you've reached the end of search results.");
 } 
}

 
function clearForm() {
  gallery.innerHTML = ``;
}

const lightbox = new SimpleLightbox('.gallery div a', {
  captionsData: `alt`,
  captionSelector: `img`,
  // captionPosition: `bottom`,
  captionType: 'img alt="${hit.largeImageURL}',
  captionDelay: 250,
  
});

console.log(lightbox)

