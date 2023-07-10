
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiServis from './newApiServis';
import linksDokQuerySel from './links';
// import SimpleLightbox  from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

const link = new linksDokQuerySel;
const newApiServis = new NewApiServis();

link.submitForm.setAttribute(`disabled`, true);
link.searchForm.addEventListener(`submit`, onSubmitForm);
link.submitForm.addEventListener(`click`, onLoadMoreButton )

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
  const allImg =  await isAllTotalImage(render);
  buttonAddClass();
  
  for (let i = 0; i >= render.length; i++) {
   return await errorFetch(render);
  }

  if (render.length) {
    return allImg;
  } 

  return renderRes;
}
  

async function isAllTotalImage(totalHits) {
   if (totalHits <= 40) {
   buttonIsHidden();
    await window.alert("We're sorry, but you've reached the end of search results.");
  } 
}


function buttonAddClass() { 
  link.submitForm.classList.add(`is-visible`);
  link.submitForm.removeAttribute(`disabled`);
}

function buttonRemoveClass() {
  link.submitForm.classList.remove(`is-visible`);
}

function buttonIsHidden() {
  link.submitForm.classList.add(`is-hidden`);
  buttonRemoveClass();
}

async function errorFetch() {
   await Notify.failure(`Sorry, there are no images matching your search query. Please try again.`); 
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
  link.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearForm() {
  link.gallery.innerHTML = ``;

}

// const lightbox = new SimpleLightbox('.gallery div a', {
//   captionsData: `alt`,
//   captionSelector: `img`,
//   // captionPosition: `bottom`,
//   captionType: 'img alt="${hit.largeImageURL}',
//   captionDelay: 250,
  
// });

// console.log(lightbox)

